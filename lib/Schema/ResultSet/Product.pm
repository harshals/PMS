#
#===============================================================================
#
#         FILE:  Product.pm
#
#  DESCRIPTION:  
#
#        FILES:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  06/12/2010 18:46:38 IST
#     REVISION:  ---
#===============================================================================

package Schema::ResultSet::Product;
use strict;
use warnings;

use Moose;
use namespace::clean -except => 'meta';
extends qw/DBICx::Hybrid::ResultSet/;

sub types {

	my ($self ) = @_;

	my $attributes = { 
		
		'order_by' => [qw/product_type/ ] ,
		columns => [qw/product_type/],
		distinct => 1,
		cache_for => 86400
	};

	$self->look_for( {}, $attributes);
}



sub groups {

	my ($self ) = @_;

	my $attributes = { 
		
		'order_by' => [qw/product_group/ ] ,
		columns => [qw/product_group/],
		distinct => 1,
		cache_for => 86400
	};

	$self->look_for( {}, $attributes);
}

sub all_products {

	my $self = shift;

	$self->look_for(undef, { cache_for => 86400 });
}

sub available_stock {

	my $self = shift;
	my $product_type = shift;

	my $search = { balance => { '>' , 0 }};

	$search->{product_type} = $product_type if $product_type;

	$self->look_for($search);
}

__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
