package App::Controller::Admin;

use strict;
use warnings;
use parent 'Catalyst::Controller';
use DBIx::Class::Storage::DBI;
use File::Temp qw/tmpfile/;
use Email::MIME;
use Data::Printer qw/p/;

=head1 NAME

App::Controller::Admin - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index

=cut
sub backup : Local{
    
    my($self, $c) = @_;

	my $dir = $c->path_to("root", "static", "backup");

	$dir = $c->path_to("root", "static") unless -d $dir;

	my $filename = "backup " . localtime ;
	
	$filename =~ s/\s/_/g;
	$filename =~ s/:/_/g;

    my $schema = $c->model("DemoDB")->schema;

	$c->log->debug("$dir/$filename");

	my $out_file = $schema->export_to_csv($dir,$filename);

	$c->log->debug($out_file);

    $c->response->header('Content-Type' => 'application/x-zip');
   $c->response->header('Content-Disposition' => "attachment; filename=backup.zip");
    $c->serve_static_file($out_file);
	
}

sub import : Local{
    
    my($self, $c) = @_;

	my $message ;
	my $schema = $c->model("DemoDB")->schema;
	if ($c->req->method eq 'POST') {
		
		## file submission
		my $import= $c->req->upload('import');
		my $result_source = $c->req->param('type');
    	my $filename = $import->filename;
		my $extension = "csv";
		my $append = $c->req->param('append');


		unless ($filename =~ m/$extension$/i) {
			
			$message = 'Selected file is not a CSV file';

		}else {
			
			my $temppath =  $import->tempname;

			$c->log->debug( $temppath );
			
			my $count;
			eval {

				$count = $schema->import_from_csv($result_source, $temppath, $append);
			};

			if ($@) {
				$c->error( "Error is $@ " );
			} else {

				$message .= "Imported $count rows in $result_source \n";
			}
			$c->log->debug(" from $result_source and $temppath");

		}
	}
	
	$c->stash->{'sources'} = [ $schema->sources ];
	$c->stash->{'message'} = $message;
	$c->stash->{'template'} = 'admin_form.tt';
	$c->stash->{'type'} = 'import';

}

sub restore : Local{
    
    my($self, $c) = @_;

	my $message ;
	if ($c->req->method eq 'POST') {
		
		## file submission
		my $backup = $c->req->upload('backup');
		
    	my $filename = $backup->filename;
		my $extension = $c->req->param('type');


		unless ($filename =~ m/$extension$/) {
			
			$message = 'Selected file does not match the upload type selected';

		}else {
			
			my $temppath =  $backup->tempname;

			my($tempdir, $tempfile) = $backup->tempname =~ m/(.*\/)(.*)$/;
			
			`unzip -o $temppath -d $tempdir`;
			
			opendir my($dh), $tempdir or die "Couldn't open dir '$tempdir': $!";

			my @files = readdir $dh;
			
			my $schema = $c->model("DemoDB")->schema;

			foreach my $file (@files) {
				
				my $path = "$tempdir$file";

				next unless -f $path;
				
				my ($result_source , $extension) = $file =~ m/(.*)\.(.*)/;
				
				next unless $result_source;

				$c->log->debug(" from $result_source and $file $path");

				my $count = $schema->import_from_csv($result_source, $path);

				$message .= "Imported $count rows in $result_source \n";

				my $rs = $c->model("DemoDB::$result_source");

				$rs->clear_cache if $rs->can('clear_cache');
			}

			closedir $dh;
		}
	}

	## clear cache
		
	
	
	#$rs->for->clear_cache;
	
#	$rs->all_products->cursor->clear_cache;
#	$rs->groups->cursor->clear_cache;
	
#	$rs->all_metrics->cursor->clear_cache;


	$c->stash->{'message'} = $message;
	$c->stash->{'template'} = 'admin_form.tt';
	$c->stash->{'type'} = 'restore';

}
sub email: Path('/email') {

	my ($self, $c) = @_;

	my $to = $c->req->param('to');
	my $body = $c->req->param('body');
	my $subject = $c->req->param('subject');
	
	$c->stash->{'type'} = 'email';
	$c->stash->{'template'} = 'admin_form.tt';

	my $upload = $c->req->upload('attachment');

	unless ($c->req->method eq 'POST') {
		
		$c->stash->{message} = "";
		$c->detach("App::View::HTML");
	}

	my $parts;

	push @$parts, Email::MIME->create(
                attributes => {
                    content_type => 'application/octet-stream',
                    disposition  => 'attachment',
                    filename => $upload->filename,
                },
            	body => $upload->slurp
            ) if $upload;

  	$c->stash->{email} = {
		header => [
            To      => $to,
            From    => 'support@einvoices.biz',
            Subject => $subject
        ],
        body => $body,
        parts => $parts,
	};
	
    $c->forward( "App::View::Gmail" );

	$c->stash->{message} = "Email Sent to $to successfully";
    $c->forward( "App::View::HTML" );
}
sub email_error : Local {

	my ($self, $c) = @_;


  	$c->stash->{email} = {
            to      => 'harshal.shah@gmail.com',
            from    => 'error@einvoices.biz',
            subject => 'Error in Einvoices ',
 			template    => 'error.tt',
            content_type => 'multipart/alternative'
            
        };
 	
    $c->forward( "App::View::Gmail" );

}

sub help : Path('/help') {

    my($self, $c, $section) = @_;

    $c->stash->{section} = $section;
    $c->stash->{template} = 'help.tt'
}


sub reset : Local {
    my($self, $c, $confirm) = @_;
    if ($confirm) {
    my $schema = $c->model("Bill")->result_source->schema;
    my $storage = $schema->storage;
    $schema->storage->debug(1);
    $c-> model("Bill")->delete_all;
    $c-> model("Transaction")->delete_all;
    my @stuff = $schema->storage->dbh_do(
        sub {
            my ($storage, $dbh, @args) = @_;
            $dbh->do("update sqlite_sequence set seq = 0 where name = 'purchase'");
            $dbh->do("update sqlite_sequence set seq = 0 where name = 'sale'");
            }
        );
    $c->stash->{template} = 'welcome.tt';
    }else{
    $c->stash->{template} = 'reset.tt';
    }
    
}
 
sub update_purchase : Local {

    my($self, $c ) = @_;

	my $purchase_rs = $c->model("DemoDB::Bill")->look_for;

	while(my $invoice = $purchase_rs->next) {
		
		$invoice->m_quantity($invoice->quantity);
		$invoice->update();
	}
}

sub forgot_password : Path('/forgot_password') {

    my ( $self, $c ) = @_;
	
	$c->stash->{template} = 'welcome.tt';
}

sub register: Path('/register') {

    my ( $self, $c ) = @_;

	$c->stash->{template} = "register.tt";
	if ($c->req->method eq 'POST') {
		
		my $to = $c->req->param("email");

	#	$c->forward('captcha_check') if $c->config->{recaptcha}->{default};

 	 	$c->stash->{email} = {
            to      => 'harshal.shah@gmail.com',
            from    => 'error@einvoices.biz',
            subject => 'Registration successful',
            content_type => 'text/plain',
            body =>  p($c->req->params)           
        };

    	$c->forward( "App::View::Gmail" );

		$c->stash->{message} = "Email Sent to $to successfully";
        
    	$c->stash->{registered} = 1;
    }
}

sub audit_trail : Local {
	
	my ($self, $c) = @_;

	my $id = $c->req->param('id');
	my $class = $c->req->param("class");

	if ($c->req->method eq 'POST' && $id && $class) {

		$c->stash->{logs} = [ split /,/,  $c->model("DemoDB::$class")->fetch($id)->serialize->{'log'} ];
	}

	my $schema = $c->model("DemoDB")->schema;
	$c->stash->{sources} = [ $schema->sources ];
	$c->stash->{id} = $c->req->param('id');
	$c->stash->{template} = 'admin_form.tt';
	$c->stash->{type} = 'log';
}

=head1 AUTHOR

Harshal Shah,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
