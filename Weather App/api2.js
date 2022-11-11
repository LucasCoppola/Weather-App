const weatherContainer = document.querySelector('.container-weather')
const contLocationDate = document.querySelector('.location-date')
const contCurrentWeather = document.querySelector('.container-current-weather')
const secondaryContainer =  document.querySelector('.secondary-conatiners')
const contTemperatures = document.querySelector('.temperatures')
const contWindAndPrecipitation = document.querySelector('.wind-precipitation')
const contSunriseSunset = document.querySelector('.sunrise-sunset')
const weatherHourly = document.querySelectorAll('.card')
const text = document.querySelector('.text')

const getCurrentWeather = async () => {
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=-34.75&lon=-58.583&&units=metric&appid=85923bd9ee7d4699bf5436bf24ec3fd1')
    if(res.data.weather[0].main !== "Rain" && res.data.clouds.all < 30 ){
      const img = document.createElement('img')
      img.classList.add('main-img')
      img.setAttribute('src', "images/sun.png")
      contCurrentWeather.appendChild(img)
    }else if(res.data.weather[0].main !== "Rain" && res.data.clouds.all >= 30 ){
      const img = document.createElement('img')
      img.classList.add('main-img')
      img.setAttribute('src', "images/cloudy.png")
      contCurrentWeather.appendChild(img)
    }else if(res.data.weather[0].main === "Rain"){
      const img = document.createElement('img')
      img.classList.add('main-img')
      img.setAttribute('src', "images/rain.png")
      contCurrentWeather.appendChild(img)
    }
    const currentWeather = document.createElement('h1')
    currentWeather.classList.add('current-weather')
    currentWeather.innerHTML = `${res.data.main.temp}°`
    text.appendChild(currentWeather)
    const weatherDescription = document.createElement('h2')
    weatherDescription.classList.add('weather-description')
    weatherDescription.append(res.data.weather[0].main)
    text.appendChild(weatherDescription)
}

const getCurrentDate = async () => {
  const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-34.6118&longitude=-58.4173&hourly=temperature_2m,precipitation,rain,cloudcover,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours&current_weather=true&timezone=auto')
  const time = res.data.current_weather.time.slice(11)
  const date = res.data.current_weather.time.slice(5, 10)
  const currentDate = document.createElement('h2')
  currentDate.classList.add('current-date')
  currentDate.append(date, ", ", time)
  contLocationDate.appendChild(currentDate)
}

const highLowTemperatures = async () => {
  const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=-34.75&lon=-58.583&&units=metric&appid=85923bd9ee7d4699bf5436bf24ec3fd1')
  // High Temperature Section
  const highTemp = document.createElement('h1')
  highTemp.classList.add('accesories')
  highTemp.append(res.data.main.temp_max.toFixed(1), "°")
  contTemperatures.appendChild(highTemp)
  const highTempTitle = document.createElement('h2')
  highTempTitle.innerText = "High"
  highTemp.appendChild(highTempTitle)
  // Low Temperature Section
  const lowTemp = document.createElement('h1')
  lowTemp.classList.add('accesories')
  lowTemp.append(res.data.main.temp_min.toFixed(1), "°")
  contTemperatures.appendChild(lowTemp)
  const lowTempTitle = document.createElement('h2')
  lowTempTitle.innerText = "Low"
  lowTemp.appendChild(lowTempTitle)
  secondaryContainer.appendChild(contTemperatures)
}

const getWindAndPrecipitation = async () => {
  const res = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=-34.6118&longitude=-58.4173&hourly=temperature_2m,precipitation,rain,cloudcover,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_hours&current_weather=true&timezone=auto')
  // Wind Speed Section
  const windSpeed = document.createElement('h1')
  windSpeed.classList.add('accesories')
  windSpeed.append(res.data.current_weather.windspeed, "km/h")
  contWindAndPrecipitation.appendChild(windSpeed)
  const windSpeedTitle = document.createElement('h2')
  windSpeedTitle.innerText = "Wind"
  windSpeed.appendChild(windSpeedTitle)
  // Precipitation Section
  const precipitation = document.createElement('h1')
  precipitation.classList.add('accesories')
  precipitation.append(res.data.hourly.precipitation[0], "mm")
  contWindAndPrecipitation.appendChild(precipitation)
  const precipitationTitle = document.createElement('h2')
  precipitationTitle.innerText = "Precipitation"
  precipitation.appendChild(precipitationTitle)
  secondaryContainer.appendChild(contWindAndPrecipitation)
}

const getSunriseSunset = async () => {
  const res = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=-34.75&lon=-58.583&&units=metric&appid=85923bd9ee7d4699bf5436bf24ec3fd1')
  // Sunrise Section
  let unixTimestampSunrise = res.data.sys.sunrise
  const sunriseDate = new Date(unixTimestampSunrise * 1000)
  const sunriseTime = sunriseDate.toLocaleTimeString("it-IT").slice(0, 5)
  const sunrise = document.createElement('h1')
  sunrise.classList.add('accesories')
  sunrise.append(sunriseTime)
  contSunriseSunset.appendChild(sunrise)
  const sunriseTitle = document.createElement('h2')
  sunriseTitle.innerText = "Sunrise"
  sunrise.appendChild(sunriseTitle)
  // Sunset section
  let unixTimestampSunset = res.data.sys.sunset
  const sunsetDate = new Date(unixTimestampSunset * 1000)
  const sunsetTime = sunsetDate.toLocaleTimeString("it-IT").slice(0, 5)
  const sunset = document.createElement('h1')
  sunset.classList.add('accesories')
  sunset.append(sunsetTime)
  contSunriseSunset.appendChild(sunset)
  const sunsetTitle = document.createElement('h2')
  sunsetTitle.innerText = "Sunset"
  sunset.appendChild(sunsetTitle)
}

const getWeatherHourly = async () => {
    const res = await axios.get('https://api.openweathermap.org/data/2.5/forecast?lat=-34.6118&lon=-58.4173&units=metric&appid=85923bd9ee7d4699bf5436bf24ec3fd1')
    const time3hArray = []
    const weather3hArray = []
    const img3hArray = []
    const clouds3hArray = []
    // Loops
    for(let i = 0; i < res.data.list.length; i++){
      time3hArray.push(res.data.list[i].dt_txt.slice(11, 16))
    }
    for(let i = 0; i < res.data.list.length; i++){
      weather3hArray.push(res.data.list[i].main.temp)
    }
    for(let i = 0; i < res.data.list.length; i++){
      img3hArray.push(res.data.list[i].weather[0].main)
    }
    for(let i = 0; i < res.data.list.length; i++){
      clouds3hArray.push(res.data.list[i].clouds.all)
    }
    // Card Elements
    weatherHourly.forEach((item, i) => {
      const timeIndex = time3hArray[i];
      const weatherIndex = weather3hArray[i].toFixed(1);

      item.append(timeIndex)

      if(img3hArray[i] !== "Rain" && clouds3hArray[i] < 30 ){
        const img = document.createElement('img')
        img.classList.add('small-img')
        img.setAttribute('src', "images/sun.png")
        item.append(img)
      }else if(img3hArray[i] !== "Rain" && clouds3hArray[i] >= 30 ){
        const img = document.createElement('img')
        img.classList.add('small-img')
        img.setAttribute('src', "images/cloudy.png")
        item.append(img)
      }else if(img3hArray[i] === "Rain"){
        const img = document.createElement('img')
        img.classList.add('small-img')
        img.setAttribute('src', "images/rain.png")
        item.append(img)
      }

      item.append(weatherIndex, "°")

    });
}

const functionsContainer = () => {
  getCurrentWeather()
  getCurrentDate()
  highLowTemperatures()
  getWindAndPrecipitation()
  getSunriseSunset()
  getWeatherHourly()
}
window.onload = functionsContainer()
