#
#===============================================================================
#
#         FILE:  import.t
#
#  DESCRIPTION:  
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  05/02/2011 12:46:40 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use Test::More ;


use Schema;

my $schema = Schema->init_schema("einvoice.db");

$schema->user(1);

my $rows = $schema->import_from_csv("Enumeration", "t/Enumeration.csv", 1);

diag "imported $rows rows";

done_testing;
