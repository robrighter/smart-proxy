var builtInMiddleware = {
	protocol: protocolFinder
}

function middlewareWorker(port, middlewarelist, pathToFileWithCustomMiddleware){
	var wireproto = new(require('json-line-protocol').JsonLineProtocol)();
	var installedMiddleware = makeMiddlewareFunctionList();
	var storage = {};
	wireproto.on('value', function (value) {
		if(!storage.hasOwnProperty(value.connectionId)){
			storage[value.connectionId] = {};
			storage[value.connectionId].middlewareFuncs = loadMiddlewareQueue(installed); 
		}
		
		var reducedResponse = {
			connectionId: value.connectionId,
			result: processMiddleware(storage[value.connectionId], value)
		};
		if(reducedResponse.result === 'SEND'){
			reducedResponse.data === storage[value.connectionId].data;
		}
		process.stdout.write(reducedResponse);
	});
	
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function (chunk) {
		wireproto.feed(chunk);
	});
	
	function makeMiddlewareFunctionList(){
		var customMiddleware = require(pathToFileWithCustomMiddleware);
		var toreturn = [];
		middlewarelist.forEach(function(item){
			if(customMiddleware.hasOwnProperty(item)){
				toreturn.push(customMiddleware[item]);
			}
			else if(builtInMiddleware.hasOwnProperty(item)){
				toreturn.push(builtInMiddleware[item]);
			}
		});
		return toreturn;
	}
	
	function loadMiddlewareQueue(installed){
		return installed.map(function(item){return item});
	}
}

//TODO::NEEDS UNIT TEST
function protocolFinder(store, data){
	store.protocol = 'UNKNOWN';
	//Just do a simple implementation by port number for now. TODO: Make this smarter in the future
	if(store.external_machine.port === 80){
			store.protocol = 'HTTP';
			return 'DONE';
	}
	if(store.external_machine.port === 443){
			store.protocol = 'HTTPS';
			return 'DONE';
	}
	if(store.external_machine.port === 22){
			store.protocol = 'SSH';
			return 'DONE';
	}
	if(store.external_machine.port === 531){
			store.protocol = 'AOL-IM';
			return 'DONE';
	}
	if(store.external_machine.port === 5050){
			store.protocol = 'YAHOO-IM';
			return 'DONE';
	}
	if(store.external_machine.port === 5222){
			store.protocol = 'GOOGLE-IM';
			return 'DONE';
	}
	if(store.external_machine.port === 1863){
			store.protocol = 'MSN-IM';
			return 'DONE';
	}
	if(store.external_machine.port === 143){
			store.protocol = 'IMAP';
			return 'DONE';
	}
	if(store.external_machine.port === 220){
			store.protocol = 'IMAP';
			return 'DONE';
	}
	if(store.external_machine.port === 194){
			store.protocol = 'IRC';
			return 'DONE';
	}
	if(store.external_machine.port === 21){
			store.protocol = 'FTP';
			return 'DONE';
	}
	if(store.external_machine.port === 23){
			store.protocol = 'TELNET';
			return 'DONE';
	}
	if(store.external_machine.port === 88){
			store.protocol = 'KERBEROS';
			return 'DONE';
	}
	if(store.external_machine.port === 109){
			store.protocol = 'POP2';
			return 'DONE';
	}
	if(store.external_machine.port === 110){
			store.protocol = 'POP3';
			return 'DONE';
	}
	if(store.external_machine.port === 115){
			store.protocol = 'SFTP';
			return 'DONE';
	}
	if(store.external_machine.port === 118){
			store.protocol = 'SQL';
			return 'DONE';
	}
	if(store.external_machine.port === 119){
			store.protocol = 'NNTP';
			return 'DONE';
	}
	if(store.external_machine.port === 170){
			store.protocol = 'POSTSCRIPT';
			return 'DONE';
	}
	if(store.external_machine.port === 631){
			store.protocol = 'CUPS';
			return 'DONE';
	}
	return 'DONE';
}

//TODO::NEEDS UNIT TEST
function processMiddleware(store, data){
	var reducedReturn = 'DONE';
	store.middlewareFuncts = store.middlewareFuncts.filter(function(item){
		var result = item(store,data);
		if(result === 'DONE'){
			return false;
		}
		if(result === 'CONTINUE'){
			if(reducedReturn === 'DONE'){
					reducedReturn = 'CONTINUE';
			}
			return true;
		}
		if(result === 'KILL'){
			reducedReturn = 'KILL';
			return false;
		}
		if(result === 'HOLD'){
			if(reducedReturn !== 'KILL'){
					reducedReturn = 'HOLD';
			}
			return true;
		}
		if(result === 'SEND'){
			reducedReturn = 'SEND';
			return false;
		}
	});
	return reducedReturn;
}


module.exports = {
	processMiddleware: processMiddleware,
	middlewareWorker: middlewareWorker	
}

// //each inncoming json object should have a session id it should be something like
// var incomingDemo = {
// 	connectionId: "9283092",
// 	host: "robrighter.com",
// 	port: "80",
// 	data: "~~~", //incomming data from the connection that needs to be use to update the middleware result
// 	//OR
// 	action: "DONE"
// }
// 	
// //with each incoming json object, the worker should match it by sending back a response, the response should be:
// var outgoingDemo = {
// 	connectionId: "9283092",
// 	result: 'DONE', //dont send any more middleware requests for this connectionid
// 	//result : 'CONTINUE' //continue sending middleware requests for this connectionid
// 	//result : 'KILL' //kill the connection without sanding back anymore data to the client
// 	//result : 'HOLD' //Hold sending any data to the client
// 	//result : 'SEND' //Override the data and Send attached data instead to the client (mainly used in conjunction with a HOLD)
// 	data: "~~~~~"
// }

