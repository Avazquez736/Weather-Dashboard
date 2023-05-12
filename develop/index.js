let key = "fe6df37955ad832773c369dfa58e7598";
let cityList =$("#city-list");
let cities = [];

function currentDay(date){
    var date = new Date();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let dayFormat = date.getFullYear() + '/' +
        (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day;
    return dayFormat;
}


function storeCities(){
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}

function init(){
    let storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
      }

    renderCities();
}

init();

function renderCities() {
    // Clear cityList element
    // cityList.text = "";
    // cityList.HTML = "";
    cityList.empty();
    
    // Render a new li for each city
    for (let i = 0; i < cities.length; i++) {
      var city = cities[i];
      
      let li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      console.log(li);
      cityList.prepend(li);
    }
    if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
} 

