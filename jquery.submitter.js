/*!
 * jQuery Submitter Plugin v0.1.0
 * https://github.com/fengyuanchen/submitter
 *
 * Copyright 2014 Fenngyuan Chen
 * Released under the MIT license
 */

(function(fn, undefined) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as anonymous module.
		define(["jquery"], fn);
	} else {
		// Browser globals.
		fn(window.jQuery);
	}
}(function($) {

	"use strict";

	function Submitter(form, options) {
		this.$form = $(form);
		this.init(options);
	}

	Submitter.defaults = {
		resetAfterDone: false,
		messages: {
			start: "Submit start.",
			done: "Submit done.",
			fail: "Submit fail.",
			end: "Submit end."
		},
		ajaxOptions: {
			cache: false,
			dataType: "json"
		},

		isValidated: function() {
			return true;
		},

		start: function() {
			console.log(this.messages.start);
		},

		done: function(data) {
			console.log(this.messages.done);
		},

		fail: function() {
			console.log(this.messages.fail);
		},

		end: function() {
			console.log(this.messages.end);
		}
	};

	Submitter.prototype = {
		constructor: Submitter,

		support: {
			formData: !! window.FormData
		},

		textStatus: {
			start: "start",
			done: "success",
			fail: "error",
			end: "complete"
		},

		init: function(options) {
			var settings = {
					beforeSend: $.proxy(this.start, this),
					success: $.proxy(this.done, this),
					error: $.proxy(this.fail, this),
					complete: $.proxy(this.end, this)
				},
				defaults = {
					type: this.$form.attr("method") || "get",
					url: this.$form.attr("action") || ""
				},
				$submit = this.$form.find(":submit"),
				$reset = this.$form.find(":reset");

			options = $.isPlainObject(options) ? options : {};
			this.defaults = $.extend(true, {}, Submitter.defaults, options);
			this.ajaxOptions = $.extend({}, defaults, this.defaults.ajaxOptions, settings);

			if (this.$form.find(":file").length > 0) {
				this.requireUpload = true;

				if (!this.support.formData) {
					this.initIframe();
				}
			}

			if ($submit.length === 0) {
				$submit = $('<button type="submit" style="display:none;"></button>');
				this.$form.append($submit);
			}

			if ($reset.length === 0) {
				$reset = $('<button type="reset" style="display:none;">Reset</button>');
				this.$form.append($reset);
			}

			this.$submit = $submit;
			this.$reset = $reset;

			this.active();
		},

		active: function() {
			var that = this;

			this.$form.submit(function() {
				if (!that.defaults.isValidated()) {
					return false;
				}

				if (that.requireUpload && !that.support.formData) {
					that.start(null); // submit by iframe
				} else {
					that.submit(); // submit by ajax
					return false;
				}
			});
		},

		distory: function() {
			this.$form.off("submit");
			this.$iframe.off("load");
			this.$form = null;
			this.$iframe.remove();
			this.$iframe = null;
		},

		start: function(XMLHttpRequest) {
			if ($.isFunction(this.defaults.start)) {
				this.defaults.start();
			}

			if ($.isFunction(this.defaults.ajaxOptions.beforeSend)) {
				this.defaults.ajaxOptions.beforeSend(XMLHttpRequest);
			}
		},

		done: function(data, textStatus, jqXHR) {
			if ($.isFunction(this.defaults.done)) {
				this.defaults.done(data);
			}

			if ($.isFunction(this.defaults.ajaxOptions.success)) {
				this.defaults.ajaxOptions.success(data, textStatus, jqXHR);
			}

			if (this.defaults.resetAfterDone) {
				this.$reset.click();
			}
		},

		fail: function(XMLHttpRequest, textStatus, errorThrown) {
			if ($.isFunction(this.defaults.fail)) {
				this.defaults.fail();
			}

			if ($.isFunction(this.defaults.ajaxOptions.error)) {
				this.defaults.ajaxOptions.error(XMLHttpRequest, textStatus, errorThrown);
			}
		},

		end: function(XMLHttpRequest, textStatus) {
			if ($.isFunction(this.defaults.end)) {
				this.defaults.end();
			}

			if ($.isFunction(this.defaults.ajaxOptions.complete)) {
				this.defaults.ajaxOptions.complete(XMLHttpRequest, textStatus);
			}
		},

		submit: function() {
			var ajaxOptions = $.extend({}, this.ajaxOptions);

			if (this.support.formData) {
				ajaxOptions.data = new FormData(this.$form[0]);
				ajaxOptions.processData = false;
				ajaxOptions.contentType = false;
			} else {
				ajaxOptions.data = this.$form.serialize();
			}

			$.ajax(ajaxOptions);
		},

		initIframe: function() {
			var iframeName = "submitter-" + Math.random().toString().replace("0.", ""),
				$iframe = $('<iframe name="' + iframeName + '" style="display:none;"></iframe>'),
				that = this;

			$iframe.on("load", function() {
				var data,
					win,
					doc;

				try {
					win = this.contentWindow;
					doc = this.contentDocument;

					doc = doc ? doc : win.document;
					data = doc ? doc.body.innerText : null;
					data = typeof data === "string" ? $.parseJSON(data) : data;
				} catch (e) {
					// throw new Error(e.message);
					that.fail(null, "fail", e.message);
				}

				if (!data) {
					return;
				}

				if ($.isPlainObject(data)) {
					that.done(data, "done", null);
				} else {
					that.fail(null, "fail", that.defaults.messages.fail);
				}

				that.end(null, "end");
			});

			if (this.defaults.ajaxOptions.type) {
				this.$form.attr("method", this.defaults.ajaxOptions.type);
			}

			this.$form.attr("target", iframeName).after($iframe);
			this.$iframe = $iframe;
		}
	};


	// define as a jquery method
	$.fn.submitter = function(options) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data("submitter");

			if (typeof options === "string" && $.isFunction(data[options])) {
				data[options]();
				return;
			}

			$this.data("submitter", new Submitter(this, options));
		});
	};

	$.fn.submitter.Constructor = Submitter;

	// auto init
	$(function() {
		$("form[data-submitter]").submitter();
	});

}));