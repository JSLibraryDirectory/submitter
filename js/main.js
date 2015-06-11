$(function () {

  'use strict';

  var $body = $(document.body),
      $form = $('#form'),
      $name = $form.find('#inputName');

  $form.submitter({
    dataType: 'json',
    start: function (e) {
      if (!$name.val()) {
        e.preventDefault(); // Prevent submit
        $name.focus();

        // Tooltip: https://github.com/fengyuanchen/tooltip
        $body.tooltip('show', 'Please enter a name', {
          style: 'warning'
        });
      }
    },
    done: function (e, data) {
      if ($.isPlainObject(data) && data.success) {
        $body.tooltip('show', data.result, {
          style: 'success'
        });
      }
    },
    fail: function (e, textStatus) {
      $body.tooltip('show', textStatus, {
        style: 'danger'
      });
    }
  });
});
