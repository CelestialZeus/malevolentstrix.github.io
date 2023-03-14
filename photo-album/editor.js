var image = document.querySelector('img'); 
var originalImgSrc = '../assets/pexels-rachel-claire-4992807.jpg'; 
document.getElementById('tint').addEventListener('click', tintfunc);
document.getElementById('red').addEventListener('click', markRed);
document.getElementById('green').addEventListener('click', markGreen);
document.getElementById('blue').addEventListener('click', markBlue);
document.getElementById('reset-tint').addEventListener('click', markReset);
document.getElementById('tint-color').addEventListener('change', tintImage);

let brightnessSlider = document.getElementById('brightness-slider');
let contrastSlider = document.getElementById('contrast-slider');
let saturationSlider = document.getElementById('saturation-slider');
let grayscaleSlider = document.getElementById('grayscale-slider');
let hueSlider = document.getElementById('hue-slider');
let invertSlider = document.getElementById('invert-slider');
let sepiaSlider = document.getElementById('sepia-slider');
let blurSlider = document.getElementById('blur-slider');



let brightnessValue = document.getElementById('brightness-value');
let contrastValue = document.getElementById('contrast-value');
let saturationValue = document.getElementById('saturation-value');
let hueValue = document.getElementById('hue-value');
let sepiaValue = document.getElementById('sepia-value');
let grayscaleValue = document.getElementById('grayscale-value');
let invertValue = document.getElementById('invert-value');
let blurValue = document.getElementById('blur-value');


brightnessSlider.addEventListener('input', function() {
  brightnessValue.innerHTML = this.value;
});

contrastSlider.addEventListener('input', function() {
  contrastValue.innerHTML = this.value;
});

saturationSlider.addEventListener('input', function() {
  saturationValue.innerHTML = this.value;
});

hueSlider.addEventListener('input', function() {
  hueValue.innerHTML = this.value;
});

sepiaSlider.addEventListener('input', function() {
  sepiaValue.innerHTML = this.value;
});

grayscaleSlider.addEventListener('input', function() {
  grayscaleValue.innerHTML = this.value;
});

invertSlider.addEventListener('input', function() {
  invertValue.innerHTML = this.value;
});

blurSlider.addEventListener('input', function() {
  blurValue.innerHTML = this.value;
});

let canvas = document.getElementById('canvas');
canvas.classList.add('img-fluid');
let ctx = canvas.getContext('2d');
let img = new Image();
img.onload = function() {
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  
  let editedImg = document.getElementById('edited-image');
  editedImg.width = img.naturalWidth;
  editedImg.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  tintfunc();
}
img.src = image.src;
function tintfunc(){

  
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  
  var red = 0;
  var green = 0;
  var blue = 0;
  var totalPixels = canvas.width * canvas.height;



  for (var i = 0; i < data.length; i += 4) {
    if(data[i]>data[i+1]&&data[i]>data[i+2])
      red += 1;
    else if(data[i+1]>data[i]&&data[i+1]>data[i+2])
      green += 1;
    else if(data[i+2]>data[i]&&data[i+2]>data[i+1])
      blue += 1;
  }
  
  if(red>totalPixels/2){
    document.getElementById("tint").innerHTML = "This image is reddish.";
    document.getElementById("tint").style.backgroundColor = "red";
  }
  else if(green>totalPixels/2){
    document.getElementById("tint").innerHTML = "This image is greenish.";
    document.getElementById("tint").style.backgroundColor = "green";
  }
  else if(blue>totalPixels/2){
    document.getElementById("tint").innerHTML = "This image is blueish.";
    document.getElementById("tint").style.backgroundColor = "blue";
  }
  else{
    document.getElementById("tint").innerHTML = "This image is not reddish, greenish, or blueish.";
    document.getElementById("tint").style.backgroundColor = "grey";
  }
}


function markRed(){

    
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
  
    for (var i = 0; i < data.length; i += 4) {
      if(data[i]<data[i+1]+data[i+2])
        data[i]=255;
    }
    ctx.putImageData(imageData, 0, 0);
    img.src = canvas.toDataURL();
    tintfunc();
}

function markGreen(){

    
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
  
    for (var i = 0; i < data.length; i += 4) {
      if(data[i+1]<data[i]+data[i+2])
        data[i+1]=255;
    }
    ctx.putImageData(imageData, 0, 0);
    img.src = canvas.toDataURL();
    tintfunc();
}

function markBlue(){
 
    
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
  
    for (var i = 0; i < data.length; i += 4) {
      if(data[i+2]<data[i]+data[i+1])
        data[i+2]=255;
    }
    ctx.putImageData(imageData, 0, 0);
    img.src = canvas.toDataURL();
    tintfunc();
}


function fullReset(){
  img.src = originalImgSrc; 
}

function markReset(){
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    applyFilters();
    tintfunc();
  };
  img.src = image.src;

}

function tintImage(){

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  let tint = document.getElementById('tint-color').value;
  let rgb = hexToRgb(tint);

  for (let i = 0; i < data.length; i += 4) {
    data[i] += rgb.r;
    data[i + 1] += rgb.g;
    data[i + 2] += rgb.b;
  }

  ctx.putImageData(imageData, 0, 0);
  img.src = canvas.toDataURL();
  tintfunc();
}

let hexToRgb = (hex) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const filterDefaults = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  grayscale: 0,
  hue: 0,
  invert: 0,
  sepia: 0,
  blur: 0
};

const filterValues = Object.assign({}, filterDefaults);

brightnessSlider.addEventListener('input', function() {
  let brightnessValue = parseInt(this.value);
  let brightness = brightnessValue >= 0
    ? brightnessValue / 100 + 1 
    : 1 + brightnessValue / 100;
  filterValues.brightness = brightness;
  ctx.filter = `brightness(${brightness})`;
  applyFilters();
  if (brightnessValue === 0) {
    filterValues.brightness = filterDefaults.brightness;
    ctx.filter = `brightness(${filterDefaults.brightness})`;
  }
});

contrastSlider.addEventListener('input', function() {
  let contrastValue = parseInt(this.value);
  let contrast = contrastValue >= 0
    ? contrastValue / 100 + 1 
    : 1 + contrastValue / 100;
  filterValues.contrast = contrast;
  ctx.filter = `contrast(${contrast})`;
  applyFilters();
  if (contrastValue === 0) {
    filterValues.contrast = filterDefaults.contrast;
    ctx.filter = `contrast(${filterDefaults.contrast})`;
  }
});

saturationSlider.addEventListener('input', function() {
  let saturationValue = parseInt(this.value);
  let saturation = saturationValue >= 0
    ? saturationValue / 100 + 1 
    : 1 + saturationValue / 100;
  filterValues.saturation = saturation;
  ctx.filter = `saturate(${saturation})`;
  applyFilters();
  if (saturationValue === 0) {
    filterValues.saturation = filterDefaults.saturation;
    ctx.filter = `saturate(${filterDefaults.saturation})`;
  }
});


grayscaleSlider.addEventListener('input', function() {
  let grayscaleValue = parseInt(this.value);
  let grayscale = grayscaleValue >= 0
    ? grayscaleValue / 100 
    : 0;
  filterValues.grayscale = grayscale;
  ctx.filter = `grayscale(${grayscale})`;
  applyFilters();
  if (grayscaleValue === 0) {
    filterValues.grayscale = filterDefaults.grayscale;
    ctx.filter = `grayscale(${filterDefaults.grayscale})`;
  }
});



hueSlider.addEventListener('input', function() {
  let hueValue = parseInt(this.value);
  let hue = hueValue >= 0
    ? hueValue / 100 * 180 
    : hueValue / 100 * 180 + 180; 
  filterValues.hue = hue;
  ctx.filter = `hue-rotate(${hue}deg)`;
  applyFilters();
  if (hueValue === 0) {
    filterValues.hue = filterDefaults.hue;
    ctx.filter = `hue-rotate(${filterDefaults.hue}deg)`;
  }
});

invertSlider.addEventListener('input', function() {
  let invertValue = parseInt(this.value);
  let invert = invertValue >= 0
    ? invertValue / 100 
    : 0;
  filterValues.invert = invert;
  ctx.filter = `invert(${invert})`;
  applyFilters();
  if (invertValue === 0) {
    filterValues.invert = filterDefaults.invert;
    ctx.filter = `invert(${filterDefaults.invert})`;
  }
});

sepiaSlider.addEventListener('input', function() {
  let sepiaValue = parseInt(this.value);
  let sepia = sepiaValue >= 0
    ? sepiaValue / 100 
    : 0;
  filterValues.sepia = sepia;
  ctx.filter = `sepia(${sepia})`;
  applyFilters();
  if (sepiaValue === 0) {
    filterValues.sepia = filterDefaults.sepia;
    ctx.filter = `sepia(${filterDefaults.sepia})`;
  }
});


blurSlider.addEventListener('input', function() {
  let blurValue = parseInt(this.value);
  let blur = blurValue >= 0
    ? blurValue / 100 
    : 0;
  filterValues.blur = blur;
  ctx.filter = `blur(${blur}px)`;
  applyFilters();
  if (blurValue === 0) {
    filterValues.blur = filterDefaults.blur;
    ctx.filter = `blur(${filterDefaults.blur}px)`;
  }
} );

applyFilters = () => {
  const filters = [
    `brightness(${brightnessSlider.value / 100 + 1})`,
    `contrast(${contrastSlider.value / 100 + 1})`,
    `saturate(${saturationSlider.value / 100 + 1})`,
    `grayscale(${grayscaleSlider.value / 100})`,
    `hue-rotate(${hueSlider.value / 100 * 180}deg)`,
    `invert(${invertSlider.value / 100})`,
    `sepia(${sepiaSlider.value / 100})`,
    `blur(${blurSlider.value / 100}px)`,
  ];
  ctx.filter = filters.join(' ');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function changeResolution() {
  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);
  applyFilters();
}

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
  image.onload = function() {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    applyFilters();
  };
  image.src = img.src;
});


const generateBtn = document.getElementById("generate-qr-btn");
const qrCanvas = document.getElementById("qr-canvas");


generateBtn.addEventListener("click", function() {
  
  const text = image.src;
  
  const qr = new QRious({
    element: qrCanvas,
    value: text,
    size: 256,
    level: "H"
  });
});

const avatarCanvas = document.getElementById('avatar-canvas');
const avatarBtn = document.getElementById('avatar-btn');


avatarBtn.addEventListener('click', function() {
  const avatar = createAvatar(editedImage, avatarCanvas);
  avatarCanvas.style.display = 'block';
});

function createAvatar(image, avatarCanvas) {
  const ctx = avatarCanvas.getContext('2d');
  ctx.drawImage(image, 0, 0, 100, 100);
  ctx.beginPath();
  ctx.arc(50, 50, 50, 0, Math.PI * 2, false);
  ctx.clip();
  ctx.drawImage(image, 0, 0, 100, 100);
  return avatarCanvas;
}

const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const downloadLink = document.createElement('a');
  downloadLink.href = dataURL;
  downloadLink.download = 'canvas-image.png';
  downloadLink.click();
});

const resettuneBtn = document.getElementById('reset-tune');
resettuneBtn.addEventListener('click', () => {
  brightnessSlider.value = 0;
  contrastSlider.value = 0;
  saturationSlider.value = 0;
  grayscaleSlider.value = 0;
  hueSlider.value = 0;
  invertSlider.value = 0;
  sepiaSlider.value = 0;
  blurSlider.value = 0;
  applyFilters();
  document.getElementById('brightness-value').innerHTML = 0;
  document.getElementById('contrast-value').innerHTML = 0;
  document.getElementById('saturation-value').innerHTML = 0;
  document.getElementById('grayscale-value').innerHTML = 0;
  document.getElementById('hue-value').innerHTML = 0;
  document.getElementById('invert-value').innerHTML = 0;
  document.getElementById('sepia-value').innerHTML = 0;
  document.getElementById('blur-value').innerHTML = 0;
});