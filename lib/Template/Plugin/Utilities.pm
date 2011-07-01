package Template::Plugin::Utilities;
#
#===============================================================================
#
#         FILE:  WrapChunks.pm
#
#  DESCRIPTION:  
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  06/22/2011 15:19:23 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use vars qw($VERSION);
$VERSION = 0.01;

require Template::Plugin;
use base qw/Template::Plugin/;
use Text::Wrap qw/wrap/;
use Text::Wrap::Smart qw(wrap_smart);
use Number::Spell qw/spell_number/;

sub chunkize{
	
	my $self = shift;
 	my $str = shift;
    my $width = shift;
    my $smart = shift;
	my $chunks;
	
	unless ($smart) {
		local($Text::Wrap::columns) = $width;
    	local($Text::Wrap::separator) = '|';

    	$str = wrap('','', $str);
    	$chunks = [  split(/\|/,$str) ];

	}else {
		my %options = (
             	no_split => 1,
             	max_msg_size => $width
        );
        $chunks = [ wrap_smart( $str, \%options) ];
	}

    return $chunks;
}

sub in_words {
	my $self = shift;
 	my $number = shift;

	
	return spell_number( $number , Format => 'in');
}

1;
__END__

