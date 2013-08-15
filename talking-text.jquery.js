( function ( $ ) {
	$.fn.talkingText = function(options) {
		
		// Talking text defaults
		var defaults = {
			slowTag: 'EM',
			pace: 30
		}
		var options = $.extend(defaults, options);
		
		return this.each(function(){
			
			var root = this;
			var savedNodes = [];
			var saved = false;
			var slow = false;
			var pace = options.pace;
			
			// Function that checks whether the node has children or not and slides down the tree from left to right.
			var nodeCheck = function(node){
				if (node.nodeType == 3) {
					if (!saved) {
						savedNodes.push(node.data);
						node.data = "";
						nodeClimb(node);
					}
					else {
						text = savedNodes.shift().split('');
						talkingText(node, text);
					}
				}
				else {
					if (node.tagName == options.slowTag && slow == false && saved == true) {
						slow = true;
					}
					nodeCheck(node.firstChild);
				}
			}
			
			// Function that climbs up the tree from left to right.
			var nodeClimb = function(node){
				if (node.tagName == options.slowTag && slow == true && saved == true) {
					slow = false;
				}
				if(node.nextSibling != null && node.nextSibling != root.nextSibling) {
					nodeCheck(node.nextSibling);
				}
				else if(node.nextSibling == null) {
					nodeClimb(node.parentNode);
				}
				else {
					saved = true;
					if (savedNodes.length != 0) { 
						nodeCheck(root.firstChild);
					}
				}
			}
			
			// Function that takes a node and types in the text bit by bit.
			var talkingText = function(node, text) {
				if (text.length > 0) {
					characterToAdd = text.shift();
					node.data += characterToAdd;
					slow ? wait = pace * 4 : wait = pace;
					switch(characterToAdd) {
						case '.':
						case ',':
						case '?':
						case '!':
						case '-':
						case '”':
							wait = pace * 6;
							break;
						default:
					}
					setTimeout(talkingText, wait, node, text);
				}
				else {
					nodeClimb(node);
				}
			}
			
			nodeCheck(root.firstChild);
			
		});
	}
})( jQuery );