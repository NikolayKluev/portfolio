function getUserLocation() {
    if (!navigator.geolocation) {
        alert('Геолокация не поддерживается вашим браузером');
        return;
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // console.log(`Координаты: ${lat}, ${lon}`);
            fetchCityName(lat, lon);
        },
        (error) => {
            handleGeolocationError(error);
        },
        options
    );
}

async function fetchCityName(lat, lon) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        if (!response.ok) throw new Error('Ошибка геокодирования');

        const data = await response.json();
        const city = data.address.city || data.address.town || data.address.village || 'Неизвестный город';

        // Теперь получаем погоду, передавая координаты и название города
        fetchWeather(lat, lon, city);
    } catch (error) {
        console.error('Ошибка получения названия города:', error);
        fetchWeather(lat, lon, 'Неизвестный город'); // продолжаем без названия
    }
}


function handleGeolocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('Пользователь отказал в доступе к геолокации');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Местоположение недоступно');
            break;
        case error.TIMEOUT:
            alert('Превышено время ожидания ответа от геолокации');
            break;
        default:
            alert('Неизвестная ошибка геолокации');
    }
}

async function fetchWeather(lat, lon, city) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&windspeed_unit=ms`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка API погоды');

        const data = await response.json();
        displayWeather(data, city); // передаём название города в отображение
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('weather-info').innerHTML = '<p>Не удалось загрузить погоду</p>';
    }
}

function displayWeather(data, city) {
    const weatherInfo = document.getElementById('weather-info');

    // Проверяем, есть ли данные о текущей погоде
    if (!data.current_weather) {
        weatherInfo.innerHTML = '<p>Данные о погоде недоступны</p>';
        return;
    }

    const current = data.current_weather;

    let windDirectionText = 'Нет данных';
    if (current.winddirection != null) {
        windDirectionText = getWindDirection(current.winddirection);
    }

    weatherInfo.innerHTML = `
    <div>Город: <strong>${city} </strong></div>
    <div>Температура: ${current.temperature} °C</div>
    <div>Скорость ветра: ${current.windspeed} м/с</div>
    <div>Направление ветра: ${windDirectionText}</div>
    <div>Погодные условия: ${getWeatherDescription(current.weathercode)}</div>
    <div>Время измерения: ${new Date(current.time).toLocaleString('ru-RU')}</div>
  `;
}

// Функция для преобразования кода погоды в текстовое описание
function getWeatherDescription(code) {
    const descriptions = {
        0: 'Ясно',
        1: 'В основном ясно',
        2: 'Переменная облачность',
        3: 'Облачно',
        45: 'Туман',
        48: 'Туман с изморозью',
        51: 'Лёгкий моросящий дождь',
        53: 'Умеренный моросящий дождь',
        55: 'Сильный моросящий дождь',
        61: 'Лёгкий дождь',
        63: 'Умеренный дождь',
        65: 'Сильный дождь',
        71: 'Лёгкий снег',
        73: 'Умеренный снег',
        75: 'Сильный снег',
        80: 'Лёгкие ливни',
        81: 'Умеренные ливни',
        82: 'Сильные ливни',
        95: 'Гроза слабая или умеренная',
        96: 'Гроза с градом',
        99: 'Сильная гроза с градом'
    };
    return descriptions[code] || 'Неизвестно';
}

function getWindDirection(degrees) {
    if (degrees == null || isNaN(degrees)) {
        return 'Нет данных';
    }

    const directions = [
        '↑ С (Север)',
        '↗ СВ (Северо-Восток)',
        '→ В (Восток)',
        '↘ ЮВ (Юго-Восток)',
        '↓ Ю (Юг)',
        '↙ ЮЗ (Юго-Запад)',
        '← З (Запад)',
        '↖ СЗ (Северо-Запад)'
    ];

    // Нормализуем значение градусов (0–360)
    const normalized = ((degrees % 360) + 360) % 360;
    // Определяем индекс направления (каждое направление занимает 45°)
    const index = Math.floor((normalized + 22.5) / 45) % 8;

    return directions[index];
}

function getWeatherByLocation() {
    getWeatherInfo();    
}

function getWeatherInfo() {
    getWeatherByLocation();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Автоматически получаем погоду при загрузке
    getUserLocation();

    setInterval(() => {
        // console.log('query success');
        getUserLocation();
    }, 300000);
});
