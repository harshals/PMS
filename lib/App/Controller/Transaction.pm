package App::Controller::Sale;

use strict;
use warnings;
use base qw/App::Base::Controller/;
use Number::Spell;
use Text::Wrap  qw(wrap);

=head1 NAME

App::Controller::Sale - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Private: Path :Args(0) {
    my ( $self, $c ) = @_;


	my $model = $c->model("DemoDB::Sale");

	$model->result_source->schema->user(1);

	my $invoice = $model->fetch(1);

    $c->response->body($invoice->has_access);
}

sub base :Chained('/') :PathPart('transaction'): CaptureArgs(0) {

    my ( $self, $c ) = @_;
	$c->stash->{"model" } = $c->model("DemoDB::Sale");
	#$c->stash->{"model"}->result_source->schema->user(1);
	$c->stash->{"template_prefix" } = "transaction";
	$c->stash->{"result_key"} =  "transaction";

}







sub search : Chained('base') : PathPart('') : CaptureArgs(1) {

    my ( $self, $c, $method) = @_;
    
	my $req_data =   $c->req->params  ;

    my ( $search , $attr ) ;

    $req_data->{'from_date'} ||= $c->stash->{date_begin};
    $req_data->{'to_date'} ||= $c->stash->{date_end};

    $search->{'-and'} = [   'me.transaction_date' => { '>=' ,  $req_data->{'from_date'} } ,
                            'me.transaction_date' => { '<=' ,  $req_data->{'to_date'} } 
                        ];

	foreach my $param (qw/transaction_type product_id /) {

    	$search->{"me.$param"} = {  '=', $req_data->{$param} } if ($req_data->{$param});
	}

	

	if ($req_data->{'bill_no'}) {

		$search->{'bill.bill_no'} = {  '=', $req_data->{'bill_no'} } ;

		push @{ 	$c->stash->{'attributes'}->{'join'} }, 'bill';

	}
	if ($req_data->{'product_group'}) {

		$search->{'product.product_group'} = {  '=', $req_data->{'product_group'} } ;
		push @{ 	$c->stash->{'attributes'}->{'join'} }, 'product';
	}

	if ($req_data->{'transaction_no'}) {
		
		if ($req_data->{'transaction_no'} =~ m/(\d+)-(\d+)/s) {
			
			$search->{'me.transaction_no'} = {  'IN', [$1..$2] };

		} else {

			$search->{'me.transaction_no'} = {  'IN', [ split(/,/, $req_data->{'transaction_no'}) ] } ;
		}

	}
	
	$c->stash->{'attributes'}->{ 'order_by' } = { -desc => "me.id" };
	$c->stash->{'attributes'}->{ 'prefetch' } = [qw/bill product /]  ;
	$c->stash->{'attributes'}->{ 'rows' } = 10 unless ($c->req->method eq 'POST');
	$c->stash->{'search'} = $search ;
}


=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
