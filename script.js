console.log('hey')

const form = document.querySelector("form");
const imgBox = document.getElementById("img-box");
const img = document.querySelector("img")

form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault();

    let width = e.target.elements[0].value;
    let height = e.target.elements[1].value;
    let grayscale = ''

    if (e.target.elements[2].checked) grayscale = '?grayscale'

    if (width === '') width = e.target.elements[0].placeholder;
    if (height === '') height = e.target.elements[1].placeholder;

    console.log(`Width: ${width}\nHeight: ${height}`);

    baseUrl = 'https://picsum.photos/'

    fetch(baseUrl + width + '/' + height + grayscale)
        .then(res => {
            imgBox.style.width = width + 'px';
            imgBox.style.height = height + 'px';
            img.src = res.url
        })
        .catch(err => {
            console.log("error retrieving data", err);
        });
}


// DRAGGING FUNCTIONALITY
let direction = ''
let mousePosx;

imgBox.addEventListener("mousedown", handleDrag)
document.addEventListener("mouseup", handleRelease)

function handleDrag(e) {
    let clickLocx = parseInt(getComputedStyle(imgBox, '').width) - e.offsetX
    let clickLocy = parseInt(getComputedStyle(imgBox, '').height) - e.offsetY
    if (clickLocx < 0 || clickLocy < 0) {
        console.log('offsets ' + e.offsetX + ' ' + e.offsetY)
        let temp = false
        if (form.elements[2].checked) temp = true
        form.reset()
        if (temp) form.elements[2].checked = true
        mousePosx = e.x;
        mousePosy = e.y;
        document.addEventListener("mousemove", resize);
        console.log(mousePosx, mousePosy)
    }

    if (clickLocx < 0 && clickLocy < 0) direction ='xy'
    else if (clickLocx < 0 && clickLocy > 0) direction ='x'
    else if (clickLocx > 0 && clickLocy < 0) direction ='y'

}

function handleRelease(e) {
    document.removeEventListener("mousemove", resize);
    if (e.target.className === 'clickable') {
    dragToImg(parseInt(getComputedStyle(imgBox, '').width), parseInt(getComputedStyle(imgBox, '').height))
    }
}

function resize(e) {
    console.log('direction = ' + direction)
    const dx = mousePosx - e.x;
    const dy = mousePosy - e.y;
    mousePosx = e.x;
    mousePosy = e.y;
    // console.log(getComputedStyle(imgBox, '').width, getComputedStyle(imgBox, '').height)
    if (direction === 'xy') {
        form.elements[0].placeholder = parseInt(getComputedStyle(imgBox, '').width)
        form.elements[1].placeholder = parseInt(getComputedStyle(imgBox, '').height)
        imgBox.style.width = (parseInt(getComputedStyle(imgBox, '').width) - dx) + "px";
        imgBox.style.height = (parseInt(getComputedStyle(imgBox, '').height) - dy) + "px";
    } else if (direction === 'x') {
        form.elements[0].placeholder = parseInt(getComputedStyle(imgBox, '').width)
        imgBox.style.width = (parseInt(getComputedStyle(imgBox, '').width) - dx) + "px";
    } else if (direction === 'y') {
        form.elements[1].placeholder = parseInt(getComputedStyle(imgBox, '').height)
        imgBox.style.height = (parseInt(getComputedStyle(imgBox, '').height) - dy) + "px";
    }
  }
  
  function dragToImg(lastWidth, lastHeight) {

    let height = lastHeight
    let width = lastWidth
    let grayscale = ''

    if (form.elements[2].checked) grayscale = '?grayscale'

    console.log(`Height: ${height}\nWidth: ${width}`);

    baseUrl = 'https://picsum.photos/'

    fetch(baseUrl + width + '/' + height + grayscale)
        .then(res => {
            img.src = res.url
        })
        .catch(err => {
            console.log("error retrieving data", err);
        });
}