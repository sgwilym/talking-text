# talking-text

talking-text is a jQuery plugin that helps you recreate the typing-it-out-by-itself effect used in many of your favourite RPG games. It pauses on punctuation, slows down on specified elements so you can E-M-P-H-A-S-I-S-E things, and you can tweak lots more! It was made for [this webcomic](http://gwil.co/peaches/tales/2.html)

## Usage

talking-text works on any element with text in it. Here's an example:

```html
<p class="wizard">Fool! One must <span class="angry-red-text">never</a> even think of the <em>Forest of Impenetrable Sadness</em>!</p>  
```

Link the plugin, and you're ready to go:

```javascript
$(document).ready(function() {
	$('.wizard').talkingText();
});
```

This will make the effect fire as soon as the page loads, but you can link it up with whichever events you choose.

## Options

You can tweak the behaviour of talking-text with three options: `slowTag`, `pace`, and `callback`.

```javascript
$(document).ready(function() {
	$('.talking-text').talkingText({slowTag: 'B', pace: 100, callback: function() {
		console.log('Finished typing!');
	}});
});
```

### slowTag

`slowTag` tells talking-text which element you'd like to use for typing out emphasised, slow text. It is `em` by default.


### pace

`pace` sets the number of milliseconds taken between typing out each character. It is `30` by default.

### callback

`callback` allows you to supply a function that is fired after the text has finished typing out. This is left empty by default.

## Caveats

Keep in mind that until `talkingText` is fired, the element will appear as it normally would. A simple work around is to set elements to `display: none;` and firing something like `$('.something').show()` right before firing talking-text.

You may also want to account for the fact that this plugin will change the size of the element as it takes all of the content out of the element and then pours it back in. So be explicit with your styles!
