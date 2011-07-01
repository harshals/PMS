package App::View::Gmail;

use strict;
use Email::MIME;
use HTML::Selector::XPath;
use HTML::TreeBuilder::XPath;
use Moose;

extends qw/Catalyst::View::Email::Template/;

around 'generate_part' => sub {
	
    my ($orig, $self, $c, $attrs ) = @_;

	my $part = $self->$orig($c, $attrs);
	
	my $html = $part->body_str;

	## clean html 
	
	my $base = $c->req->base;

	$html =~ s/$base//igs;

	my $tree = HTML::TreeBuilder::XPath->new_from_content($html);
  	
  	my $selector = HTML::Selector::XPath->new("div#content");

	$html = $tree->findnodes($selector->to_xpath)->[0]->as_HTML;

	$part->body_str_set($html);

	return $part;
};

__PACKAGE__->meta->make_immutable();
=head1 NAME

App::View::Gmail - Email View for App

=head1 DESCRIPTION

View for sending email from App. 

=head1 AUTHOR

Harshal Shah

=head1 SEE ALSO

L<App>

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
