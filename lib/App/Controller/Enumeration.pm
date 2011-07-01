package App::Controller::Enumeration;

use strict;
use warnings;
use base 'App::Base::Controller';

=head1 NAME

App::Controller::Company - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut

=pod
sub base :Chained('/') :PathPart('ajax/enumeration'): CaptureArgs(0) {

    my ( $self, $c ) = @_;

    $c->stash->{"model" } = $c->model("DemoDB::Enumeration");
    $c->stash->{"template_prefix" } = "enumeration";
    $c->stash->{"result_key"} =  "enumeration";


}

=cut
=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
