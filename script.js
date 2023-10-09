console.log('hey')

const form = document.querySelector("form");
const img = document.querySelector("img")

form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault();

    let height = e.target.elements[0].value;
    let width = e.target.elements[1].value;

    if (height === '') height = e.target.elements[0].placeholder;
    if (width === '') width = e.target.elements[1].placeholder;

    console.log(`Height: ${height}\nWidth: ${width}`);

    baseUrl = 'https://picsum.photos/'

    fetch(baseUrl + height + '/' + width)
        .then(res => {
            img.src = res.url
        })
        .catch(err => {
            console.log("error retrieving data", err);
        });
}