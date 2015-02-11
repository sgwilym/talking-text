/*!
* talking-text 1.0
* RPG like text effect
* http://gwil.co
* MIT License
* by Sam Gwilym
*/

(function($) {
  $.fn.talkingText = function(options) {

    // Talking text defaults
    var defaults = {
      slowTag: 'EM',
      pace: 30,
			voice: null,
      callback: null
    }
    var options = $.extend(defaults, options);

    return this.each(function() {

      var root = this;
      var savedNodes = [];
      var saved = false;
      var slow = false;
      var pace = options.pace;

      // Function that checks whether the node has children or not and slides down the tree from left to right.
      var nodeCheck = function(node) {
        if (node.nodeType == 3) {
          if (!saved) {
            savedNodes.push(node.data);
            node.data = "";
            nodeClimb(node);
          } else {
            text = savedNodes.shift().split('');
            talkingText(node, text);
          }
        } else {
          if (node.tagName == options.slowTag && slow == false && saved == true) {
            slow = true;
          }
          if (node.firstChild) {
            nodeCheck(node.firstChild);
          } else {
            setTimeout(nodeClimb, pace * 6, node);
          }
        }
      }

      // Function that climbs up the tree from left to right.
      var nodeClimb = function(node) {
        if (node.tagName == options.slowTag && slow == true && saved == true) {
          slow = false;
        }
        if (node.nextSibling != null && node.nextSibling != root.nextSibling) {
          nodeCheck(node.nextSibling);
        } else if (node.nextSibling == null) {
          nodeClimb(node.parentNode);
        } else {
          saved = true;
          if (savedNodes.length != 0) {
            nodeCheck(root.firstChild);
          } else {
            if (typeof options.callback == 'function') {
              options.callback.call(this);
            }
          }
        }
      }

      // Function that takes a node and types in the text bit by bit.
      var talkingText = function(node, text) {

        if (text.length > 0) {
          characterToAdd = text.shift();
          node.data += characterToAdd;
          slow ? wait = pace * 4 : wait = pace;
          switch (characterToAdd) {
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
          if (options.voice) {
            playOscillator(oscillatorForChar(characterToAdd, options.voice.accent, options.voice.pitch), wait * 0.5);
          }
          setTimeout(talkingText, wait, node, text);
        } else {
          nodeClimb(node);
        }
      }

      var oscillatorForChar = function(char, accent, pitch) {
        oscillator = audioContext.createOscillator();
        oscillator.type = 1;
        if (char.charCodeAt(0) != 32) {
          oscillator.frequency.value = (char.charCodeAt(0) / accent) + pitch;
        } else {
          oscillator.frequency.value = 0;
        }
        return oscillator
      }

      var playOscillator = function(oscillator, lifetime) {
        oscillator.connect(gainNode);
        oscillator.start(0);
        setTimeout(function() {
          oscillator.disconnect()
        }, lifetime);
      }

      if (options.voice) {
        var audioContext = new webkitAudioContext();
        var gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = 0.01;
      }

      nodeCheck(root.firstChild);

    });
  }
})(jQuery);
