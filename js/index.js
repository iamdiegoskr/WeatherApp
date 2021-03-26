import { validateTitleWeather, capitalizeStrings, convertCountryName } from './validate.js'

const API_KEY = '4f55508ad37c2f3b2fca3a115784a320'
    // const API = 'http://api.openweathermap.org/data/2.5/weather?q=tokio&appid=4f55508ad37c2f3b2fca3a115784a320&lang=es'

const API_BASE = 'http://api.openweathermap.org/data/2.5/weather?'
const API_PARAMS = '&appid=4f55508ad37c2f3b2fca3a115784a320&lang=es'
    //'http://openweathermap.org/img/wn/04d@2x.png'
const URL_IMAGE = 'http://openweathermap.org/img/wn/'

const API_COUNTRY = 'https://restcountries.eu/rest/v2/name/'

const city = document.querySelector('.city')
const buttonSearch = document.querySelector('.btn-search')

const deg = document.querySelector('.deg')
const cityHTML = document.querySelector('.city-name')
const imageWeather = document.querySelector('.icon-weather')

const titleWeather = document.querySelector('.weather-title')
const descriptionWeather = document.querySelector('.weather-description')
const countryHTML = document.querySelector('.country')
const regionHTML = document.querySelector('.region')
const flagCountry = document.querySelector('.flag-country')

const resultContainer = document.querySelector('.result')

function stopPreloader() {
    const preloader = document.querySelector('.preloader')
    const containerWeather = document.querySelector('.container')
    preloader.style.animation = "none"
    preloader.style.visibility = "hidden"
    containerWeather.style.visibility = "visible"
}

const getCountry = async(nameCountry) => {
    const response = await fetch(`${API_COUNTRY}${nameCountry}`)
    const dataCountry = await response.json()

    return dataCountry

}

const getWeatherByCity = async() => {


    const citySearch = city.value.toLowerCase()

    try {

        const response = await fetch(`${API_BASE}q=${citySearch}${API_PARAMS}`)
        const weather = await response.json()
        renderCityWeather(weather)
        console.log(weather)

    } catch (err) {
        console.log(err)
    }

}

const getOwnTitle = (id) => {

    return validateTitleWeather(id)

}

const renderCityWeather = async(weather) => {

    const { id, icon, description } = weather.weather[0]

    deg.innerHTML = Math.floor(kelvinToCentigrade(weather.main.temp))
    cityHTML.innerHTML = weather.name
    imageWeather.src = `${URL_IMAGE}${icon}@2x.png`;

    titleWeather.innerHTML = getOwnTitle(id)
    descriptionWeather.innerHTML = capitalizeStrings(description)

    // countryHTML.innerHTML = convertCountryName(weather.sys.country)

    const countryName = convertCountryName(weather.sys.country) //Obtengo el nombre completo del pais en ingles, tambien puedo tenerlo en español

    const mydataCountry = await getCountry(countryName)
    console.log(mydataCountry[0])

    countryHTML.innerHTML = mydataCountry[0].translations.es
    regionHTML.innerHTML = mydataCountry[0].region
    flagCountry.src = mydataCountry[0].flag


}

const kelvinToCentigrade = (kelvin) => {
    return kelvin - 273.15
}


buttonSearch.addEventListener('click', getWeatherByCity)


window.onload = function() {
    stopPreloader()
}