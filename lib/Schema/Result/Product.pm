package Schema::Result::Product;

use strict;
use warnings;
use Moose;
use namespace::clean -except => 'meta';
#use base qw/Schema::Base::Result/;


extends qw/DBICx::Hybrid::Result/;

__PACKAGE__->table("product");

__PACKAGE__->add_columns(

		"name", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"high", { data_type => "REAL", is_nullable => 0 },
		"low", { data_type => "REAL", is_nullable => 0 },
		"balance", { data_type => "REAL", is_nullable => 0 },
		"market_rate", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"date", { data_type => "DATETIME", is_nullable => 0 },
		"product_type", { data_type => "VARCHAR(100)", is_nullable => 0 },
		"product_group", { data_type => "VARCHAR(100)", is_nullable => 0 },
);
__PACKAGE__->add_base_columns;
__PACKAGE__->set_primary_key("id");

__PACKAGE__->belongs_to(
  "transaction",
  "Schema::Result::Transaction",
  { "foreign.product_id" => "self.id" },
);


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:IEbbWr9Imbum+8sUaLrAAg

# You can replace this text with custom content, and it will be preserved on regeneration

sub extra_columns {
    
    my $self = shift;

    return qw/www bse_script_code nse_script_code use_script_code market_lot/;
};

after 'save' => sub {
	
	my $self = shift;

	my $rs = $self->result_source->resultset;

	$rs->all_products->cursor->clear_cache;
	$rs->groups->cursor->clear_cache;
	$rs->types->cursor->clear_cache;
};

__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
