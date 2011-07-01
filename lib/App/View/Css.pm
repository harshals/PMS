package App::View::Css;

use strict;
use Moose;
use Carp qw/croak/;

use Path::Class qw/dir/;
extends qw/Catalyst::View::CSS::Minifier::XS/;

around 'process' => sub {
	
    my ($orig, $self, $c ) = @_;

	if ($c->stash->{$self->stash_variable} eq 'all') {
		
		my $css_dir = $self->css_dir;

		my $abs_path = $c->path_to("root",$css_dir);

		$c->log->debug($abs_path);
		croak "Css directory not found" unless -d $abs_path;

		my $dh = dir($abs_path) || croak "Can't open directory";


		$c->stash->{$self->stash_variable} = [];
		foreach my $js_file (sort $dh->children()) {
			
			next if $js_file->is_dir;

			push @{ $c->stash->{$self->stash_variable} }, $js_file->basename if (-f $js_file->absolute && $js_file->basename =~ m/\.css$/i ) ;
		}

	}
	$self->$orig($c);
	
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
