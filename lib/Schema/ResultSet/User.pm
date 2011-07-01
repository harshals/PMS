#
#===============================================================================
#
#         FILE:  User.pm
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

package Schema::ResultSet::User;

use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::ResultSet/;

sub users {
	
	my $self = shift;

	return $self->look_for({ id => { '!=' , 1 } } );
}


__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;


