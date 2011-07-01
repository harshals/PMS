#
#===============================================================================
#
#         FILE:  Enumeration.pm
#
#  DESCRIPTION:  
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  04/26/2011 15:53:38 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

package Schema::ResultSet::Enumeration;
use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::ResultSet::Enumeration/;
use Carp;

=head2 resultset->updated_on($days) 

finds a record updated in last # of $days

=cut

sub groups {
	
	my $self = shift;

	my $attr = {
		select => [qw/class attr /, { count => 'id' } ],
		as => [qw/class attr total/ ],
		group_by => [ qw/class attr/],
		order_by => { -asc => [qw/class attr/] }
	};

	return $self->look_for(undef, $attr);
}


__PACKAGE__->meta->make_immutable(inline_constructor => 0 );

1;
