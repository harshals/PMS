use strict;
use warnings;

use Test::More  ;                     # last test to print

use lib "lib";

use Schema;
use Cache::FileCache;
use DBIx::Class::Cursor::Cached;

my $schema = Schema->connect("dbi:SQLite:dbname=einvoice.db", undef, undef );


my $rs = $schema->resultset("Sale");

diag $rs->count;

my $list = $rs->serialize(6);

diag scalar(@$list);

done_testing;
