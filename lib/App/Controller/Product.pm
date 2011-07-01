package App::Controller::Product;

use strict;
use warnings;
use base 'App::Base::Controller';
use Text::CSV;
=head1 NAME

App::Controller::Others - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut


=pod
sub base :Chained('/') :PathPart('ajax/product'): CaptureArgs(0) {

    my ( $self, $c ) = @_;

    $c->stash->{"model" } = $c->model("DemoDB::Product");
    $c->stash->{"template_prefix" } = "product";
    $c->stash->{"result_key"} =  "product";

}
=cut

=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
