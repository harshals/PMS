package App::Controller::User;

use strict;
use warnings;
use base qw/App::Base::Controller/;

=head1 NAME

App::Controller::User - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

sub base :Chained('/') :PathPart('user'): CaptureArgs(0) {

    my ( $self, $c ) = @_;
	$c->stash->{"model" } = $c->model("DemoDB::User");
	#$c->stash->{"model"}->result_source->schema->user(1);
	$c->stash->{"template_prefix" } = "user";
	$c->stash->{"result_key"} =  "user";

}

=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
