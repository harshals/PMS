package App::Controller::DB;

use strict;
use warnings;
#use parent "Catalyst::Controller";
use base qw/App::Base::Controller/;
use Date::Manip;
use Text::Wrap::Smart qw(wrap_smart);
=head1 NAME

App::Controller::Others - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub base :Chained('/') :PathPart('db'): CaptureArgs(1) {

    my ( $self, $c, $type) = @_;

    $c->stash->{"model" } = $c->model("DemoDB::$type");
    $c->stash->{"template_prefix" } = "db";
    $c->stash->{"type" } = $type;
    $c->stash->{"result_key"} =  $type;

}

sub search : Chained('base') : PathPart('') : CaptureArgs(1) {

    my ( $self, $c, $method) = @_;
    
    my $type = $c->stash->{'type'};
	my $req_data =   $c->req->params  ;

    my ( $search , $attr ) ;
	
	$method ||= 'from_cgi_prarams';
	$c->stash->{'method'} = $method;

	if ($method eq 'from_cgi_params') {
		
		$search = $req_data;
	}

	if ($self->can("search_$type") && scalar($req_data) ){

		$c->forward("search_$type") ;
	}else {
		$c->stash->{'attributes'}->{ 'order_by' } = { -desc => "me.id" };
		$c->stash->{'attributes'}->{ 'rows' } = 10 unless ($c->req->method eq 'POST');
		$c->stash->{'search'} = $search ;
	}
	
}

sub search_customer: Private {

	my($self, $c) = @_;
	
	my $name = $c->req->param('name');

	$c->stash->{'method'} ||= 'look_for';
	$c->stash->{'attributes'}->{ 'order_by' } = { -desc => "me.id" };
	$c->stash->{'search'} = { name => { 'LIKE' , '%' . $name . '%' }, customer_type => { '!=' , 1 } };


	#$c->stash->{type} = "customer";
    #$c->stash->{template} = "db_form.tt";

}

sub search_payment : Private {
	my($self, $c) = @_;

	my $req_data =   $c->req->params  ;
	my $search =   $c->stash->{'search'};

	$req_data->{'from_date'} ||= $c->stash->{date_begin};
	$req_data->{'to_date'} ||= $c->stash->{date_end};

	$search->{'-and'} = [   'me.instrument_date' => { '>=' ,  $req_data->{'from_date'} } ,
		'me.instrument_date' => { '<=' ,  $req_data->{'to_date'} } 
	];
	$search->{'me.instrument'} = {  '=', $req_data->{'instrument'} } if ($req_data->{'instrument'});
	$search->{'me.payment_type'} = {  '=', $req_data->{'payment_type'} } if ($req_data->{'payment_type'});
	$search->{'me.is_realized'} = {  '=', $req_data->{'is_realized'} } if ($req_data->{'is_realized'});
	$search->{'me.customer_id'} = {  '=', $req_data->{'customer_id'} } if ($req_data->{'customer_id'});

	$c->stash->{'payment_rs'} = ($search) ? $c->model("DemoDB::Payment")->look_for($search, { order_by => { -asc => 'me.instrument_date' }})->serialize : [] ;

	$c->stash->{'template'}    = "db_list.tt";

	$c->stash->{type} = "payment";

}

sub publish : Local : Args(2) {

	my ($self, $c, $method, $id) = @_;

	$c->forward($method, [$id]) if $self->can($method); 

    $c->stash->{pdf_disposition} = 'attachment';  # Default is 'inline'
	$c->forward("App::View::PDF");
}

sub customer_address : Private {
	
	my ($self, $c, $id) = @_;

	$c->stash->{'customer'} = $c->model("DemoDB::Customer")->fetch($id)->serialize if $id;

	$c->stash->{pdf_template} = 'src/customer/address.tt';
	$c->stash->{pdf_filename} = 'address.pdf';

}


=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
