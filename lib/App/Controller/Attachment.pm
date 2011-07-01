package App::Controller::Attachment;

use strict;
use warnings;
use base 'App::Base::Controller';

=head1 NAME

App::Controller::Attachment - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut


sub base :Chained('/') :PathPart('attachment'): CaptureArgs(0) {

    my ( $self, $c ) = @_;

    $c->stash->{"model" } = $c->model("DemoDB::Attachment");
    #$c->stash->{"model"}->result_source->schema->user(1);
    $c->stash->{"template_prefix" } = "attachment";
    $c->stash->{"result_key"} =  "attachment";

}
sub download : Chained('base') : PathPart("download") : Args(1) {
    
	my ($self, $c, $id) = @_;

	my $model = $c->stash->{"model"};
	
	my $obj = $model->fetch($id);
	my $type = $obj->content_type;
 #   my $path = $c->path_to("root","static","extra", $obj->_id);
 
	$type =~ m/.*\/(.+)$/is;
	my $ext = $1;
	my $name = $obj->name ;

	$c->res->headers->header( "Content-Type" => $type );
 	$c->response->header( 'Content-Disposition' => "attachment; filename=\"$name\.$ext\"");
 	$c->log->debug($obj->path);
	$c->serve_static_file($obj->path);

}
sub upload : Chained('base') : PathPart("upload") : Args(0) {

	my ($self, $c) = @_;

	my $model = $c->stash->{"model"};
	
	my $req_data =   $c->req->params  ;

	my $obj = ($req_data->{'id'}) ? $model->fetch($req_data->{'id'}) : $model->fetch_new ;
	
	$obj->save($req_data);

	foreach my $field (keys %{ $c->req->uploads }) {
		
		my $upload = $c->req->upload($field);

 		my $guid = $obj->_id;
		
		$c->log->debug($guid);

		$obj->content_type($upload->type);

		$upload->type =~ m/.*\/(.+)$/is;

		$guid .= "." . $1;

		my $path = $c->path_to("root","static","extra", $guid);

		$upload->copy_to($path);

		$obj->path( $path );
		
	    $obj->update;
	}

	
	$c->stash("message", "Saved Successfully");
	$c->stash->{"template"} =  $c->stash->{template_prefix} . "_form.tt";
	$c->stash->{ $c->stash->{result_key} } = $obj->serialize(1);
	
}
=head1 AUTHOR

A clever guy

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
