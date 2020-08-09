var fgimage = null;
var bgimage = null;
var fgcanvas;
var bgcanvas;

function loadforegroundimage() {
  var file = document.getElementById("fgfile");
  fgimage = new SimpleImage(file);
  fgcanvas = document.getElementById("fgcan");
  fgimage.drawTo(fgcanvas);
}

function loadbackgroundimage() {
  var file = document.getElementById("bgfile");
  bgimage = new SimpleImage(file);
  bgcanvas = document.getElementById("bgcan");
  bgimage.drawTo(bgcanvas);
}

function gogreen() {
  // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
  var output = new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
  var greenThreshold = 230;
  for (var pixel of fgimage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold) {
      //pixel is green, use background
      var bgPixel = bgimage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else {
      //pixel is not green, use foreground
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function docomposite() {
  //check that images are loaded
  if (fgimage == null  || ! fgimage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgimage == null || ! bgimage.complete()) {
    alert("Background image not loaded");
  }
  // clear canvases
  clearcanvas();
  // call createComposite, which does green screen algorithm and returns a composite image
  var finalImage = gogreen();
  finalImage.drawTo(fgcanvas);
}

function clearcanvas() {
  doClear(fgcanvas);
  doClear(bgcanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}