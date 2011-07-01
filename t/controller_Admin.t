use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'App' }
BEGIN { use_ok 'App::Controller::Admin' }

ok( request('/admin')->is_success, 'Request should succeed' );


