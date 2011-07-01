package Schema::Result::User;

use strict;
use warnings;
use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::Result/;
# use base qw/Schema::Base::Result/;

__PACKAGE__->table("user");
__PACKAGE__->add_columns(

		"username", { data_type => "VARCHAR(200)", is_nullable => 0 },
		"password", { data_type => "VARCHAR(200)", is_nullable => 0 },
);

__PACKAGE__->add_base_columns;

__PACKAGE__->set_primary_key("id");
__PACKAGE__->add_unique_constraint("username_unique", ["username"]);


# Created by DBIx::Class::Schema::Loader v0.04006 @ 2009-08-13 21:11:53
# DO NOT MODIFY THIS OR ANYTHING ABOVE! md5sum:IEbbWr9Imbum+8sUaLrAAg

sub extra_columns {

	my $class = shift;
	my @columns = $class->next::method(@_);

	push @columns, qw/name email profile_image/;
	
	return @columns;

}
# You can replace this text with custom content, and it will be preserved on regeneration
__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
