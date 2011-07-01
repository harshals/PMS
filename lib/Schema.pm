package Schema;

use strict;
use warnings;

use Carp qw/croak confess/;
use Text::CSV::Slurp;
use File::Temp qw/tempfile tempdir/;

use Moose;
use namespace::clean -except => 'meta';
#use base 'DBIx::Class::Schema';
extends 'DBICx::Hybrid::Schema';


=head1 NAME

SneakyCat::Controller::Ideas - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

index just forwards to share.  

=cut

__PACKAGE__->load_namespaces(
        result_namespace => 'Result',
        resultset_namespace => 'ResultSet',
        default_resultset_class => '+DBICx::Hybrid::ResultSet');

around connection => sub {
    my ( $inner, $self, $dsn, $username, $pass, $attr ) = ( shift, @_ );

	$attr->{'cusor_class'} = 'DBIx::Class::Cursor::Cached';

    $inner->(@_);

};



# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:N0Xbzj17pzNa19V7V+UXzQ



sub export_to_csv {

    my $self = shift;
	
	my $output_dir = shift;
	my $filename = shift;
	
	my $tmp = tempdir();

	my $result_source = shift;

	croak "Output dir not found " unless -d $output_dir;

	my @sources = ($result_source) ? qw/$result_source/ : $self->sources;	

	foreach my $source (@sources) {

		my $rs = $self->resultset($source);

		my $list = $rs->serialize(6);
		
		my $count = scalar @$list;

		next unless $count;

		my $csv = Text::CSV::Slurp->create( input => $list ) ;
		
		my $file = "$tmp/$source.csv";

		open FH, ">", $file;
		print FH $csv;
		close FH;
	}
	

	#`tar cvf "$filename" $tmp/*.csv|gzip -f "$filename"`;
	`cd $tmp;zip  -D -r "$output_dir/$filename.zip" *.csv`;

	tempdir(CLEANUP => 1);

	return "$output_dir/$filename.zip";
}

sub import_from_csv {

	
	my ($self, $result_source, $file, $append) = @_;

	next unless $self->source($result_source);

	my $rs = $self->resultset($result_source);
	
	my $data =  [];

	$data = Text::CSV::Slurp->load(file       => "$file" );
	
	$rs->delete unless $append;

	foreach my $el (sort { $a->{'id'} <=> $b->{'id'} } @$data) {
		
		if ($append) {

			my $row = $rs->fetch_new();
			$row->save($el);
		}else {
			
			my $row = $rs->new( $el );
			#$row->set_column($_, $el->{$_}) foreach (keys %$el) ;
			$row->insert;
		}
	}

	return $rs->count;
}

sub reset {

	my $self = shift;

	foreach my $source ($self->sources) {
		
		my $rs = $self->resultset($source);

		$rs->delete;
	}
}

__PACKAGE__->meta->make_immutable(inline_constructor => 0);
# You can replace this text with custom content, and it will be preserved on regeneration
1;
