import React, { useEffect, useState } from 'react';
import WeatherCSS from './Weather.module.css';

function WeatherComponent() {
	const [weather, setWeather] = useState(null);
	const [city, setCity] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
		const { latitude, longitude } = position.coords;
		fetchWeather(latitude, longitude);
		fetchKakaoAddress(latitude, longitude);
		});
	}, []);

	const fetchWeather = async (lat, lon) => {
		console.log('위도:', lat, '경도:', lon);
		try {
		const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
		);
		const data = await response.json();
		setWeather(data);
		setLoading(false);
		} catch (error) {
		console.error('날씨 정보 가져오기 실패:', error);
		}
	};

	const fetchKakaoAddress = async (lat, lon) => {
		try {
		const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
		const response = await fetch(
			`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`,
			{
			headers: {
				Authorization: `KakaoAK ${KAKAO_API_KEY}`,
			},
			}
		);
		const data = await response.json();
		const region_1depth_name = data.documents[0]?.region_1depth_name;
		setCity(data.documents[0].region_2depth_name);
		} catch (error) {
		console.error('카카오 주소 가져오기 실패:', error);
		}
	};

	return (
		<div className={WeatherCSS.weatherBox}>
		{loading ? (
			<p>날씨 불러오는 중...</p>
		) : (
			<>
			<p className={WeatherCSS.title}><b>{city}</b>의 실시간 날씨</p>
			{weather.weather?.[0]?.icon && (
				<img
				className={WeatherCSS.weatherIcon}
				src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
				alt={weather.weather[0].description}
				/>
			)}
			<p className={WeatherCSS.description}>{weather.weather?.[0]?.description}</p>
			<p className={WeatherCSS.temp}>{weather.main?.temp}℃</p>
			<p className={WeatherCSS.feels}>( 체감 {weather.main?.feels_like}℃ )</p>
			<div className={WeatherCSS.weather}>
			<p>습도: {weather.main?.humidity}%</p>
			{weather.rain?.['1h'] && <p>강수량: {weather.rain['1h']} mm (1시간)</p>}
			<p>최고: {weather.main?.temp_max}℃</p>
			<p>최저: {weather.main?.temp_min}℃</p>
			<p>풍속: {weather.wind?.speed} m/s</p>
			</div>
			</>
		)}
		</div>
	);
}

export default WeatherComponent;