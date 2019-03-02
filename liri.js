// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();


//require variables 
var axios = require("axios");
var keys = require("./keys.js");
var fs = require("fs");
var util = require("util");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//argument variables
var input = process.argv[2];
var search = process.argv.slice(5);

//Combined search query to create string for any search that is being input 
var artist = search.join("");


// function to use following command: node liri.js movie-this
var movieThis = function() {
  
    if (search.length == 0 || search == null){
        search = "Mr Nobody";
    }
  axios.get("http://omdbapi.com/?t=" + search + "&apikey=trilogy").then(
    function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);
      if (!response.data.Ratings[1]) {
        console.log("RT Rating not avaliable");
      } else {
        console.log("RT Rating: " + response.data.Ratings[1].Value);
      }
      console.log("Country Produced in: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Cast: " + response.data.Actors);
      console.log("Plot: " + response.data.Plot);
      console.log("----------------------------");
    }
  );
};


// function to use following command: node liri.js concert-this
var concertThis = function() {
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
        if (response.data[0].lineup === undefined){
            console.log("No information available.")
        } else {

            console.log("Artist: "+response.data[0].lineup);
            console.log("Venue name: "+response.data[0].venue.name);
            console.log("Location: "+response.data[0].venue.city +", "+ response.data[0].venue.country);
            venueDate = response.data[0].datetime;
            formatDate = moment(venueDate).format("MM/DD/YYYY");
            console.log("Date: "+formatDate);
            console.log("----------------------------");
        }     
    });
};


// function to use following command: node liri.js spotify-this-song
var spotifyThis = function(search) {
    if (search === undefined || search.length == 0) {
      search = "Ace of Base";
    }
    spotify.search({ type: "track", query: search, limit: 1 }, function(err,data) {
      
    if (err) {
      console.log(err);
    }
    console.log("Artist: " + JSON.stringify(data.tracks.items[0].artists[0].name));
    
    console.log("Song: " + JSON.stringify(data.tracks.items[0].name));

    if (data.tracks.items[0].preview_url === null) {
        console.log("Preview Link: No preview avaliable.");
    } else {
        console.log("Preview Link: " + JSON.stringify(data.tracks.items[0].preview_url));
        } 
        console.log("Album: " + JSON.stringify(data.tracks.items[0].album.name));

    });
}

// If/else statement for user input
if (input === "spotify-this-song") {
  spotifyThis(search);
} else if (input === "movie-this") {
  movieThis(search);
} else if (input === "concert-this") {
  concertThis(search);

//node liri.js do-what-it-says
} else if(input === "do-what-it-says"){
    fs.readFile("./random.txt", "utf8", function read(err,data){
        if (err) {
            console.log(err);
        }
        
        var splitData = data.split(",");
        input = splitData[0];
        search = splitData[1];

        if(input === "spotify-this-song") {
            spotifyThis(search);
          } else if (input === "movie-this") {
            movieThis(search);
          } else if (input === "concert-this") {
            concertThis(search);
        }
    })
}



// Logs the data into log.txt 
var log = fs.createWriteStream(__dirname + "/log.txt", {flags: "a"});
var stdout = process.stdout;

console.log = function(x){
    log.write(util.format(x)+"\r\n");
    stdout.write(util.format(x)+"\r\n");
}