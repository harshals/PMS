#
#===============================================================================
#
#         FILE:  Customer.pm
#
#  DESCRIPTION:  
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  06/12/2010 18:46:38 IST
#     REVISION:  ---
#===============================================================================

package Schema::ResultSet::Customer;
use strict;
use warnings;
use Carp qw/croak confess/;
use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::ResultSet/;

sub everyone{

	my ($self ) = @_;

	$self->look_for( undef, { 'order_by' => [qw/name/] , 'cache_for' => 86400 });
}


sub clear_cache {
	
	my $self = shift;

	$self->everyone->cursor->clear_cache if $self->everyone->cursor->can('clear_cache');
}


__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
