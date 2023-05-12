let key = "fe6df37955ad832773c369dfa58e7598";
let cityList =$("#city-list");
let cities = [];


function currentDay(date){
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dayFormat = date.getFullYear() + '/' +
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


function getResponseWeather(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 
  	
    var clear = $("#today-weather").empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        
      cityTitle = $("<h4>").text(response.name + " "+ currentDay());
      clear.append(cityTitle);
      var tempNum = parseInt((response.main.temp)* 9/5 - 459);
      var cityTemp = $("<p>").text("Tempeture: "+ tempNum + " °F");
      clear.append(cityTemp);
      var cityWS = $("<p>").text("Wind: "+ response.wind.speed + " MPH");
      clear.append(cityWS);
	  var cityHum = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      clear.append(cityHum);
      
    var CoordLongitude = response.coord.lon;
    var CoordLatitude = response.coord.lat; 
	var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
	
		
	$.ajax({
		url: queryURL3,
		method: "GET"
	}).then(function(response5day) { 
		$("#boxes").empty();
		console.log(response5day);
		for(var i=0, t=0; t<=6; i=i+6){
			var read_date = response5day.list[i].dt;
			if(response5day.list[i].dt != response5day.list[i+1].dt){
				var FivedayDiv = $("<div>");
				FivedayDiv.attr("class","col-3 m-2 bg-primary")
				var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
				d.setUTCSeconds(read_date);
				var date = d;
				console.log(date);
				var month = date.getMonth()+1;
				var day = date.getDate();
				var dayOutput = date.getFullYear() + '/' +
				(month<10 ? '0' : '') + month + '/' +
				(day<10 ? '0' : '') + day;
				var Fivedayh4 = $("<h6>").text(dayOutput);
				//Set src to the imags
				var imgtag = $("<img>");
				var skyconditions = response5day.list[i].weather[0].main;
				if(skyconditions==="Clear"){
					imgtag.attr("src",  "https://openweathermap.org/img/wn/01d@2x.png")
				} else if(skyconditions==="Clouds"){
					imgtag.attr("src","https://openweathermap.org/img/wn/03d@2x.png")
				}else if(skyconditions==="Rain"){
					imgtag.attr("src", "https://openweathermap.org/img/wn/10d@2x.png")
				}

				
				
				var temperature= response5day.list[i].main.temp;
				console.log(skyconditions);
				var tempNum = parseInt((temperature)* 9/5 - 459);
				var fTemp = $("<p>").text("Tempeture: "+ tempNum + " °F");
				var humPer = $("<p>").text("Humidity: "+ response5day.list[i].main.humidity + " %");
				FivedayDiv.append(Fivedayh4);
				FivedayDiv.append(imgtag);
				FivedayDiv.append(fTemp);
				FivedayDiv.append(humPer);
				$("#boxes").append(FivedayDiv);
				console.log(response5day);
				t++;
			}
		}
});
	 });
    
  }
