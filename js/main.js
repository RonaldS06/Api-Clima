//& Traemos los elementos del html
const form = document.getElementById('form')
const cityInput = document.querySelector('.search_input')
const cardContainer = document.querySelector('.container_card')
const msgClimate = document.querySelector('.text_climate')


const roundNumber = (number) => Math.round(number)

// controlador para simplificar la data de la ciudad  que nos llega
const getCityData = (cityData) => {
  return {
    cityName: cityData.name,
    imageName: cityData.weather[0].icon,
    cityWeatherInfo: cityData.weather[0].description,
    cityTemp: roundNumber(cityData.main.temp),
    cityST: roundNumber(cityData.main.feels_like),
    cityMaxTemp: roundNumber(cityData.main.temp_max),
    cityMinTemp: roundNumber(cityData.main.temp_min),
    cityHumidity: roundNumber(cityData.main.humidity),
  }
}


const createCityTemplate = (cityData) => {
  const { cityName, imageName, cityWeatherInfo, cityTemp, cityST, cityMaxTemp, cityMinTemp, cityHumidity } = getCityData(cityData)
  return `
    <div class="tiempo_api">
      <div class="location">
        <span class="material-symbols-outlined">location_on</span>
        <h2 class="nameCiudad">${cityName}</h2>
      </div>
      <span class="description_clima">${cityWeatherInfo}</span>
      <h3 class="number_clima">${cityTemp}°</h3>
      <span class="st_clima">${cityST} ST</span>
    </div>
    <img src="./img/${imageName}.png" alt=${imageName} class="img_clima" />
    <div class="info_api">
      <p>Max: ${cityMaxTemp}°</p>
      <p>Min: ${cityMinTemp}°</p>
      <span> ${cityHumidity}% Humedad</span>
    </div>
    `
}


const renderCityCard = (cityData) => {
  cardContainer.innerHTML = createCityTemplate(cityData)
}

const changeSearchMsg = (cityData) => {
  const cityName = cityData.name
  msgClimate.innerHTML = `<p class="text_climate">
  Así está el clima en ${cityName} ¿Quiéres ver el clima en otra ciudad?
</p>`
}

//Función para ver si el input está vacio
const isEmptyInput = () => cityInput.value.trim() === ''
//Funcion para saber si la ciudad es valida
const isInvalidadCity = cityData => !cityData.id

const searchCity = async (e) => {
  e.preventDefault()

  //input vacio, tire un alert
  if (isEmptyInput()) {
    alert("Por favor ingresa una ciudad")
    return
  }
  //si el input no esta vacio que realice la busqueda
  const fetchedCity = await requestCity(cityInput.value);
  //Si la ciudad no es encontrada, que muestre un alert
  if (isInvalidadCity(fetchedCity)) {
    alert("Ciudad no encontrada")
    return
  }

  //*Si la ciudad existe, renderizamos
  renderCityCard(fetchedCity)
  changeSearchMsg(fetchedCity)
  form.reset()
}

// Funcion init para inicializar
const init = () => {
  form.addEventListener('submit', searchCity)
}

init()