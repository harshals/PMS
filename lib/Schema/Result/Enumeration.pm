package Schema::Result::Enumeration;

use strict;
use warnings;

use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::Result/;

## additional custom columns

#__PACKAGE__->add_columns(
#		"is_important", { data_type => "INTEGER", is_nullable => 0 },
#);


__PACKAGE__->table("enumeration");
__PACKAGE__->add_columns(

		"class", { data_type => "VARCHAR(200)", is_nullable => 0 },
		"attr", { data_type => "VARCHAR(200)", is_nullable => 0 },
		"sequence", { data_type => "INTEGER", is_nullable => 0 },
		"value", { data_type => "VARCHAR(20)", is_nullable => 0 },
		"description", { data_type => "VARCHAR(200)", is_nullable => 0 },
		"category", { data_type => "VARCHAR(200)", is_nullable => 1 },
		"is_default", { data_type => "INTEGER", is_nullable => 1 },
);

__PACKAGE__->add_base_columns;

__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::DB::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:obZUGgvkve3e6mzPk8GEEg

# You can replace this text with custom content, and it will be preserved on regeneration

## Enumeration table contents 
# begin_date 2011-04-01
# end_date 2012-03-31
# 
# # invoice_type [excise, commercial, both ]
=pod
CREATE TABLE enumeration (
  class VARCHAR(200) NOT NULL,
  attr VARCHAR(200) NOT NULL,
  sequence INTEGER NOT NULL,
  value VARCHAR(20) NOT NULL,
  description VARCHAR(200),
  category VARCHAR(200) ,
  is_default INTEGER ,
  id INTEGER PRIMARY KEY NOT NULL,
  _id varchar(100) NOT NULL,
  created_on DATETIME NOT NULL,
  updated_on DATETIME NOT NULL,
  access_read TEXT NOT NULL,
  access_write TEXT NOT NULL,
  active INTEGER NOT NULL,
  status TEXT NOT NULL,
  data BLOB,
  log TEXT
)
=cut

sub extra_columns {
    
    my $self = shift;

    return qw//;
};

sub my_relations {

    my $self = shift;
	return qw//;
}

after 'save' => sub {
	
	my $self = shift;

	my $rs = $self->result_source->resultset;

	$rs->for($self->class, $self->attr)->cursor->clear_cache 
		if $rs->for($self->class, $self->attr)->cursor->can('clear_cache');
};

__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
