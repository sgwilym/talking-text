# Talking Text

talking-text is a jQuery plugin that recreates the typing-it-out-by-itself effect used in many an old RPG game. It pauses on punctuation, slows down on specified tags so you can E-M-P-H-A-S-I-S-E things, and works on elements with any number of descendants. It was made for [this webcomic](http://gwil.co/peaches/tales/2.html)

# Usage

First up, you'll need to have some an element with some text in it to run the plugin on. Here's an example:

```html
<p class="wizard">Fool! One must <span class="angry-red-text">never</a> even think of the <em>Forest of Impenetrable Sadness</em>!</p>  
```

So we've got a `<p>` tag, a `<span>` for styling some text, and an `<em>` tag for putting some hard hitting emphasis on a silly place. These aren't necessary to make it work, rather they're here to show you that the plugin can handle styling and different DOM structures.

Link the plugin, and you're ready to go:

```html
$(document).ready(function() {
	$('.talking-text').talkingText();
});
```

This will make the effect fire as soon as the page loads, but of course you can link it up with click or scroll events.

Keep in mind that until `talkingText` is fired, the element will appear as it normally would. You may also want to account for the fact that this plugin will change the size of the element as it takes all of the content out of the element and then types out directly into the text nodes.

Anyway. There are also two options: `slowTag` and `pace`. 

```html
$(document).ready(function() {
	$('.talking-text').talkingText({slowTag: 'B', pace: 100});
});
```

`slowTag` sets which tag causes text to type out s-l-o-w-l-y (which is EM by default). `pace` is the number of milliseconds the plugin waits before typing out each character, and its default is 30.
