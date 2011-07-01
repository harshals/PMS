use Schema;

my $schema = Schema->init_schema("einvoice.db");

$schema->user(1);

$schema->debug(1);

my $purchase_rs = $schema->resultset("Purchase");

my $purchase = $purchase_rs->fetch_new();

use Data::Dumper;

print Dumper($purchase->serialize(4));


