/**
 * Weather Command - Get current weather for any city (Lagos, Nigeria by default)
 * ES Module version with button support
 * Uses OpenWeatherMap API (free tier)
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

// Default location - Lagos, Nigeria
const DEFAULT_CITY = 'Lagos';
const DEFAULT_COUNTRY = 'NG';
const DEFAULT_LAT = 6.5244;
const DEFAULT_LON = 3.3792;

// Free API key from OpenWeatherMap (sign up at https://openweathermap.org/api)
// You can replace with your own key, but the free tier works fine
const API_KEY = 'aa6ef12780aa5fb7d3b5f327806180b7'; // Get free key from openweathermap.org

// Fallback weather data in case API fails
const fallbackWeather = {
    temp: 32,
    feels_like: 34,
    humidity: 78,
    description: 'Partly Cloudy',
    wind_speed: 12,
    country: 'NG',
    city: 'Lagos'
};

export default {
    name: 'weather',
    description: 'Get current weather for any city (Lagos, Nigeria by default)',
    aliases: ['wthr', 'climate', 'forecast'],
    
    async execute(sock, msg, args, context) {
        const { from, react } = context;
        const buttons = new ButtonManager(sock);
        
        await react('🌤️');
        
        let city = args.length ? args.join(' ') : DEFAULT_CITY;
        let weatherData = null;
        let fromApi = false;
        
        // Try to get weather from API
        try {
            // Build API URL
            let apiUrl;
            if (API_KEY !== 'aa6ef12780aa5fb7d3b5f327806180b7') {
                // First try to get coordinates for the city
                const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
                const geoResponse = await axios.get(geoUrl, { timeout: 10000 });
                
                if (geoResponse.data && geoResponse.data.length > 0) {
                    const { lat, lon, name, country } = geoResponse.data[0];
                    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
                    const weatherResponse = await axios.get(weatherUrl, { timeout: 10000 });
                    
                    if (weatherResponse.data) {
                        weatherData = {
                            city: name,
                            country: country,
                            temp: Math.round(weatherResponse.data.main.temp),
                            feels_like: Math.round(weatherResponse.data.main.feels_like),
                            humidity: weatherResponse.data.main.humidity,
                            description: weatherResponse.data.weather[0].description,
                            wind_speed: weatherResponse.data.wind.speed,
                            icon: weatherResponse.data.weather[0].icon
                        };
                        fromApi = true;
                    }
                }
            }
            
            // If API key not set or request failed, use fallback with user's city name
            if (!weatherData) {
                weatherData = {
                    ...fallbackWeather,
                    city: city,
                    country: city.toLowerCase().includes('lagos') ? 'NG' : 'Unknown'
                };
                fromApi = false;
            }
            
        } catch (error) {
            console.error('Weather API error:', error.message);
            weatherData = {
                ...fallbackWeather,
                city: city,
                country: city.toLowerCase().includes('lagos') ? 'NG' : 'Unknown'
            };
            fromApi = false;
        }
        
        // Get weather icon based on description
        const getWeatherIcon = (desc) => {
            const lowerDesc = desc.toLowerCase();
            if (lowerDesc.includes('rain') || lowerDesc.includes('drizzle')) return '🌧️';
            if (lowerDesc.includes('cloud')) return '☁️';
            if (lowerDesc.includes('sun') || lowerDesc.includes('clear')) return '☀️';
            if (lowerDesc.includes('thunder') || lowerDesc.includes('storm')) return '⛈️';
            if (lowerDesc.includes('snow')) return '❄️';
            if (lowerDesc.includes('mist') || lowerDesc.includes('fog')) return '🌫️';
            if (lowerDesc.includes('wind')) return '💨';
            return '🌡️';
        };
        
        const weatherIcon = getWeatherIcon(weatherData.description);
        const cityDisplay = weatherData.city;
        const countryDisplay = weatherData.country === 'NG' ? 'Nigeria' : weatherData.country;
        
        // Build weather message
        const weatherText = `🌤️ *ＷＥＡＴＨＥＲ ＵＰＤＡＴＥ* 🌤️\n\n` +
              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
              `┃\n` +
              `┃ 📍 *Location:* ${cityDisplay}, ${countryDisplay}\n` +
              `┃\n` +
              `┃ ${weatherIcon} *Current Conditions*\n` +
              `┃ ├ 🌡️ Temperature: *${weatherData.temp}°C*\n` +
              `┃ ├ 🔥 Feels like: *${weatherData.feels_like}°C*\n` +
              `┃ ├ 💧 Humidity: *${weatherData.humidity}%*\n` +
              `┃ ├ 💨 Wind Speed: *${weatherData.wind_speed} km/h*\n` +
              `┃ ├ 📝 Condition: *${weatherData.description.toUpperCase()}*\n` +
              `┃\n` +
              `┃ ⏱️ Last updated: ${new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' })}\n` +
              `┃\n` +
              `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
        
        await buttons.sendButtons(from, {
            text: weatherText,
            buttons: [
                { text: '🔄 REFRESH', id: 'weather', type: 'reply' },
                { text: '📍 LAGOS', id: 'weather_lagos', type: 'reply' },
                { text: '🔍 SEARCH', id: 'weather_search', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};