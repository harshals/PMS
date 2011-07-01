#
#===============================================================================
#
#         FILE:  ACES.pm
#
#  DESCRIPTION:  subclass of XML::Simple for parsing ACES data
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  04/16/2011 17:38:35 IST
#     REVISION:  ---
#===============================================================================

package XML::Simple::ACES;
use strict;
use warnings;

use base qw/XML::Simple/;

sub sorted_keys {
	
	my ($self, $name, $hashref) = @_;

	my @keys = keys %$hashref;

#	print "\ncoming here " . scalar(@keys);
	
#	print Dumper($hashref);


	return sort {$a <=> $b} @keys;
}

1;

