package MKIDB;

# Created by DBIx::Class::Schema::Loader v0.03007 @ 2006-08-04 12:20:26

use strict;
use warnings;

use base 'DBIx::Class::Schema';

__PACKAGE__->load_classes({ MKIDB => [qw/Company Sales Purchase Collections Stocks User UserRole Role Cash LC/] });

1;

