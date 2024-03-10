
//Guardamos la ApiKey

const API_KEY = "5b7e395d8af3259c02ca481c7d12b154"

//Hacemos la petición

const requestCity = async (city) => {

    const options = {
        units: 'metric',
        lang: 'es',
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${options.units}&lang=${options.lang}&APPID=${API_KEY}`)

        if (response.status === 404) {
            console.error('Error al traer los datos del clima');
        }

        const data = await response.json()
        return data

    } catch (error) {
        throw new Error(`No se puede acceder, error: ${error}`)
    }
}

