const search = document.querySelector('.search-box button');
search.addEventListener('click', () => {
    const APIKey = '40c0f38a30b384c119645ebfed39aaa8';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const error404 = document.querySelector('.not-found')

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;

                case 'Clouds':
                    image.src = 'cloud.png'; 
                    break;

                case 'Mist':
                    image.src = 'mist.png';
                    break;

                case 'Rain':
                    image.src = 'rain.png';
                    break;

                case 'Snow':
                    image.src = 'snow.png';
                    break;

                default:
                    image.src = 'clear.png';
            }

            temperature.textContent = `${json.main.temp} °C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} m/s`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error.message);
        });
});
