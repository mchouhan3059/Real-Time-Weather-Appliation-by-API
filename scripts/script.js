let form = document.querySelector('form')
let weatherTiles = document.querySelector('.weatherTiles')
let CityName;

let oldData = JSON.parse(localStorage.getItem('CityNames')) ?? [];

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`
let imgpath = `https://openweathermap.org/img/w/`

form.addEventListener('submit', (e) => {
    // e.preventDefault();
    CityName = e.target.cityName.value;

    if (!oldData.includes(CityName)) {
        oldData.push(CityName)
    }
    localStorage.setItem('CityNames', JSON.stringify(oldData))

    CityName = '';
    fetch(apiUrl).then(res => res.json)  // => {      // return res.json();        // })
        .then((finalres) => {
            let { weather, name, sys, main } = finalres;
            weatherTiles.innerHTML +=
                `<div class="weatherTile">
                    <div class="countrybg">
                     <h2>${sys.country}</h2>
                    </div>
                    <figure>
                        <img src="${imgpath + weather[0].icon}.png" alt="weather">
                    </figure>
                    <h3>${name}</h3>
                    <h4>${main.temp}</h4>
                    <h5>${weather[0].description}</h5>
                </div>`

            console.log(finalres)
        })

})

window.addEventListener('load', () => {
    oldData.forEach((e) => {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`
        fetch(apiUrl).then((res) => {
            return res.json();
        })
            .then((finalres) => {
                let { weather, name, sys, main } = finalres;
                weatherTiles.innerHTML +=
                    `<div class="weatherTile">
                        <div class="countrybg">
                         <h2>${sys.country}</h2>
                        </div>
                        <figure>
                            <img src="${imgpath + weather[0].icon}.png" alt="weather">
                        </figure>
                        <h3>${name}</h3>
                        <h4>${main.temp}</h4>
                        <h5>${weather[0].description}</h5>
                    </div>`
            })
    })
})





