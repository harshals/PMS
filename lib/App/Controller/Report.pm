package App::Controller::Report;

use strict;
use warnings;
use parent "Catalyst::Controller";
use Date::Manip;
use Text::Wrap::Smart qw(wrap_smart);

use SQL::Statement;
use Data::Printer q/p/;
=head1 NAME

App::Controller::Others - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut


sub publish : Local : Args(1) {
	
	my ($self, $c, $template) = @_;

	$c->stash->{pdf_template} = "src/report/$template.tt";

	#foreach my $path (@{App::View::PDF->config->{INCLUDE_PATH}}) {
	#	$c->log->debug("filen $path found");
    #}

    $c->stash->{pdf_disposition} = 'attachment';  # Default is 'inline'
    $c->stash->{pdf_filename}    = "$template.pdf";  
    $c->forward('App::View::PDF');
}

sub search : Local : Args(1) {

	my ($self, $c, $type) = @_;

	$c->stash->{type} = $type;

	$c->log->debug($type);

	if ($c->req->method eq "POST" || scalar (keys %{ $c->req->params })) {
		
		## perform search
		$c->detach($type ) if $type =~ m/rg23d|form2|aces_dealer/ ;
        $c->forward($type) if $self->can($type);
	}
    $c->stash->{template} = "report_form.tt";
}

sub list : Local : Args {
    
	my ($self, $c, $entity, $method, $id) = @_;
	
    $method ||= 'look_for';

    $c->stash->{"${entity}_rs"} =  $c->model("DemoDB::$entity")->$method;
	
	$c->stash->{$entity} = $c->model("DemoDB::$entity")->fetch($id)->serialize if $id;

    $c->stash->{entity} = $entity;
    $c->stash->{entity_form} = ( $entity !~ /purchase|sale/ ) ? 'form' : 'alternate_form';
    $c->stash->{method} = $method;
    $c->stash->{template} = "report_list.tt";

}

sub company: Private {

	my($self, $c) = @_;
	
	my $id = $c->req->param('company_id');

	$c->stash->{'company'} = $c->model("DemoDB::Company")->fetch($id)->serialize if $id;

	$c->stash->{type} = "company";
    $c->stash->{template} = "report_form.tt";

}


sub rg23d: Private {

	my($self, $c) = @_;

	my $req_data =   $c->req->params  ;


	my $search ;

	$req_data->{'from_date'} ||= $c->stash->{date_begin};
	$req_data->{'to_date'} ||= $c->stash->{date_end};

	$search->{'-and'} = [   'me.invoice_date' => { '>=' ,  $req_data->{'from_date'} } ,
		'me.invoice_date' => { '<=' ,  $req_data->{'to_date'} } 
	];
	$search->{'me.product_id'} = {  '=', $req_data->{'product_id'} } if ($req_data->{'product_id'});
	$search->{'warehouse_id'} =  ( $req_data->{'warehouse_id'} || $c->stash->{warehouse_id} || 1);

	my $warehouse = $c->model("DemoDB::Company")->fetch( $search->{'warehouse_id'} );

	$c->stash->{'rg_rs'} = ($search) ? 
							$c->model("DemoDB::Purchase")->look_for($search, { order_by => { -asc => 'me.received_date' }})->serialize(4)
							: [];

	$c->stash->{pdf_template} = "src/report/rg23d.tt";
	 $c->stash->{pdf_disposition} = 'attachment';  # Default is 'inline'
	$c->stash->{pdf_filename}    = "rg23d.pdf";  
	$c->forward('App::View::PDF');
}
sub ledger : Private {
	my($self, $c) = @_;

	my $req_data =   $c->req->params  ;
	#my $req_data;
	#my $search ;
	my $search =   $c->stash->{'search'};
	$req_data->{'from_date'} ||= $c->stash->{date_begin};
	$req_data->{'to_date'} ||= $c->stash->{date_end};

	$search->{'-and'} = [   'me.instrument_date' => { '>=' ,  $req_data->{'from_date'} } ,
		'me.instrument_date' => { '<=' ,  $req_data->{'to_date'} } 
	];
	$search->{'me.instrument'} = {  '=', $req_data->{'instrument'} } if ($req_data->{'instrument'});
	$search->{'me.payment_type'} = {  '=', $req_data->{'payment_type'} } if ($req_data->{'payment_type'});
	$search->{'me.is_realized'} = {  '=', $req_data->{'is_realized'} } if ($req_data->{'is_realized'});
	$search->{'me.company_id'} = {  '=', $req_data->{'company_id'} } if ($req_data->{'company_id'});

	$c->stash->{'payment_rs'} = ($search) ? $c->model("DemoDB::Payment")->look_for($search, { order_by => { -asc => 'me.instrument_date' }}) : [] ;

	$search->{'-and'} = [   'me.invoice_date' => { '>=' ,  $req_data->{'from_date'} } ,
		                    'me.invoice_date' => { '<=' ,  $req_data->{'to_date'} } ];

    delete $search->{"me.$_"} foreach (qw/instrument payment_type is_realized company_id/);

	$search->{'me.buyer_id'} = {  '=', $req_data->{'company_id'} } if ($req_data->{'company_id'});

	$c->stash->{'sale_rs'} = ($search) ? $c->model("DemoDB::Sale")->look_for($search, { order_by => { -asc => 'me.invoice_date' }}) : [];

	$c->stash->{'template'}    = "src/report_list.tt";
}
sub vat : Private {
	my($self, $c) = @_;

	my $req_data =   $c->req->params  ;
	#my $req_data;
	#my $search ;
	my $search =   $c->stash->{'search'};

	$search->{'-and'} = $self->format_date_search($c, 'me.invoice_date', 'cgi');
	
	$search->{'me.product_id'} = {  '=', $req_data->{'product_id'} } if ($req_data->{'product_id'});
	$search->{'me.warehouse_id'} = {  '=', $req_data->{'warehouse_id'} } if ($req_data->{'warehouse_id'});

	my $list =  $c->model("DemoDB::Sale")
								->look_for($search, { 
									order_by => { -asc => 'me.invoice_date' },
																	
								})->serialize ;

	foreach my $row (@$list) {
		
		my %new_hash = map { $_ => $row->{$_} } qw/warehouse_id sales_tax_type  sales_tax_rate  addl_sales_tax_rate  sales_tax addl_sales_tax quantity /;

		push @{ $c->stash->{'sale_rs'} }, \%new_hash;
	}

	
	my $dbh = $c->model("TempDB")->dbh;
	$dbh->{RaiseError} = 1;

 	my $sth = $dbh->prepare(" SELECT warehouse_id,sales_tax_type, sales_tax_rate, addl_sales_tax_rate , SUM(sales_tax) as total_sales_tax , SUM(addl_sales_tax) as total_addl_sales_tax, SUM(quantity) as total_quantity  FROM IMPORT(?) GROUP BY warehouse_id,sales_tax_type, sales_tax_rate, addl_sales_tax_rate");

 	$sth->execute( $c->stash->{'sale_rs'});

	$c->stash->{'sale_rs'} = $sth->fetchall_arrayref({ warehouse_id => 1, 
														sales_tax_type => 1  ,
														sales_tax_rate => 1,
														addl_sales_tax_rate =>1 ,
														total_sales_tax => 1,
														total_addl_sales_tax => 1,
														total_quantity => 1
														
														});


	$c->stash->{'purchase_rs'} = $c->model("DemoDB::Purchase")->look_for($search, { order_by => { -asc => 'me.id' }})->serialize;

	$c->stash->{'template'}    = "src/report_list.tt";
}

sub format_date_search : Private {
	
	my ($self,$c, $attr, $type, $from, $to) = @_;

	my ($from_opr, $to_opr) = ( '>=' , '<=');
	if ($type eq 'cgi') {
		
		$from ||= $c->req->param('from_date') || $c->stash->{date_begin};
		$to ||= $c->req->param('to_date') || $c->stash->{date_end};
	}elsif ($type eq 'current') {

		$from ||= $c->stash->{date_begin};
		$to ||= $c->stash->{date_end}	;
	}elsif ($type eq 'past') {

		$from = undef;
		$to ||= $c->stash->{date_begin};
		$to_opr = '<';
	}elsif ($type eq 'future') {
	
		$to = undef;
		$from ||= $c->stash->{date_end};
		$from_opr = '>';
	}

    my $date_search =  [];

    push @{ $date_search }, ( $from ) ? { $attr => { $from_opr ,  $from } } : { 1 => 1 };
    push @{ $date_search }, ( $to ) ?  { $attr => { $to_opr ,  $to } } :{  1 => 1};
 
 	return $date_search;

}

sub stock : Private {

	my ($self , $c )= @_;

	my $req_data = $c->req->params;

	my $warehouse_ids = [] ; 
	
	push @$warehouse_ids , $req_data->{'warehouse_id'} if $req_data->{'warehouse_id'};

	my ($product_id, $products) ;
	$products =  $c->model("DemoDB::Product")->all_products->serialize(7);

	$product_id =  $req_data->{'product_id'}  if $req_data->{'product_id'};
	
	my $product_names = [];

	my $uoms = []; 
	
	push @$uoms , $req_data->{'uom'} if $req_data->{'uom'};

	my $rs;

	unless (scalar @$warehouse_ids) {
		
		$warehouse_ids = [ $c->model("DemoDB::Company")->warehouse->get_column('id')->all ];
	};
		
	$products = { $product_id => $products->{ $product_id } } if exists $products->{ $product_id };
	
	unless (scalar @$uoms) {
		
		$uoms =  $c->model("DemoDB::UOM")->all_metrics->serialize;
	};
	foreach my $warehouse_id (@$warehouse_ids) {
		
		foreach my $product_id (keys %$products)  {
			
			foreach my $uom (@$uoms) {
				
				my $search =   {};
				$search->{'me.warehouse_id'} = $warehouse_id;
				$search->{'me.product_id'} =  $product_id ;
				$search->{'me.uom'} = $uom->{'name'};

				
				my ($purchase, $sale, $op_purchase, $op_sale, $balance);
				
				$search->{'-and'} = $self->format_date_search($c, 'me.invoice_date', 'cgi');

				$purchase = $c->model("DemoDB::Purchase")
								->look_for($search, undef)
								->get_column('quantity')
								->sum();

				$balance = $c->model("DemoDB::Purchase")
								->look_for($search, undef)
								->get_column('balance')
								->sum();

				$sale = $c->model("DemoDB::Sale")
								->look_for($search, undef)
								->get_column('quantity')
								->sum();

				delete $search->{'-and'};

				$search->{'me.invoice_date'} = { '<', $c->req->param('from_date') || $c->stash->{'date_begin'} };

				$op_purchase = $c->model("DemoDB::Purchase")
								->look_for($search, undef)
								->get_column('quantity')
								->sum();
				
				$op_sale = $c->model("DemoDB::Sale")
								->look_for($search, undef)
								->get_column('quantity')
								->sum();

				push @$rs, { 'warehouse_id' => $warehouse_id, uom => $uom->{'name'}
							, product => $products->{ $product_id }->{'name'}, 
							'product_id' => $product_id,
							'opening' => ($op_purchase - $op_sale),
							'purchase'=> $purchase, 
							'sale' => $sale , 
							'balance' => ($op_purchase - $op_sale + $purchase - $sale) ,
							'actual_balance' => $balance };
			}
		}
	}
	$c->stash->{stock_rs} = $rs;

	$c->stash->{'template'}    = "src/report_list.tt";	
}

sub current_stock : Private {
	
	my ($self , $c )= @_;

	my $req_data = $c->req->params;

	my $search ;

	$search->{'-and'} = $self->format_date_search($c, 'me.invoice_date', 'cgi');
	
	$search->{'me.warehouse_id'} = $req_data->{'warehouse_id'} if $req_data->{'warehouse_id'};
	$search->{'me.product_id'} = $req_data->{'product_id'} if $req_data->{'product_id'};
	$search->{'product.product_group'} = $req_data->{'product_group'} if $req_data->{'product_group'};

	$search->{'me.balance'} = { '>' , 0 };

	$c->stash->{stock_rs} = $c->model("DemoDB::Purchase")
								->look_for($search, {
									
									prefetch => [qw/product/]

								})->serialize;
			
	$c->stash->{'template'}    = "src/report_list.tt";	
}


sub stockregister : Private {
	
	my($self, $c, $from_date, $to_date, $product_id, $uom) = @_;
	my $req_data = $c->req->params;
	my $search =   $c->stash->{'search'};
	
	$req_data->{'from_date'} ||= $c->stash->{date_begin};
	$req_data->{'to_date'} ||= $c->stash->{date_end};

	$search->{'-and'} = [   'me.invoice_date' => { '>=' ,  $req_data->{'from_date'} } ,
		'me.invoice_date' => { '<=' ,  $req_data->{'to_date'} } 
	];
	$search->{'me.product_id'} = {  '=', $req_data->{'product_id'} } if ($req_data->{'product_id'});
	$search->{'me.warehouse_id'} = {  '=', $req_data->{'warehouse_id'} } if ($req_data->{'warehouse_id'});

	my $attr = { prefetch => ['product', 'manufacturer', { 'sales' => 'consignee' } ] };

	if ($req_data->{'product_group'}) {
		
		$search->{'product.product_group'} = $req_data->{'product_group'};

		push @{ $attr->{'prefetch'} }, 'product';
	}

	$search->{'-or'} = [ supplier_id =>   {  '=', $req_data->{'supplier_id'} } ,
						
						 manufacturer_id => {  '=', $req_data->{'supplier_id'} }]
								 
						if ($req_data->{'supplier_id'});


	$c->stash->{'stockregister_rs'} = $c->model("DemoDB::Purchase")

										->look_for($search, $attr)->serialize;

	$c->stash->{'template'}    = "src/report_list.tt";	
}

sub form2 : Private{
	
	my($self, $c) = @_;

	my $req_data =   $c->req->params  ;
	
	my $search ;

	$req_data->{'from_date'} ||= $c->stash->{date_begin};
	$req_data->{'to_date'} ||= $c->stash->{date_end};

	$search->{'-and'} = [   'me.invoice_date' => { '>=' ,  $req_data->{'from_date'} } ,
		'me.invoice_date' => { '<=' ,  $req_data->{'to_date'} } 
	];
	$search->{'me.product_id'} = {  '=', $req_data->{'product_id'} } if ($req_data->{'product_id'});

	$c->stash->{'form2_rs'} = $c->model("DemoDB::Purchase")->look_for($search, { order_by => { -asc => 'me.invoice_date' }});

	$c->stash->{pdf_template} = "src/report/form2_pdf.tt";
	$c->stash->{pdf_disposition} = 'attachment';  # Default is 'inline'
	$c->stash->{pdf_filename}    = "form2.pdf";  
	$c->forward('App::View::PDF');
	
}
sub saleproduct : Private{
	
	my($self, $c, $from_date, $to_date, $product_id, $uom) = @_;
	
	my $req_data = $c->req->params;
	
	my $search =   $c->stash->{'search'};
	
	$req_data->{'from_date'} ||= $c->stash->{date_begin};
	$req_data->{'to_date'} ||= $c->stash->{date_end};

	$search->{'-and'} = [   'me.invoice_date' => { '>=' ,  $req_data->{'from_date'} } ,
		'me.invoice_date' => { '<=' ,  $req_data->{'to_date'} } 
	];
	$search->{'me.product_id'} = {  '=', $req_data->{'product_id'} } if ($req_data->{'product_id'});

	$c->stash->{'saleproduct_rs'} = $c->model("DemoDB::Sale")->saleproduct($search);

	$c->stash->{'template'}    = "src/report_list.tt";
}

sub outstanding : Private{
	
	my($self, $c) = @_;
	my $req_data = $c->req->params;
	my $search =   $c->stash->{'search'};
	$c->stash->{'outstanding_rs'} = $c->model("DemoDB:Company")->outstaning($search);
	$c->stash->{'template'} = "src/report_list.tt";
}

sub aces_dealer : Private {

	my($self, $c) = @_;

	my $req_data = $c->req->params;
	
	my $search ;

	$req_data->{'from_date'} ||= $c->stash->{date_begin};
	$req_data->{'to_date'} ||= $c->stash->{date_end};

	$search->{'-and'} = $self->format_date_search($c, 'sales.invoice_date', 'cgi');
	        	
	$search->{'sales.warehouse_id'} = $req_data->{'warehouse_id'};

	my $attr =  {
		
		join => ['sales'],
		order_by => { -asc => 'me.invoice_date' }

	};

	#my $purchase_ids = [ $c->model("DemoDB::Sale")->look_for($search, )->get_column('purchase_id') ];

	#my $sales = $c->model("DemoDB::Sale")->look_for($search, )->serialize(4);

	#my $purchase->

    $c->stash->{'aces_rs'} =   $c->model("DemoDB::Purchase")->look_for( $search, $attr)->serialize(4);
	
	my $warehouse = $c->model("DemoDB::Company")->fetch( $req_data->{'warehouse_id'} );
	my $sales_rs = $c->model("DemoDB::Sale");


	my $sales = $c->model("DemoDB::Sale")->look_for({ 
										
										'-and' => [ 'me.invoice_date' => { '>=', $req_data->{'from_date'} },
													'me.invoice_date' => { '<=', $req_data->{'to_date'} }],
										'me.warehouse_id' => $req_data->{'warehouse_id'}

										}, { order_by => { -asc => 'me.invoice_date'} })
										
										->serialize(4);

	#use Data::Dumper qw/Dumper/;
	#$c->log->debug(Dumper($c->stash->{'aces_rs'}));
	
	my $now = UnixDate("now", "%d/%m/%Y");

	
	my $inc =1;
	my $s_inc = 1;
	my $month;
	my $year;
	my $from_date = $req_data->{'from_date'} || $c->stash->{date_begin};
	my $to_date = $req_data->{'to_date'} || $c->stash->{date_end};

	my $month1 = UnixDate(ParseDate($from_date), '%b');
	my $month2 = UnixDate(ParseDate($to_date), '%b');
	$month = $month1 . "-" . $month2;
	$year = UnixDate(ParseDate($to_date), '%Y');
	
	

	my $document_details = [];

	foreach my $p_inv ( @{ $c->stash->{'aces_rs'} }) {
			
			my $cenvat = int( $p_inv->{cenvat} + $p_inv->{'sec_edu_cess'} + $p_inv->{'hp_edu_cess'} + $p_inv->{'cvd'});
						#use Data::Dumper;
			#$c->log->debug(Dumper($num1));
			my $pdate=$p_inv->{invoice_date};
			my $p_invoice_date = UnixDate(ParseDate($pdate),'%d/%m/%Y');
			
			my $supplier = ($p_inv->{'invoice_type'} !~ /Dealer/) ? $p_inv->{'manufacturer'} : $p_inv->{'supplier'};

			my $p_data = {
                        	'SL-NO' => $inc,
                        	'2 INVOICE-BILL-ENTRY-NO' => [ $p_inv->{invoice_no} ],
                        	'3 DATE' => [ $p_invoice_date ],
                        	'4 ISSUED-BY' =>[ $p_inv->{invoice_type} ],
            				'5 REGISTRATION-NUMBER' =>[ $supplier->{ecc} ],
                        	'6 NAME' => [ $supplier->{name} ],
                        	'7 ADDRESS' => [ $supplier->{id} ],
                        	'8 INVOICE-ITEMS' => {
								'1 DESCRIPTION-OF-GOODS' => [ $p_inv->{product}->{name} ],
								'2 CETSH-NUMBER' => [ $p_inv->{product}->{chapter_heading} ],
								'3 QUANTITY-CODE' => [ $p_inv->{uom} ],
								'4 QUANTITY' => [ $p_inv->{quantity} ],
								'5 AMOUNT-OF-DUTY-INVOLVED' => [ $cenvat ],
							}
					};
			push @{ $document_details }, $p_data;
			#push @{ $aces->	{'RETURN'}->{'DOCUMENT-HEADER'}->{'DOCUMENT-DETAIL'} }, $p_data;
			
			$inc = $inc + 1;
	}
	
	my $invoice_particulars = [];

	foreach my $s_inv ( @$sales ) {

		my $sdate=$s_inv->{invoice_date};

		my $s_invoice_date = UnixDate(ParseDate($sdate),'%d/%m/%Y');

		my $s_data = {	
            '1 INVOICE-NUMBER' => [ $s_inv->{invoice_no} ],
			'2 INVOICE-DATE' => [ $s_invoice_date ],
            '3 INVOICE-ITEMS' => {
				'1 DESCRIPTION-OF-GOODS' => [ $s_inv->{product}->{name} ],
				'2 CETSH-NUMBER' => [ $s_inv->{product}->{chapter_heading} ],
				'3 QUANTITY-CODE' => [ $s_inv->{uom} ],
				'4 QUANTITY' => [ $s_inv->{quantity} ],
				'5 AMOUNT-OF-DUTY-INVOLVED' => [ int( $s_inv->{cenvat} + $s_inv->{'sec_edu_cess'} + $s_inv->{'hs_edu_cess'} + $s_inv->{'cvd'})],
			},
            'SL-NO' => $s_inc
		};
		
		push @{ $invoice_particulars }, $s_data;
		#push @{ $aces->{'RETURN'}->{'INVOICE-HEADER'}->{'INVOICE-PARTICULARS'} }, $s_data;

		$s_inc = $s_inc + 1;
	}

	my $aces = {

		'RETURN' => {
			'1 HEADER-DATA' => {
				'1 RETURN-YEAR' => [$year],
				'2 QUARTER' => [$month],
				'3 DEALER-NAME' => [ $warehouse->name ],
				'4 REGISTRATION-NUMBER' => [ $warehouse->ecc ],
            },
			'2 INVOICE-HEADER' => {
			       	'INVOICE-PARTICULARS' => $invoice_particulars
			},
			'3 DOCUMENT-HEADER' => {
			       	'DOCUMENT-DETAIL' => $document_details
			},
			'4 SELF-ASSESSMENT-MEMORANDAM' => {
				'1 DATE' => [ $now ],
				'2 PLACE' => ['Mumbai'],
				'3 REMARKS' => ["DEALER RETURN FOR $month  $year"],
             },
			'ToolVer' => '1.0',
			'ReturnType' => 'DLR'
		}
		
	};

	#push @{ $aces->	{'RETURN'}->{'HEADER-DATA'}->{'RETURN-YEAR'} }, $year;
	#push @{ $aces->	{'RETURN'}->{'HEADER-DATA'}->{'QUARTER'} }, $month;

	
	
	#push @{ $aces->	{'RETURN'}->{'SELF-ASSESSMENT-MEMORANDAM'}->{'REMARKS'} }, ;
	#push @{ $aces->	{'RETURN'}->{'SELF-ASSESSMENT-MEMORANDAM'}->{'PLACE'} }, $sales->[0]->{'warehouse'}->{'w_city'};

	$c->stash->{'aces'} = {
		data => $aces
	};
	
	#$c->stash->{'xml'} = { filename => { name => "harshal" } };
	$c->stash->{'download'} = 'text/xml';
	$c->response->content_type("text/xml");
	$c->forward("App::View::XML");
}
sub boe_detail : Private {
	
	my ($self, $c) = @_;

	my $search = {};
	
	$search->{'me.purchase_id'} = $c->req->param('bill_of_entry');
	$search->{'me.invoice_date'} = { '<=' , $c->req->param('to_date') };
	
	my $rs = $c->model("DemoDB::Sale")->look_for($search )->serialize(4);

	$c->stash->{rs} = $rs;
	$c->stash->{type} = "boe_detail";
}
sub sad_refund : Private {
	
	my ($self, $c) = @_;

	my $search = {};

	#$search->{'-and'} = $self->format_date_search($c, 'me.invoice_date', 'cgi');
	
	if ($c->req->param('bill_of_entry') && $c->req->param('to_date') ) {
		
		$c->forward("boe_detail");
		return;
	}

	$search->{'me.supplier_type'} = 'Importer';
	$search->{'me.balance'} = { '<=' , 0.001 };
	$search->{'sales.invoice_date'} = {'<=' , $c->req->param('to_date') };


	my $rs = $c->model("DemoDB::Purchase")->look_for($search, { join => [qw/sales/]  , distinct => 1})->serialize(4);
	
	foreach my $row (@$rs) {
		
		my ($total_sales, $total_cvd, $total_cvd_quantity) ;
		
		foreach my $sale (@{ $row->{sales} }) {
			
			$total_sales += $sale->{quantity};
			$total_cvd += $sale->{cvd};
			$total_cvd_quantity += $sale->{quantity} unless int($sale->{cvd});
		}

		$row->{total_sale_quantity} = $total_sales;
		$row->{total_sale_cvd} = $total_cvd;
		$row->{total_cvd_quantity} = $total_cvd_quantity;
	}
	$c->stash->{rs} = $rs;
	$c->stash->{'template'}    = "src/report_list.tt";	
}
sub stock_statement {
	
	my ($self, $c) = @_;

	my $search = {};

	$search->{'-and'} = $self->format_date_search($c, 'me.invoice_date', 'cgi');

	my $rs = $c->model("DemoDB::Purchase")->look_for($search, {
		
		select => [ "warehouse_id" , { sum => "total"} , {  sum => "quantity" } , { sum => "balance" } ],
		as	=> [qw/warehouse_id	total_value	total_quantity	balance_quantity/],
		group_by => [qw/warehouse_id/]
	})->serialize;

	$c->log->debug(p($rs));

	$c->stash->{'template'}    = "src/report_list.tt";	
}


=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
