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
const panel = document.getElementById("img-box");

let m_pos;

panel.addEventListener("mousedown", handleDrag)
document.addEventListener("mouseup", handleRelease)

function handleDrag(e) {
    let clickLocation = parseInt(getComputedStyle(panel, '').width) - e.offsetX
    if (clickLocation < borderThick) {
        m_pos = e.x;
        document.addEventListener("mousemove", resize);
        console.log(m_pos)
    }
}

function handleRelease() {
    document.removeEventListener("mousemove", resize);
    dragToImg(parseInt(getComputedStyle(panel, '').width))
}

function resize(e) {
    const dx = m_pos - e.x;
    m_pos = e.x;
    console.log(getComputedStyle(panel, '').width)
    panel.style.width = (parseInt(getComputedStyle(panel, '').width) - dx) + "px";
  }
  




  function dragToImg(lastWidth) {

    let height = 200
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