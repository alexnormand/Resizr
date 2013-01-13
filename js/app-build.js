({
    baseUrl: "./",
    out: "../build/js/main.js",
    paths : {
        order: 'lib/requirejs/order',
        jquery: 'lib/jquery-1.8.3.min',
        jqueryui: 'lib/jquery-ui-1.8.20.custom.min',
        resizr: 'resizr'
    },

    optimize: "uglify",
    name: "lib/requirejs/almond",
    include: "main",
    //name: "main",
    wrap:true
})
