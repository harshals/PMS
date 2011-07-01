#
#===============================================================================
#
#         FILE:  Transaction.pm
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

package Schema::ResultSet::Transaction;
use strict;
use warnings;

use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::ResultSet/;
#extends qw/Schema::Base::ResultSet/;

use Carp qw/croak confess/;



__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
