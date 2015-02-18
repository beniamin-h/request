var request = require('request'),
	counter = 0;

function send(src_url, dest_url) {
	var src_req = request(src_url),
		buf_size = 0;
	counter++;
	src_req.on('error', (function (_counter, _src_url) { 
		return function () { console.log('[%s] Downloading %s ERR:', _counter, _src_url, arguments); };
	})(counter, src_url));
	src_req.on('end', (function (_counter, _src_url) { 
		return function() { console.log('[%s] Downloading %s END', _counter, _src_url); }; 
	})(counter, src_url));
	src_req.on('response', (function (_counter, _src_url) { 
		return function() { console.log('[%s] Downloading response %s', _counter, _src_url); };
	})(counter, src_url));
	src_req.on('request', (function (_counter, _src_url) { 
		return function() { console.log('[%s] Downloading request %s', _counter,_src_url); };
	})(counter, src_url));
	src_req.on('complete', (function (_counter, _src_url) { 
		return function() { console.log('[%s] Downloading complete %s', _counter, _src_url); };
	})(counter, src_url));
	src_req.on('data', function (buf) { /* buf_size += buf.length; console.log('DATA', buf_size); */ });

	var dest_req = request.put({uri: dest_url});
	dest_req.on('error', function(){ console.error('Uploading ERR:', arguments); });
	dest_req.on('end', function() { console.log('Uploading %s END', src_url); });
	dest_req.on('response', function() { console.log('U response %s END', src_url); });
	dest_req.on('request', function() { console.log('U request %s END', src_url); });
	dest_req.on('complete', function() { console.log('U complete %s END', src_url); });
	dest_req.on('data', function (buf) { /* buf_size += buf.length; console.log('U DATA', buf_size); */ });
	src_req.pipe(dest_req);
}

send('http://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg', 'http://localhost:9615/');
send('http://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big2.jpg', 'http://localhost:9615/');
send('http://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg', 'http://localhost:9615/');
