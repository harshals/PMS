package App::Base::Controller;
#
#===============================================================================
#
#         FILE:  Base.pm
#
#  DESCRIPTION:  Base controllers for catalyst
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  09/07/2009 15:48:59 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;
use JSON::XS qw/encode_json/;
use Data::GUID;

use base "Catalyst::Controller";

sub new_form: Chained('base') : PathPart("new") : Args {

	my ($self, $c, $template) = @_;

	my $model = $c->stash->{"model"};
	
	my $obj =  $model->fetch_new;
	
	$c->stash->{"template"} =  $c->stash->{"template_prefix"} . "_form.tt" ;

	$obj = $obj->serialize(4);
	$obj->{form_template} = ($template) ? "form_$template" : 'form';

	$c->stash->{ $c->stash->{'result_key'} } = $obj;
	
	$c->stash->{"form_template"} = $obj->{form_template};

}

sub get : Chained('base') : PathPart("get") : Args(1) {

	my ($self, $c, $id) = @_;

	my $model = $c->stash->{"model"};
	
	my $obj = ($id eq 'new') ? $model->fetch_new : $model->fetch($id);

	$obj = $obj->serialize(4);
	$obj->{form_template} ||= 'form';

	$c->stash->{"template"} =  $c->stash->{"template_prefix"} . "_form.tt" ;
	$c->stash->{ $c->stash->{'result_key'} } = $obj;
	
	$c->stash->{"form_template"} = ($c->req->param('form_template') ) ? $c->req->param('form_template') : $obj->{form_template} ;

}

sub delete: Chained('base') : PathPart("delete") : Args(1) {

	my ($self, $c, $id) = @_;

	my $model = $c->stash->{"model"};
	
	my $obj =  $model->fetch($id);

	my $status = $obj->remove;
	
	$c->stash->{message} = ($status) ? "Deleted Successfully" : "Unable to delete";
	$c->stash->{error} =  "Unable to delete" unless $status;

}

sub put: Chained('base') : PathPart("put") : Args(0) {

	my ($self, $c) = @_;

	my $model = $c->stash->{"model"};
	
	my $req_data =   $c->req->params  ;

	my $obj = ($req_data->{'id'}) ? $model->fetch($req_data->{'id'}) : $model->fetch_new ;
	
	foreach my $field (keys %{ $c->req->uploads }) {
		
		my $upload = $c->req->upload($field);

 		my $guid = Data::GUID->new;
		
		$upload->type =~ m/.*\/(.+)$/is;

		$guid .= "." . $1;

		my $path = $c->path_to("root","static","extra", $guid);

		$upload->copy_to($path);

		$req_data->{ $field } = $guid;
	}

	$obj->save($req_data);
	
	$c->stash("message", "Saved Successfully");
	$c->stash->{"template"} =  $c->stash->{template_prefix} . "_form.tt";
	$c->stash->{ $c->stash->{result_key} } = $obj->serialize(1);
	$c->stash->{"form_template"} = $c->stash->{ $c->stash->{'result_key'} }->{ 'form_template' } || 'form';
	
	#$c->forward("App::View::HTMl");

	#$c->forward("get", [ $obj->id ]);

}

sub list : Chained('search') : PathPart("search") : Args(0) {

	my ($self, $c) = @_;

	my $model = $c->stash->{"model"};
	
	my $search =   $c->stash->{'search'};
	my $attributes =   $c->stash->{'attributes'};
	my $method =   ($model->can($c->stash->{'method'})) ? $c->stash->{'method'} : 'look_for';

    $c->stash->{ $c->stash->{result_key} . "_rs" } =  $model->$method($search, $attributes) ;

    $c->stash->{"template"} =  $c->stash->{template_prefix} . "_list.tt";

}


1;
