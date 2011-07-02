#!/usr/bin/env perl 
#===============================================================================
#
#         FILE:  deploy.pl
#
#        USAGE:  ./deploy.pl 
#
#  DESCRIPTION:  
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Harshal Shah (Hs), <harshal.shah@gmail.com>
#      COMPANY:  MK Software
#      VERSION:  1.0
#      CREATED:  03/17/2011 18:25:03 IST
#     REVISION:  ---
#===============================================================================

use strict;
use warnings;
use lib "lib";
use Schema;

my $schema = Schema->init_schema("pms.db");
$schema->user(1);

$schema->deploy();

my $user_rs = $schema->resultset("User");

my $user = $user_rs->fetch_new();

$user->save({ username => 'admin' , password => 'nimda' });
$user = $user_rs->fetch_new();
$user->save({ username => 'harshal' , password => 'nimda' });
$user = $user_rs->fetch_new();
$user->save({ username => 'yogita' , password => 'mumbai' });
$user = $user_rs->fetch_new();
$user->save({ username => 'rajesh' , password => 'ahmedabad' });

my $enum_rs = $schema->resultset("Enumeration");

my $enum = $enum_rs->fetch_new();

$enum->save( {
	
	class => 'Master',
	attr => 'begin_date',
	is_default => 1,
	sequence	=> 1,
	value => '2011-04-01',
	description => 'Beginning of the FY'
});

my $enum2 = $enum_rs->fetch_new();
$enum2->save( {
	
	class => 'Master',
	attr => 'end_date',
	is_default => 1,
	sequence	=> 1,
	value => '2012-03-31',
	description => 'End of the FY'
});
