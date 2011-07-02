package Schema::Result::Transaction;

use strict;
use warnings;

use Carp qw/croak confess/;
use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::Result/;
#extends qw/Schema::Base::Result/;

__PACKAGE__->table("trans");
__PACKAGE__->add_columns(
	
		"bill_id", { data_type => "INTEGER", is_nullable => 0 },
		"product_id", { data_type => "INTEGER", is_nullable => 0 },
		"transaction_no", { data_type => "INTEGER", is_nullable => 0 },
		"transaction_date", { data_type => "DATETIME", is_nullable => 0 },
		"transaction_type", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"total", { data_type => "REAL", is_nullable => 0 },
		"quantity", { data_type => "REAL", is_nullable => 0 },
		"rate", { data_type => "REAL", is_nullable => 0 },
		"rounded", { data_type => "REAL", is_nullable => 0 },
		"bought", { data_type => "INTEGER", is_nullable => 0 },
);

__PACKAGE__->add_base_columns;

__PACKAGE__->set_primary_key("id");
#__PACKAGE__->add_unique_constraint("invoice_no_unique", ["invoice_no"]);

__PACKAGE__->belongs_to(
	"bill", 
	"Schema::Result::Bill", 
	{ "foreign.id" => "self.bill_id" });

__PACKAGE__->belongs_to(
  "product",
  "Schema::Result::Product",
  { "foreign.id" => "self.product_id" },
);

sub my_relations {

    my $self = shift;
	return qw/product/;
}


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:IEbbWr9Imbum+8sUaLrAAg
sub extra_columns {

	my $class = shift;
	my @columns = $class->next::method(@_);

	push @columns, qw/taxable_value brokerage_rate brokerage net_rate stt_rate stt transaction_charge_rate transaction_charge/;

	return @columns;
}


# You can replace this text with custom content, and it will be preserved on regeneration
__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
