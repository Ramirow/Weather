window.addEventListener("load",() => {
let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');
let temperatureSection = document.querySelector('.temperature')
let temperatureSpan = document.querySelector('.temperature  span')


if (navigator.geolocation ){
navigator.geolocation.getCurrentPosition(position => {
long = position.coords.longitude;
lat =  position.coords.latitude;
const proxy = 'https://cors-anywhere.herokuapp.com/' 
const api = `${proxy}https://api.darksky.net/forecast/5a5693aadb561f1853a131b2eafdbbe8/${lat},${long}`

fetch(api)
     .then(response => {
      return response.json();

     })
     .then( data => {
      //console.log(data);
      const {temperature , summary,icon} = data.currently;
      temperatureDegree.textContent = temperature;
      temperatureDescription.textContent = summary;
      locationTimezone.textContent =  data.timezone;
      //CELSIUS FORMUAL 
      let celsius = Math.floor((temperature - 32)*(5/9)); 
      // SET ICONS
      setIcons(icon,document.querySelector(".icon"));

      temperatureSection.addEventListener("click",() => {
      if (temperatureSpan.textContent === "F"){
        temperatureSpan.textContent = "C";
        temperatureDegree.textContent = celsius;
      }else {
        temperatureSpan.textContent = "F"
        temperatureDegree.textContent = temperature;
        }      
      });
    }); 
});    
}
function setIcons(icon,iconID){
const skycons = new Skycons({color:"white"});
const currentIcon = icon.replace(/-/g,"_").toUpperCase();
skycons.play();
return skycons.set(iconID,Skycons[currentIcon]);


}
});    






