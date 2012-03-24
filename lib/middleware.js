module.exports = {
	processMiddleware: function(proxy, data){
		proxy.middleware.functions = proxy.middleware.functions.filter(function(item){
			var result = item(proxy,data);
			if(result === 'DONE'){
				return false;
			}
			if(result === 'CONTINUE'){
				return true;
			}
			if(result === 'KILL'){
				proxy.end();
			}
		});
	},
	
	protocol: function(proxy, data){
		proxy.middleware.protocol = 'UNKNOWN';
		//Just do a simple implementation by port number for now. TODO: Make this smarter in the future
		if(proxy.middleware.external_machine.port === 80){
				proxy.middleware.protocol = 'HTTP';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 443){
				proxy.middleware.protocol = 'HTTPS';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 22){
				proxy.middleware.protocol = 'SSH';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 531){
				proxy.middleware.protocol = 'AOL-IM';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 5050){
				proxy.middleware.protocol = 'YAHOO-IM';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 5222){
				proxy.middleware.protocol = 'GOOGLE-IM';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 1863){
				proxy.middleware.protocol = 'MSN-IM';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 143){
				proxy.middleware.protocol = 'IMAP';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 220){
				proxy.middleware.protocol = 'IMAP';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 194){
				proxy.middleware.protocol = 'IRC';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 21){
				proxy.middleware.protocol = 'FTP';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 23){
				proxy.middleware.protocol = 'TELNET';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 88){
				proxy.middleware.protocol = 'KERBEROS';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 109){
				proxy.middleware.protocol = 'POP2';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 110){
				proxy.middleware.protocol = 'POP3';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 115){
				proxy.middleware.protocol = 'SFTP';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 118){
				proxy.middleware.protocol = 'SQL';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 119){
				proxy.middleware.protocol = 'NNTP';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 170){
				proxy.middleware.protocol = 'POSTSCRIPT';
				return 'DONE';
		}
		if(proxy.middleware.external_machine.port === 631){
				proxy.middleware.protocol = 'CUPS';
				return 'DONE';
		}
		return 'DONE';
	}
	
}
