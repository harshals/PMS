package App::View::Wkhtmltopdf;

use HTML::Selector::XPath;
use HTML::TreeBuilder::XPath;
use Moose;

extends qw/Catalyst::View::Wkhtmltopdf/;

before 'process' => sub {
	
	my ($self, $c) = @_;

	my $html = $c->stash->{ $self->stash_key }->{html};

	## clean html 
	
	my $base = $c->req->base;

	$html =~ s/$base//igs;

	my $tree = HTML::TreeBuilder::XPath->new_from_content($html);
  	
  	my $selector = HTML::Selector::XPath->new("div#content");

	$html = $tree->findnodes($selector->to_xpath)->[0]->as_HTML;

	$c->stash->{ $self->stash_key }->{html} = $html;

};

__PACKAGE__->meta->make_immutable();

1;
