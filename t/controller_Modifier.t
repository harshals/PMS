use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'App' }
BEGIN { use_ok 'App::Controller::Modifier' }

ok( request('/modifier')->is_success, 'Request should succeed' );


