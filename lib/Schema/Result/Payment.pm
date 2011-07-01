package Schema::Result::Payment;

use strict;
use warnings;
use Moose;
use namespace::clean -except => 'meta';
#use base qw/Schema::Base::Result/;
extends qw/DBICx::Hybrid::Result/;



__PACKAGE__->table("payment");
__PACKAGE__->add_columns(

	qw/payment_type instrument_no instrument amount instrument_date is_realized company_id account /
);


__PACKAGE__->add_base_columns;

__PACKAGE__->set_primary_key("id");


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:IEbbWr9Imbum+8sUaLrAAg
sub extra_columns {

	my $class = shift;
	my @columns = $class->next::method(@_);

	push @columns, (qw/bank branch summary/);

	return @columns;
}

# You can replace this text with custom content, and it will be preserved on regeneration
__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
