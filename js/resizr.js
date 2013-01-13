define(['order!jquery', 'order!jqueryui'], function($){

    var resizr =  {
        drop: document.getElementById('drop'),
        stretch: document.getElementById('stretch'),
        canvas : document.querySelector('canvas'),
        imgSrc : undefined,
        widthInput: document.getElementById('width'),
        heightInput: document.getElementById('height'),

        handleDnD: function(e) {
          e.stopPropagation();
          e.preventDefault();
          resizr.drop.classList.remove('hover');

          var file = e.dataTransfer.files[0];

          // Only process image files.
          if (file.type.match('image.*')) {
            var reader = new FileReader();

            reader.onload = (function(r) {
              return function(e) {
                var ctx = r.canvas.getContext('2d'),
                    img = new Image();

                img.addEventListener('load', function() {
                  r.widthInput.value = r.canvas.width = this.width;
                  r.heightInput.value = r.canvas.height = this.height;
                  r.stretch.style.width =  this.width + 'px';
                  r.stretch.style.height = this.height + 'px';
                  ctx.drawImage(this, 0, 0, this.width, this.height);


                  var p1 = resizr.drop.querySelector('p'),
                      p2 = resizr.drop.querySelectorAll('p')[1];

                  p1.textContent= 'Now Resize your Image with the cursor. ' +
                                  'Grab the right or bottom border and drag to the desired width or height.';

                  p2.textContent = "When you're done click the 'Save' button to save your changes";
                });

                img.src = resizr.imgSrc = e.target.result;
              };
            })(resizr);

            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
          }
        },

        scaleCanvas: function() {

            var ctx = resizr.canvas.getContext('2d'),
                img = new Image(),
                newCanvas = document.createElement('canvas'),
                newCtx = newCanvas.getContext('2d'),
                width  = parseInt(resizr.widthInput.value, 10),
                height = parseInt(resizr.heightInput.value, 10);

            resizr.canvas.width  = width;
            resizr.canvas.height = height;

            resizr.canvas.style.width = width + 'px';
            resizr.canvas.style.height = height + 'px';

            img.addEventListener('load', function() {

                newCanvas.width = resizr.width = img.width;
                newCanvas.height = resizr.width = img.height;
                newCtx.drawImage(img, 0, 0);

                ctx.drawImage(newCanvas, 0,0, width, height);
            }, false);

            img.src = resizr.imgSrc;

        },

        // Save Image handler
        saveImage: function() {

            var canvas = document.createElement('canvas'),
                ctx    = canvas.getContext('2d'),
                img    = new Image();

            img.addEventListener('load', function() {
                canvas.width = resizr.widthInput.value;
                canvas.height = resizr.heightInput.value;
                ctx.drawImage(this, 0, 0, resizr.widthInput.value, resizr.heightInput.value);
                window.location.href = canvas.toDataURL();
            }, false);
            img.src = resizr.imgSrc;
        },

        handleDragOver: function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy';
        },

        handleDragEnterLeave: function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            resizr.drop.classList.toggle('hover');
        },

        init: function() {

            $(resizr.stretch).resizable({ resize: function() {
                resizr.widthInput.value = $(this).width();
                resizr.heightInput.value = $(this).height();
            }});

            // Setup input listeners.
            resizr.widthInput.addEventListener('input', resizr.scaleCanvas, false);
            resizr.heightInput.addEventListener('input', resizr.scaleCanvas, false);
            document.getElementById('saveImg').addEventListener('click', resizr.saveImage, false);

            // Setup the dnd listeners.
            resizr.drop.addEventListener('dragover', resizr.handleDragOver, false);
            resizr.drop.addEventListener('dragleave', resizr.handleDragEnterLeave, false);
            resizr.drop.addEventListener('dragenter', resizr.handleDragEnterLeave, false);
            resizr.drop.addEventListener('drop', resizr.handleDnD, false);
        }
    };

    return {
        init: resizr.init
    };


});

