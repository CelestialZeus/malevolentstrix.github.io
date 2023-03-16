
var imagelink = ""

let image = document.getElementById('sourceImage');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let brightnessSlider = document.getElementById("brightnessSlider");
let contrastSlider = document.getElementById("contrastSlider");
let grayscaleSlider = document.getElementById("grayscaleSlider");
let hueRotateSlider = document.getElementById("hueRotateSlider");
let saturateSlider = document.getElementById("saturationSlider");
let sepiaSlider = document.getElementById("sepiaSlider");


function myScript() {
    console.log("myScript called")
    console.log(this.getElementsByTagName("img")[0].src);
    imagelink = this.getElementsByTagName("img")[0].src;

    fetch(imagelink)
    .then(res => res.blob()) 
        .then(blob => {
            image.src = URL.createObjectURL(blob);
            console.log(event.target.files)
        })

    image.onload = function () {

        canvas.width = this.width;
        canvas.height = this.height;
        canvas.crossOrigin = "anonymous";
        applyFilter();
    };

    document.querySelector('.image-save').style.display = "block";
    document.querySelector('.image-controls').style.display = "block";
    document.querySelector('.preset-filters').style.display = "flex";
    document.querySelector('.preset-filters').style.flexDirection = "row";
    document.getElementById('photo-album').style.display = "none";

}



function applyFilter() {

    let filterString =
        "brightness(" + brightnessSlider.value + "%" +
        ") contrast(" + contrastSlider.value + "%" +
        ") grayscale(" + grayscaleSlider.value + "%" +
        ") saturate(" + saturateSlider.value + "%" +
        ") sepia(" + sepiaSlider.value + "%" +
        ") hue-rotate(" + hueRotateSlider.value + "deg" + ")";


    context.filter = filterString;


    context.drawImage(image, 0, 0);
}

function brightenFilter() {
    resetImage();
    brightnessSlider.value = 130;
    contrastSlider.value = 120;
    saturateSlider.value = 120;
    applyFilter();
}

function bwFilter() {
    resetImage();
    grayscaleSlider.value = 100;
    brightnessSlider.value = 120;
    contrastSlider.value = 120;
    applyFilter();
}

function funkyFilter() {
    resetImage();


    hueRotateSlider.value =
        Math.floor(Math.random() * 360) + 1;
    contrastSlider.value = 120;
    applyFilter();
}

function vintageFilter() {
    resetImage();
    brightnessSlider.value = 120;
    saturateSlider.value = 120;
    sepiaSlider.value = 150;
    applyFilter();
}
function resetImage() {
    brightnessSlider.value = 100;
    contrastSlider.value = 100;
    grayscaleSlider.value = 0;
    hueRotateSlider.value = 0;
    saturateSlider.value = 100;
    sepiaSlider.value = 0;
    applyFilter();
}

function saveImage() {


    let linkElement = document.getElementById('link');
    linkElement.setAttribute(
        'download', 'edited_image.png'
    );
    let canvasData = canvas.toDataURL("image/png")
    canvasData.replace(
        "image/png", "image/octet-stream"
    )
    linkElement.setAttribute('href', canvasData);
    linkElement.click();
}


const cells = document.querySelectorAll(".individualphoto");
cells.forEach((cell) => {
    cell.addEventListener("click", myScript);
});
  
