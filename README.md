# [Form Submitter](https://github.com/fengyuanchen/submitter)

> A simple jQuery form submitting plugin.

- [Demo](http://fengyuanchen.github.io/submitter)


## Main

```
dist/
├── submitter.js      (7 KB)
└── submitter.min.js  (3 KB)
```



## Getting started

### Quick start

Three quick start options are available:

- [Download the latest release](https://github.com/fengyuanchen/submitter/archive/master.zip).
- Clone the repository: `git clone https://github.com/fengyuanchen/submitter.git`.
- Install with [NPM](http://npmjs.org): `npm install @fengyuanchen/submitter`.


### Installation

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/submitter.js"></script>
```


### Usage

Initialize with `$.fn.submitter` method.

```js
$('form').submitter({
  done: function (e, data) {
    console.log(e.type); // 'done'
    console.log(e.namespace); // 'submitter'
    console.log(data); // Response data
  }
});
```


## Options

```js
// Set submitter options
$().submitter(options);

// Change the global default options
$.fn.submitter.setDefaults(options);
```

**Note:** [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)'s options are available too.


### url

- Type: `String`
- Default: The form's "action" property

A string containing the URL to which the request is sent.


### method

- Type: `String`
- Default: The form's "method" property

The HTTP method to use for the request (e.g. "POST", "GET", "PUT").


### start(event)

- Type: `Function`
- Default: `null`

A shortcut of the "start.submitter" event.


### done(event, data, textStatus)

- Type: `Function`
- Default: `null`

A shortcut of the "start.submitter" event.


### fail(event, textStatus, errorThrown)

- Type: `Function`
- Default: `null`

A shortcut of the "start.submitter" event.


### end(event, textStatus)

- Type: `Function`
- Default: `null`

A shortcut of the "start.submitter" event.



## Methods


### destroy()

Destroy the submitter.

```js
$().submitter('destroy');
```



## Events


### start.submitter

This event fires when the form is starting to submit.


### done.submitter

This event is fired when the submit request succeeds.


### fail.submitter

This event is fired when the submit request fails.


### end.submitter

This event is fired when the submit request finishes (after `done` and `fail` events are fired).



## No conflict

If you have to use other plugin with the same namespace, just call the `$.fn.submitter.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="submitter.js"></script>
<script>
  $.fn.submitter.noConflict();
  // Code that uses other plugin's "$().submitter" can follow here.
</script>
```



## Browser Support

- Chrome (latest 2)
- Firefox (latest 2)
- Internet Explorer 8+
- Opera (latest 2)
- Safari (latest 2)

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).



## [License](LICENSE.md)

Released under the [MIT](http://opensource.org/licenses/mit-license.html) license.
