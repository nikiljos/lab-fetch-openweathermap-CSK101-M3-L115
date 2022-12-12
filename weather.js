//Complete the Weather API Backend part using openweathermap api

let $error=document.getElementById("error")
let $content = document.querySelector(".content");
let $locationInput=document.getElementById("location-input")
let $search = document.getElementById("search");

let $place = document.getElementById("place");
let $time = document.getElementById("time");
let $tempFull = document.getElementById("temp-full");
let $tempVal = document.getElementById("temp");
let $desc = document.getElementById("desc");
let $highLow = document.getElementById("high-low");

if (typeof owmApiKey != "string") {
    $content.style.display="";
    let error = "Missing API Key! Refer 'env.sample.js' file for more info...";
    $error.innerHTML = `<h2>🚧🚧 Sorry, Some Error Occured 🚧🚧</h2><code>${error}</code>`;
    throw error;
}

// Progression 1: Create a function and fetch data using "fetch" from openweathermap api and display the data as given in reference image.
function getWeather(){
    $error.innerText=""
    let location=$locationInput.value
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${owmApiKey}`
    ).then(res=>{
        if(res.status==404){
            throw({message:"Invalid City Name"})
        }
        else if(!res.ok){
            throw({message:"HTTP Error"})
        }
        return res.json();
    })
    .then(data=>{
        // console.log(data)
        $content.style.display = "block";
        $place.innerText=`${data.name}, ${data.sys.country}`;
        $time.innerText=new Date(data.dt*1000).toDateString()
        $tempVal.innerText = celsius(data.main.temp);
        $desc.innerText=data.weather[0].main
        $highLow.innerText = `${celsius(data.main.temp_min)}°C / ${celsius(data.main.temp_max)}°C`;
        // $tempFull.style.visibility="visible"
    })
    .catch(err=>{
        $content.style.display="";
        $error.innerHTML = `<div class="error"><h2>🚧🚧 Sorry, Some Error Occured 🚧🚧</h2><code>${err.message}</code></div>`;
    })
}

function celsius(kelvin){
    return Math.floor(kelvin - 273.15)
}

$search.onclick=getWeather