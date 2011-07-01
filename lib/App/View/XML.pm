package App::View::XML;

use strict;
use base qw( Catalyst::View );
use File::Temp qw/ tempfile /;
use XML::Simple::ACES;

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

sub process {
    my $self = shift;
    my ($c) = @_;

    my $template = $c->stash->{template};
    my $content = $self->render( $c, $template, $c->stash );

     
    $c->log->debug("canot render") unless $content;

	$content =~ s/<(\/?)\d /<$1/g; 

	$content = <<CONTENT;

<ACES xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="ACES_DLR.xsd" > 
	$content
</ACES>
CONTENT

	
	my ($fh, $filename) = tempfile();

	my $xsd = $c->path_to('root','static','extra','dealer.xsd');

	print $fh, $content;

	my $output = `xmllint --schema $xsd --noout --htmlout $filename 2>&1`;


	unless ($output =~ m/fails to validate/) {

		$c->res->headers->header( "Content-Type" => "text/xml" );
 	
 		$c->response->header( 'Content-Disposition' => 'attachment; filename=data.xml');
	}else {
		
		$content = <<HTML;
	
HTML
	}

    $c->res->body($content);
}

sub render {
    my $self = shift;
    my ( $c, $template, $args ) = @_;

    my $content;

    my $stash_key = 'aces';

    $content = $c->stash->{$stash_key}{'data'} || $c->response->body;

    if(ref($content) =~ /HASH/) {
      my $xs = new XML::Simple::ACES(keeproot => 1 );
      $content = $xs->XMLout($content);
    }

    return $content;
}
1;
__END__


