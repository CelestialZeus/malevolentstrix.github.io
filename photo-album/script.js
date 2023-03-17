
var imagelink = ""

let image = document.getElementById('sourceImage');
let image3 = document.getElementById('sio');
let image2 = document.getElementById('si');
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let brightnessSlider = document.getElementById("brightnessSlider");
let contrastSlider = document.getElementById("contrastSlider");
let grayscaleSlider = document.getElementById("grayscaleSlider");
let hueRotateSlider = document.getElementById("hueRotateSlider");
let saturateSlider = document.getElementById("saturationSlider");
let sepiaSlider = document.getElementById("sepiaSlider");



function myScript() {
    imagelink = this.getElementsByTagName("img")[0].src;

    fetch(imagelink)
        .then(res => res.blob())
        .then(blob => {
            image.src = URL.createObjectURL(blob);
        })

    image.onload = function () {

        canvas.width = this.width;
        canvas.height = this.height;
        canvas.crossOrigin = "anonymous";
        applyFilter();
    };

    document.querySelector('.imgsave').style.display = "flex";
    document.querySelector('#editorpane').style.display = "block";
    document.querySelector('.imgsave').style.flexDirection = "row";
    document.querySelector('.image-controls').style.display = "block";
    document.querySelector('.preset-filters').style.display = "flex";
    document.querySelector('.preset-filters').style.flexDirection = "row";
    document.getElementById('photo-album').style.display = "none";

}

function myScriptforhover() {
    
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

function reddenFilter() {
    resetImage();


    hueRotateSlider.value = 270;
    applyFilter();
}
function greenFilter() {
    resetImage();


    hueRotateSlider.value = 90;
    applyFilter();
}
function blueFilter() {
    resetImage();


    hueRotateSlider.value = 180;
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
        'download', 'edit.png'
    );
    let canvasData = canvas.toDataURL("image/png")
    canvasData.replace(
        "image/png", "image/octet-stream"
    )
    linkElement.setAttribute('href', canvasData);
    linkElement.click();

}

function previewImage() {
    document.querySelector('.imgsave').style.display = "none";
    document.querySelector('#editorpane').style.display = "none";
    document.querySelector('.image-controls').style.display = "none";
    document.querySelector('.preset-filters').style.display = "none";
    document.querySelector('#photo-album').style.display = "none";
    document.querySelector('#previewimgs').style.display = "flex";
    document.querySelector('#download').style.display = "flex";
    image3.src = image.src;
    image2.src = canvas.toDataURL("image/png");


}


function back() {
    document.querySelector('.imgsave').style.display = "flex";
    document.querySelector('#editorpane').style.display = "block";
    document.querySelector('.imgsave').style.flexDirection = "row";
    document.querySelector('.image-controls').style.display = "block";
    document.querySelector('.preset-filters').style.display = "flex";
    document.querySelector('.preset-filters').style.flexDirection = "row";
    document.getElementById('photo-album').style.display = "none";
    document.querySelector('#previewimgs').style.display = "none";
    document.querySelector('#download').style.display = "none";
}


const cells = document.querySelectorAll(".individualphoto");
cells.forEach((cell) => {
    cell.addEventListener("click", myScript);
    cell.addEventListener("hover", myScriptforhover);
});

