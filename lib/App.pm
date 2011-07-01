package App;

use strict;
use warnings;

use Catalyst::Runtime '5.70';

# Set flags and add plugins for the application
#
#         -Debug: activates the debug mode for very useful log messages
#   ConfigLoader: will load the configuration from a Config::General file in the
#                 application's home directory
# Static::Simple: will serve static files from the application's root
#                 directory

use parent qw/Catalyst/;
use Catalyst qw/-Debug
                ConfigLoader
                Static::Simple
                Authentication
                Session
                Session::Store::File
                Session::State::Cookie
                Cache
                MobileAgent
                /;
our $VERSION = '0.01';

# Configure the application.
#
# Note that settings in app.conf (or other external
# configuration file that you set up manually) take precedence
# over this when using ConfigLoader. Thus configuration
# details given here can function as a default configuration,
# with an external configuration file acting as an override for
# local deployment.


#__PACKAGE__->config->{recaptcha}->{pub_key} = '6LeclQgAAAAAAFuVPE1Fvh12HYxQEtA8WqB4-6yY';
#__PACKAGE__->config->{recaptcha}->{priv_key} = '6LeclQgAAAAAAM_Zqx8-WlrDGOzJlujquLmGrEBF';
=pod
__PACKAGE__->config->{ 'Plugin::Authentication'}  = {
        
   default => {
                store_user_class  => 'Schema::Result::User',
                user_model      => 'DemoDB::User',
                password_type   => 'clear',
            },

};
=cut
#__PACKAGE__->config( 
#	'Plugin::Authentication' =>
#        {
#           default => {
#                credential => {
#                    class => 'Password',
#                    password_field => 'password',
#                    password_type => 'clear'
#                    },
#                store => {
#                    class => 'Minimal',
#                    users => {
#                           'guest@xyz.com' => {
#                                password => "guest",                   
#                           },
#                          'admin@xyz.com' => {
#                                password => "admin",
#                           }
#                        }       
#                }
#            }
#        },
#);
# Start the application
__PACKAGE__->setup();


=head1 NAME

App - Catalyst based application

=head1 SYNOPSIS

    script/app_server.pl

=head1 DESCRIPTION

[enter your description here]

=head1 SEE ALSO

L<App::Controller::Root>, L<Catalyst>

=head1 AUTHOR

Harshal Shah

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
