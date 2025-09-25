const dropdown = document.querySelector(".dropdown")
const getWeatherBtn = document.getElementById("get-weather-btn")
const main = document.getElementById("main")

let weatherVal;
dropdown.addEventListener("change", (e) => {
  weatherVal = e.target.value
  // console.log(weatherVal)
})

getWeatherBtn.addEventListener("click", () => { 
  // console.log(weatherVal)
  if(weatherVal === "" || weatherVal === undefined){
    return
  }
  showWeather(weatherVal)
})

async function getWeather(city) {
  try{
    let response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`)

    let resData = await response.json()
    console.log(resData)  

    return resData
  }
  catch(error){
    console.log(error)
    return undefined
  }
}

async function showWeather(city){
  try{
    if(city === "paris"){
      alert("Something went wrong, please try again later")
      return
    }
    const resData = await getWeather(city)

    if(!resData){
      alert("Something went wrong, please try again later")
      return
    }

    document.getElementById("weather-icon").src = resData.weather?.[0]?.icon || "";

    document.getElementById("main-temperature").textContent = resData.main?.temp !== undefined ? `${resData.main.temp}° C` : "N/A";

    document.getElementById("feels-like").textContent = resData.main?.feels_like !== undefined ? `Feels Like: ${resData.main.feels_like}° C` : "N/A";

    document.getElementById("humidity").textContent = resData.main?.humidity !== undefined ? `Humidity: ${resData.main.humidity}%` : "N/A";

    document.getElementById("wind").textContent = resData.wind?.speed !== undefined ? `Wind: ${resData.wind.speed} m/s` : "N/A";

    const gust = resData.wind?.gust !== undefined ? resData.wind.gust : "N/A";
    if(gust === "N/A"){
      document.getElementById("wind-gust").textContent = `Gusts: ${gust}`
    }
    else{
      document.getElementById("wind-gust").textContent = `Gusts: ${gust} m/s`
    }

    document.getElementById("weather-main").textContent = resData.weather?.[0]?.main ?? "N/A";

    document.getElementById("location").textContent = resData.name ?? "N/A";

  }

  catch(error){
    alert("Something went wrong, please try again later")
  }
}
