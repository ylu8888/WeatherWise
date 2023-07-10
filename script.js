document.addEventListener('DOMContentLoaded', () => {
    const APIKey = '6f56075cf47c4161d5d6943ae8794045';

    const search = document.querySelector('#search-button');
    const container = document.querySelector('.container');
    const weatherBox = document.querySelector('.weather-box');
    const details = document.querySelector('.weather-details');
    const error = document.querySelector('.not-found');

    //when button is clicked or the user presses enter
    document.querySelector('.searchform').onsubmit = (event) => {
        event.preventDefault(); //prevent page refresh on form submission
        const input = document.querySelector('.search-box input').value; //get user search input

        if(input === ''){ //if nothing is in search bar just return
            return;
        }

        //fetch the api data with the respective location from input
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${APIKey}`)
        .then(response => response.json()) //convert to json format
        .then(data => { //data is just a variable name for the json

            //if location is invalid, display the error img
            if(data.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display ='none';
                error.style.display = 'block';
                error.classList.add('fadeIn');
                return;
            }

            //remove previous error
            error.style.display = 'none';
            error.classList.remove('fadeIn');
            
            const image = document.querySelector('.weather-box img');
            const temp = document.querySelector('.weather-box .temperature');
            const descript = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            //gets the weather and changes icon accordingly
            const weather = data.weather[0].main; 
            if (weather === 'Clear') {
                image.src = 'images/clear.png';
            } 

            else if (weather === 'Rain') {
                image.src = 'images/rain.png';
            } 

            else if (weather === 'Snow') {
                image.src = 'images/snow.png';
            } 

            else if (weather === 'Clouds') {
                image.src = 'images/cloud.png';
            } 

            else if (weather === 'Mist') {
                image.src = 'images/mist.png';
            } 

            else {
                image.src = '';
            }

            //convert C to F 
            const fahren = parseInt(data.main.temp) * 9/5 + 32; 
            //change the html to data from API
            temp.innerHTML = `${Math.ceil(fahren.toFixed(0))}<span>°F</span>`; //round up and no decimals
            descript.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`
            wind.innerHTML = `${parseInt(data.wind.speed)} km/h`;
            
            weatherBox.style.display = '';  //the '' just resets the css to default 
            details.style.display = '';
            weatherBox.classList.add('fadeIn');   //fade and display the new weather data
            details.classList.add('fadeIn');
            container.style.height = '590px';
            

        });
        
    }
    

});
