package Schema::Result::Customer;

use strict;
use warnings;
use Carp qw/croak confess/;
use Moose;
use namespace::clean -except => 'meta';
#use base qw/Schema::Base::Result/;
extends qw/DBICx::Hybrid::Result/;

__PACKAGE__->table("customer");
__PACKAGE__->add_columns(

		"name", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"family", { data_type => "VARCHAR(100)", is_nullable => 1 },
		"customer_type", { data_type => "INTEGER", is_nullable => 0 },
);

__PACKAGE__->add_base_columns;

__PACKAGE__->set_primary_key("id");

__PACKAGE__->has_many(
  "bills",
  "Schema::Result::Bill",
  { "foreign.customer_id" => "self.id" },
);

# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:IEbbWr9Imbum+8sUaLrAAg

## Customer type is an enumerated dataset with following values
## 1 => depot
## 2 => Buyers
## 3 => Sellers
## 4 => Transporters

sub extra_columns {

	my $class = shift;
	my @columns = $class->next::method(@_);

	push @columns, (qw/tel_no fax_no address_1 address_2 address_3 city state zip country/);

	return @columns;
}


__PACKAGE__->meta->make_immutable(inline_constructor => 0);
# You can replace this text with custom content, and it will be preserved on regeneration
1;
