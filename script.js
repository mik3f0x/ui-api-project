console.log('hey')

const form = document.querySelector("form");
const img = document.querySelector("img")

form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault();

    let width = e.target.elements[0].value;
    let height = e.target.elements[1].value;

    if (width === '') width = e.target.elements[0].placeholder;
    if (height === '') height = e.target.elements[1].placeholder;

    console.log(`Width: ${width}\nHeight: ${height}`);

    baseUrl = 'https://picsum.photos/'

    fetch(baseUrl + width + '/' + height)
        .then(res => {
            img.src = res.url
        })
        .catch(err => {
            console.log("error retrieving data", err);
        });
}



const borderThick = 25;
const imgBox = document.getElementById("img-box");

let mousePosx;

imgBox.addEventListener("mousedown", handleDrag)
document.addEventListener("mouseup", handleRelease)

function handleDrag(e) {
    let clickLocx = parseInt(getComputedStyle(imgBox, '').width) - e.offsetX
    let clickLocy = parseInt(getComputedStyle(imgBox, '').height) - e.offsetY
    if (clickLocx < borderThick) {
        mousePosx = e.x;
        mousePosy = e.y;
        document.addEventListener("mousemove", resize);
        console.log(mousePosx, mousePosy)
    }
}

function handleRelease(e) {
    document.removeEventListener("mousemove", resize);
    if (e.target.id === 'img-box') {
    dragToImg(parseInt(getComputedStyle(imgBox, '').width), parseInt(getComputedStyle(imgBox, '').height))
    }
}

function resize(e) {
    const dx = mousePosx - e.x;
    const dy = mousePosy - e.y;
    mousePosx = e.x;
    mousePosy = e.y;
    console.log(getComputedStyle(imgBox, '').width, getComputedStyle(imgBox, '').height)
    form.elements[0].placeholder = parseInt(getComputedStyle(imgBox, '').width)
    form.elements[1].placeholder = parseInt(getComputedStyle(imgBox, '').height)
    imgBox.style.width = (parseInt(getComputedStyle(imgBox, '').width) - dx) + "px";
    imgBox.style.height = (parseInt(getComputedStyle(imgBox, '').height) - dy) + "px";
//     imgBox.style.zIndex = 2;
//     img.style.zIndex = 1;
  }
  




  function dragToImg(lastWidth, lastHeight) {

    let height = lastHeight
    let width = lastWidth

    console.log(`Height: ${height}\nWidth: ${width}`);

    baseUrl = 'https://picsum.photos/'

    console.log(`Width: ${width}\nHeight: ${height}`);

    baseUrl = 'https://picsum.photos/'

    fetch(baseUrl + width + '/' + height)
        .then(res => {
            img.src = res.url
        })
        .catch(err => {
            console.log("error retrieving data", err);
        });
}