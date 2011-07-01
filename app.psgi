
use Plack::Builder;

use lib "lib";
use App;
App->setup_engine('PSGI');
my $app = sub { App->run(@_) };


builder {

	mount "/" => builder {
		enable 'Session', store => 'File';
		enable 'Debug' ,
			panels => [qw/Memory Response Timer Environment Dancer::Settings Dancer::Logger Parameters Dancer::Version Session DBIC::QueryLog/];
		enable "SimpleLogger";
		# enable ConsoleLogger;
		#enable "Plack::Middleware::Static::Minifier",
        #  	   path => qr{^/?(images|javascript|css)/}, root => './public/';
		enable "Deflater",
        content_type => ['text/css','text/html','text/javascript','application/javascript'],
        vary_user_agent => 1;
          	   
		$app;
	},
}

