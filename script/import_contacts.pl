#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  import_contacts.pl
#
#        USAGE:  ./import_contacts.pl 
#
#  DESCRIPTION:  Script to import contacts from OLD db to NEW one
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  07/22/10 14:46:15 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;


use Data::Dumper;
use lib "lib";

use MKIDB;
use Schema;

use  XML::Simple;


my $old_schema = MKIDB->connect("dbi:SQLite:mki.db");
my $new_schema = Schema->connect("dbi:SQLite:einvoice.db");

$new_schema->user(1);

my $old_company = $old_schema->resultset("MKIDB::Company");
my $new_company = $new_schema->resultset("Schema::Result::Company");

#$new_company->delete_all;

foreach my $company ($old_company->all) {
	
	my $data = { };

	foreach my $key qw/pan_no name ecc range commissionerate/ {
		
		$data->{$key} = $company->get_column($key)
	}

	$data->{"w_address_1"} = $company->get_column("address_dispatch_1");
	$data->{"w_address_2"} = $company->get_column("address_dispatch_2");
	$data->{"w_city"} = $company->get_column("address_dispatch_city");
	$data->{"w_zip"} = $company->get_column("address_dispatch_zip");

	$data->{"division"}  = $company->get_column("excise_division");
	$data->{"contact_name"}  = $company->get_column("contact_person");

	$data->{"address_1"} = $company->get_column("address_contact_1");
	$data->{"address_2"} = $company->get_column("address_contact_2");
	$data->{"city"} = $company->get_column("address_contact_city");
	$data->{"zip"} = $company->get_column("address_contact_zip");

	$data->{"contact_number"} = $company->get_column("contact_tel_1");
	
	print "\n Importing " . $data->{'name'};
	my $nc = $new_company->fetch_new;
	
	$nc->save($data);

	print ".....saved";

}

