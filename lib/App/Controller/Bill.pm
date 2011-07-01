package App::Controller::Bill;

use strict;
use warnings;
use base 'App::Base::Controller';

=head1 NAME

App::Controller::Bill - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub index :Private: Path :Args(0) {
    my ( $self, $c ) = @_;


	my $model = $c->model("DemoDB::Bill");

	#$model->result_source->schema->user(1);

	my $invoice = $model->fetch(1);

    $c->response->body($invoice->has_access);
}

sub base :Chained('/') :PathPart('bill'): CaptureArgs(0) {

    my ( $self, $c ) = @_;
	$c->stash->{"model" } = $c->model("DemoDB::Bill");
	#$c->stash->{"model"}->result_source->schema->user(1);
	$c->stash->{"template_prefix" } = "bill";
	$c->stash->{"result_key"} =  "bill";

}

sub search : Chained('base') : PathPart('') : CaptureArgs(1) {

    my ( $self, $c , $type) = @_;
    
	my $req_data =   $c->req->params  ;

    my $search ;

    $req_data->{'from_date'} ||= $c->stash->{date_begin};
    $req_data->{'to_date'} ||= $c->stash->{date_end};

    $search->{'-and'} = [   'me.bill_date' => { '>=' ,  $req_data->{'from_date'} } ,
                            'me.bill_date' => { '<=' ,  $req_data->{'to_date'} } 
                        ];

    $search->{'customer_id'} = {  '=', $req_data->{'supplier_id'} } ;
						
	
	if ($req_data->{'bill_no'}) {
		
		if ($req_data->{'bill_no'} =~ m/(\d+)-(\d+)/s) {
			
			$search->{'me.bill_no'} = {  'IN', [$1..$2] };

		} else {

			$search->{'me.bill_no'} = {  'IN', [ split(/,/, $req_data->{'bill_no'}) ] } ;
		}

	}
	
	if ($type) {
		
		$c->stash->{'type'} = "${type}_id";
		$c->stash->{'attributes'} = { 'order_by' => ["${type}_id"] };
	}
	$c->stash->{'attributes'}->{ 'order_by' } = { -desc => "me.id" };
 	$c->stash->{'attributes'}->{ 'prefetch' } = [qw/transactions customer /]  ;
 	
    $c->stash->{'attributes'}->{ 'rows' } = 10 unless ($c->req->method eq 'POST');
    $Template::Stash::PRIVATE = undef;
	$c->stash->{'search'} = $search ;
}


##this is for testing
=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
