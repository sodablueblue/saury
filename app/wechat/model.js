var fs = require('fs');

exports.getOutline = function(){
	fs.readFile('demo/outline.json', 'utf-8', function(err, outline){
		if(err) throw err;
		else {
			evnt.emitter.emit(evnt.GET_OUTLINE, JSON.parse(outline));
		}
	});
}
