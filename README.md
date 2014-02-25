# Form Submitter
A jQuery plugin for submit form with no refresh.

## Getting started

### Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/submitter.js"></script>
```

### Usage

Demo form:

```html
<form id="form" action="handle.html" method="post" enctype="multipart/form-data">
	<input name="text" type="text">
	<input name="file" type="file">
	<button type="submit">Submit</button>
</form>
```

Initialize with `$.fn.submitter` method

```javascript
$("#form").submitter({
	resetAfterDone: true, // reset the form after submit success
	messages: {
		start: "Submit start.",
		done: "Submit done.",
		fail: "Submit fail.",
		end: "Submit end."
	},
	ajaxOptions: { // options for $.ajax()
		cache: false,
		dataType: "json"
		// ...
	},

	isValidated: function() {
		// validate the form before submit
		// return "true" to submit and "false" to cancel
		return true;
	},

	start: function() {
		console.log(this.messages.start);
	},

	done: function(data) {
		// data: the handle result from server client
		console.log(this.messages.done);
	},

	fail: function() {
		console.log(this.messages.fail);
	},

	end: function() {
		console.log(this.messages.end);
	}
});
```