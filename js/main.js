(function(window, undefined){

    var resizr =  {

	drop: document.getElementById('drop'),
	canvas : document.querySelector('canvas'),
	widthInput: document.getElementById('width'),
	heightInput: document.getElementById('height'),


	handleDnD: function(e) {
	    e.stopPropagation();
	    e.preventDefault();

	    var files = e.dataTransfer.files;

	    // files is a FileList of File objects. List some properties.
	    for (var i = 0, f; f = files[i]; i++) {
		// Only process image files.
		if (!f.type.match('image.*')) {
		    continue;
		}

		var reader = new FileReader();

		reader.onload = (function(r) {
		    return function(e) {
			var ctx = r.canvas.getContext('2d'),
			    img = new Image();

			img.onload = function() {
			    r.widthInput.value = r.canvas.height = img.height;
			    r.heightInput.value = r.canvas.width  = img.width;
			    ctx.drawImage(img, 0, 0, img.width, img.height);
			};
			img.src = e.target.result;
		    };
		})(resizr);

		// Read in the image file as a data URL.
		reader.readAsDataURL(f);
	    }
	},


	scaleCanvas: function() {

	    var ctx = resizr.canvas.getContext('2d');

	        console.log(parseInt(resizr.widthInput.value, 10), parseInt(resizr.heightInput.value, 10));

//                ctx.drawImage(resizr.canvas.toDataURL('img/png'), 0, 0 , parseInt(resizr.widthInput.value, 10), parseInt(resizr.heightInput.value, 10));

/*
		oSaveCanvas.width = iWidth;
		oSaveCanvas.height = iHeight;
		oSaveCanvas.style.width = iWidth+"px";
		oSaveCanvas.style.height = iHeight+"px";

		var oSaveCtx = oSaveCanvas.getContext("2d");

		oSaveCtx.drawImage(oCanvas, 0, 0, oCanvas.width, oCanvas.height, 0, 0, iWidth, iHeight);
		return oSaveCanvas;

	    return oCanvas;*/
	},

	//TODO
	 saveImage: function() {
	     window.location.href=document.getElementById('preview').src.replace('image/gif', 'img/octet-stream');
	 },

	handleDragOver: function(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	},

	init: function() {

	    // Setup input listeners.
	    this.widthInput.addEventListener('input', this.scaleCanvas, false);
	    this.heightInput.addEventListener('input', this.scaleCanvas, false);

	    // Setup the dnd listeners.
	    this.drop.addEventListener('dragover', this.handleDragOver, false);
	    this.drop.addEventListener('drop', this.handleDnD, false);
	}
    };

    resizr.init();

})(window);

