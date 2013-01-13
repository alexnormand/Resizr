require.config({
  paths : {
    order: 'lib/requirejs/order',
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
    jqueryui: 'lib/jquery-ui-1.8.20.custom.min',
    resizr: 'resizr'
  }
});

require(['resizr'], function (Resizr) {
  Resizr.init();
});
