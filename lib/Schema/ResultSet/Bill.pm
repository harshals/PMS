#
#===============================================================================
#
#         FILE:  Bill.pm
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

package Schema::ResultSet::Bill;
use strict;
use warnings;

use Carp qw/croak confess/;
use Moose;
use namespace::clean -except => 'meta';
#extends qw/Schema::Base::ResultSet/;
extends qw/DBICx::Hybrid::ResultSet/;



=pod
override 'fetch' => sub {

	my $self = shift;
	my $id = shift;
	croak("Need primary key to find the object") unless $id;	

#	my $attributes = { prefetch  => [qw/supplier product /] };

	my $object = $self->has_access->is_valid->find($id, $attributes);

	croak("user object not found") unless $object;	

	return $object;
};
=cut

sub get_transactions{
	
	my ($self , $id) = @_;

	return $self->search_related_rs("transcations",{ bill_id => $id} )->is_valid->has_access->serialize;
}


sub is_opening_stock {
	
	my ($self, $purchase_id, $begin ) = @_;

	my $search;

	$search->{'id'} = $purchase_id;

	$begin ||= $self->result_source->schema->resultset("Enumeration")->for("Master", "begin_date")->first->value;

	$search->{'invoice_date'} = { '<=' ,  $begin};

	return $self->search($search)->count ; 
										
}

sub stockregister {
	
	my ($self, $search) = @_;

	## assuming u r in purchase 
	

    return $self->look_for($search )->serialize(4);

}

__PACKAGE__->meta->make_immutable(inline_constructor => 0);
1;
