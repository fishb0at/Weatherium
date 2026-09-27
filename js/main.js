let temp = document.getElementById("temp");
let weather = document.getElementById("weather");
let desc = document.getElementById("desc");
let max = document.getElementById("max");
let min = document.getElementById("min");
let feelslike = document.getElementById("feelslike");
let forecast1 = document.getElementById("forecast1");
let forecast2 = document.getElementById("forecast2");
let forecast3 = document.getElementById("forecast3");
let forecast4 = document.getElementById("forecast4");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let visibility = document.getElementById("visibility");
let today = new Date();
let hour1 = document.getElementById("hour1");
let hour2 = document.getElementById("hour2");
let hour3 = document.getElementById("hour3");
let hour4 = document.getElementById("hour4");
//console.log(today);

let monthNow = today.getMonth() + 1;
let dateNow = today.getDate();
let yearNow = today.getFullYear();
document.getElementById("date").innerHTML = yearNow + "." + monthNow + "." + dateNow;

function onSuccess(position) {
 console.log(position);
 let myLat = position.coords.latitude;
 let myLon = position.coords.longitude;

 makeRequest(
  "https://api.openweathermap.org/data/2.5/weather?lat=" +
   myLat +
   "&lon=" +
   myLon +
   "&appid=9e1f7f3f2c4a5df4e035c40c71227aee",
  handleWeatherResponse
 );
 makeRequest(
  "https://api.openweathermap.org/data/2.5/forecast?lat=" +
   myLat +
   "&lon=" +
   myLon +
   "&appid=565d3b4c9ee0ec68e9470ec1f5590975",
  handleForecastResponse
 );
}

function onError(error) {
 alert("code: " + error.code + "\n" + "message: " + error.message);
}

navigator.geolocation.getCurrentPosition(onSuccess, onError);

let makeRequest = (url, callback) => {
 let httpRequest = new XMLHttpRequest();

 if (!httpRequest) {
  alert("Giving up :( Cannot create an XMLHTTP instance");
  return false;
 }

 httpRequest.onreadystatechange = function () {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
   if (httpRequest.status === 200) {
    let result = JSON.parse(httpRequest.responseText);
    console.log(result);

    callback(result);
   } else {
    alert("There was a problem with the request");
   }
  }
 };

 httpRequest.open("GET", url);
 httpRequest.send();
};

function handleWeatherResponse(result) {
 let weatherTemp = result.main.temp - 273.15;
 weatherTemp = Math.round(weatherTemp);
 temp.innerHTML = weatherTemp + "&deg; C";

 let weatherData = result.weather[0].main;
 weather.innerHTML = weatherData;
 terrariumChange(weatherData);
 iconChange(weatherData);

 let weatherMax = result.main.temp_max - 273.15;
 weatherMax = Math.round(weatherMax);
 max.innerHTML = weatherMax + "&deg; C";

 let weatherMin = result.main.temp_min - 273.15;
 weatherMin = Math.round(weatherMin);
 min.innerHTML = weatherMin + "&deg; C";

 let weatherFeelslike = result.main.feels_like - 273.15;
 weatherFeelslike = Math.round(weatherFeelslike);
 feelslike.innerHTML = weatherFeelslike + "&deg; C";

 let weatherWind = result.wind.speed;
 //weatherWind = Math.round(weatherWind);
 wind.innerHTML = (weatherWind * 3.6).toFixed(1);

 let weatherHumidity = result.main.humidity;
 weatherHumidity = Math.round(weatherHumidity);
 humidity.innerHTML = weatherHumidity;

 let weatherPressure = result.main.pressure;
 pressure.innerHTML = weatherPressure;

 let weatherVisibility = result.visibility / 1000;
 visibility.innerHTML = weatherVisibility;
}

//start of code from https://stackoverflow.com/questions/62239945/how-to-method-to-change-html-background-according-to-api-result-value
function terrariumChange(weather) {
 var imgs = document.getElementById("terrarium-img");

 imgs.src = "img/terrarium.png";

 if (weather == "Rain") {
  imgs.src = "img/rainy.png";
 } else if (weather == "Clouds") {
  imgs.src = "img/cloudy.png";
 } else if (weather == "Snow") {
  imgs.src = "img/snowy.png";
 }
}
function iconChange(weather) {
 var imgs = document.getElementById("icon");

 imgs.src = "https://openweathermap.org/img/wn/02d@2x.png";

 if (weather == "Rain") {
  imgs.src = "https://openweathermap.org/img/wn/09d@2x.png";
 } else if (weather == "Clouds") {
  imgs.src = "https://openweathermap.org/img/wn/03d@2x.png";
 } else if (weather == "Snow") {
  imgs.src = "https://openweathermap.org/img/wn/13n@2x.png";
 } else if (weather == "Mist") {
  imgs.src = "https://openweathermap.org/img/wn/50d@2x.png";
 } else if (weather == "Snow") {
  imgs.src = "https://openweathermap.org/img/wn/13n@2x.png";
 } else if (weather == "Clear") {
  imgs.src = "https://openweathermap.org/img/wn/01d@2x.png";
 }
 
}
//end of code from https://stackoverflow.com/questions/62239945/how-to-method-to-change-html-background-according-to-api-result-value

function handleForecastResponse(result) {
 console.log("Forecast Data:", result);
 let forecastTemp1 = result.list[4].main.temp - 273.15;
 forecastTemp1 = Math.round(forecastTemp1);
 forecast1.innerHTML = forecastTemp1 + "&deg; C";

 let forecastTemp2 = result.list[12].main.temp - 273.15;
 forecastTemp2 = Math.round(forecastTemp2);
 forecast2.innerHTML = forecastTemp2 + "&deg; C";

 let forecastTemp3 = result.list[20].main.temp - 273.15;
 forecastTemp3 = Math.round(forecastTemp3);
 forecast3.innerHTML = forecastTemp3 + "&deg; C";

 let forecastTemp4 = result.list[28].main.temp - 273.15;
 forecastTemp4 = Math.round(forecastTemp4);
 forecast4.innerHTML = forecastTemp4 + "&deg; C";
 
 
 document.getElementById("getHourlyButton").addEventListener("click", function() {
 let hourTemp1 = result.list[1].main.temp - 273.15;
    hourTemp1 = Math.round(hourTemp1);
    document.getElementById("hour1").innerHTML = hourTemp1 + "&deg; C →";

    let hourTemp2 = result.list[2].main.temp - 273.15;
    hourTemp2 = Math.round(hourTemp2);
    document.getElementById("hour2").innerHTML = hourTemp2 + "&deg; C →";

    let hourTemp3 = result.list[3].main.temp - 273.15;
    hourTemp3 = Math.round(hourTemp3);
    document.getElementById("hour3").innerHTML = hourTemp3 + "&deg; C →";

    let hourTemp4 = result.list[4].main.temp - 273.15;
    hourTemp4 = Math.round(hourTemp4);
    document.getElementById("hour4").innerHTML = hourTemp4 + "&deg; C";
});
}

function getWeather() {
 let city = document.getElementById("cityInput").value;

 if (!city) {
  alert("Please type in city name!");
  return;
 }
 makeRequest(
  "https://api.openweathermap.org/data/2.5/weather?q=" + 
  city +
  "&appid=9e1f7f3f2c4a5df4e035c40c71227aee",handleWeatherResponse);
 makeRequest(
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=565d3b4c9ee0ec68e9470ec1f5590975",handleForecastResponse);
}

