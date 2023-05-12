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


function logCities(){
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(localStorage);
}



function cityCreate() {
  
    cityList.empty();
    
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

$("#add-city").on("click", function(event){
	event.preventDefault();

  // This line will grab the city from the input box
  var city = $("#city-search").val().trim();
  
  // Return from function early if submitted city is blank
  if (city === "") {
	  return;
  }
  //Adding city-input to the city array
  cities.push(city);
  // Store updated cities in localStorage, re-render the list
logCities();
cityCreate();
});


function init(){
    let storedCities = JSON.parse(localStorage.getItem("cities"));

    if (storedCities !== null) {
        cities = storedCities;
      }

    cityCreate();
}

init();
