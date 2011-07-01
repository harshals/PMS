package App::View::HTML;

use strict;
use base 'Catalyst::View::TT';

__PACKAGE__->config( {
    INCLUDE_PATH => [
        App->path_to( 'root', 'src' ),
        App->path_to( 'root', 'lib' ),
        App->path_to( 'root', 'static' )
    ],
	TEMPLATE_EXTENSION => '.tt'
    },
);

=head1 NAME

App::View::HTML - TT View for App

=head1 DESCRIPTION

TT View for App. 

=head1 SEE ALSO

L<App>

=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
