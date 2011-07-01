#
#===============================================================================
#
#         FILE:  cache.t
#
#  DESCRIPTION:  
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  04/27/2011 12:12:03 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;

use Test::More  ;                     # last test to print

use lib "lib";

use Schema;
use Cache::FileCache;
use DBIx::Class::Cursor::Cached;

my $schema = Schema->connect("dbi:SQLite:dbname=einvoice.db", undef, undef, { cursor_class => 'DBIx::Class::Cursor::Cached' });

$schema->default_resultset_attributes({
    cache_object => Cache::FileCache->new({ namespace => 'Schema' }),
});


my $rs = $schema->resultset("Enumeration");

my $results = $rs->search_rs( { 'class' => 'Master' } , { cache_for => 1800 });

$results->cursor->clear_cache;

diag $results->count;

my $list = [ $results->all ];

diag scalar(@$list);

my $nschema = Schema->connect("dbi:SQLite:dbname=einvoice.db", undef, undef, { cursor_class => 'DBIx::Class::Cursor::Cached' });

$nschema->default_resultset_attributes({
    cache_object => Cache::FileCache->new({ namespace => 'Schema' }),
});

my $nrs = $nschema->resultset("Enumeration");

$results = $nrs->search_rs( { 'class' => 'Master' } , { cache_for => 1800 });

my $serialized = $results->serialize(8);

diag scalar(@$serialized);


done_testing;

