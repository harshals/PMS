package Schema::Result::Bill;

use strict;
use warnings;

use Carp qw/croak confess/;
use Moose;
use namespace::clean -except => 'meta';
#extends qw/Schema::Base::Result/;
extends qw/DBICx::Hybrid::Result/;

__PACKAGE__->table("bill");

__PACKAGE__->add_columns(

		"bill_no", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"bill_date", { data_type => "DATETIME", is_nullable => 0 },
		"total", { data_type => "REAL", is_nullable => 0 },
		"settlement_type", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"settlement_no", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"bill_type", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"customer_id", { data_type => "INTEGER", is_nullable => 0 },
		"taxable_value", { data_type => "REAL", is_nullable => 0 },
		"exchange", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"financial_year", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"rounded", { data_type => "REAL", is_nullable => 0 },
);

__PACKAGE__->add_base_columns;

__PACKAGE__->set_primary_key("id");

__PACKAGE__->add_unique_constraint([ qw/bill_no/ ]);

__PACKAGE__->has_many(
  "transactions",
  "Schema::Result::Transcation",
  { "foreign.bill_id" => "self.id" },
);
__PACKAGE__->belongs_to(
  "customer",
  "Schema::Result::Customer",
  { "foreign.id" => "self.customer_id" },
);

__PACKAGE__->has_many(
  "attachments",
  "Schema::Result::Attachments",
  { "foreign.owner_uuid" => "self._id" },
);

# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:obZUGgvkve3e6mzPk8GEEg
sub my_relations {

    my $self = shift;
	
	return qw/transcations customer/;
}


sub extra_columns {

	my $class = shift;
	my @columns = $class->next::method(@_);

	push @columns, qw/service_tax_rate service_tax stt_rate stt turnover_tax_rate turnover_tax /;

	return @columns;
}


# You can replace this text with custom content, and it will be preserved on regeneration

__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
