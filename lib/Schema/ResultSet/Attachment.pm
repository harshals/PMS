
#
#===============================================================================
#
#         FILE:  Attachment.pm
#
#  DESCRIPTION:  
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  04/27/2011 17:11:40 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

package Schema::ResultSet::Attachment;

use Moose;
use Carp qw/croak confess/;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::ResultSet/;

sub attachments_for {
	
	my $self = shift;
	my $class = shift;
	my $id = shift;
	my $uuid = shift;

	my $search = {};
	
	croak "Can't find attachments without requisite class " unless $class;

	$search->{owner_class} = $class;

	$search->{owner_id} = $id if $id;
	$search->{owner_uuid} = $id if $uuid;

	return $self->look_for($search );
}


__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;


