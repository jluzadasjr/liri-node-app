require("dotenv").config();

//required variables
var keys = require("./keys.js");  
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


//argument arrays
var argv = process.argv;

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: env.SPOTIFY_ID,
    secret: env.SPOTIFY_SECRET
    
});

//variables that grabs arguments
var command = process.argv[2]; 
var clientArray = [];

//For loop to combine word arguments 
for (var i = 3; i < argv.length; i++){
  if (i>3 && i>argv.length) {
    clientArray = clientArray + "+" + argv[i]; 
  } else {
    clientArray = clientArray + argv[i]; 
  }
}

//Combined search query to creat string for any search that is being input 
var search = argv.join(""); 

//Switch statement
switch (command) {
  case 'spotify-this-song':
  spotifySong()
      break;
  case 'concert-this':
      concertThis()
      break;
  case 'movie-this':
      movieThis()
      break;
  case 'do-what-it-says':
      dowhatitSays2()
      break;
  default:
      console.log("No type value found");

//   1. `node liri.js concert-this <artist/band name here>`
      function concertThis() {

        var artist = ""; 
        bandsArgv = process.argv;
        if (input === undefined){
            artist = "The Internet"
        } else {
            for (var i = 3; i < bandsArgv.length; i++){
                artist += bandsArgv[i];
            }
        }
        axios.get("https://rest.bandsintown.com/artists/" + artist +"/events?app_id=codingbootcamp").then(
      function(response) {
        var result = response.data[0];
        console.log("You searched for: "+ artist);
        console.log("Venue: "+result.venue.name);
        console.log("Location: "+result.venue.city);
        console.log(moment(result.datetime).format('MM-DD-YY'));
    
        })
    }    }
// 2. `node liri.js spotify-this-song '<song name here>'`
function spotifySong() {
  if (search === "") {
    search = "kanye+west+gold+digger"
}

spotify.search({
    type: 'artist,track',
    query: search
}, function (err,data) {require("dotenv").config();

var keys = require("./keys.js");  
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var request = process.argv[2]; 
var input = process.argv[3]; 


function searchSong(){
    var songArgv = process.argv;
    input = input + "+";
    if (input === undefined){
      input ="TKanye West Gold Digger";
    } else {
      for (var i = 4; i < songArgv.length; i++){
        input += songArgv[i] + "+";
      }
    } 
     
    spotify.search({ type: 'track', query: input, limit:1 }, function(err, data) {
      if (err) {
        return console.log('Error: ' + err);
      }
     
      console.log(input);
      var search = data.tracks.items;
      console.log("Artist: "+search[0].artists[0].name)
      console.log("Song Name: "+search[0].name);
      console.log("Check out a Preview: "+JSON.stringify(search[0].external_urls));
      console.log("Album: "+search[0].album.name);
      }
    );
}

    function bandsintown() {
        if (search === "") {
            console.log('\n')
            console.log("Artist not entered. Please enter Artist name")
            console.log('\n')
        } else {
            axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
            function (response) {
               if(response.data.length <= 0) {
                   console.log("Artist information unavailable")
               } else {
                for (var i=0; i < response.data.length; i++) {
    
                    var concertData = `\n
        Venue: ${response.data[i].venue.name}
        Location: ${response.data[i].venue.city + ", " + response.data[0].venue.region}
        Event Date: ${moment(response.data[i].datetime).format('MM-DD-YY')}
                `
                console.log(concertData)
                }
               }
               
                dataLog(concertData)
            }
        );
        }
    }

// 3. `node liri.js movie-this '<movie name here>'`
    function movieThis(){
        var movieTitle = '';
        var movieArgv = process.argv;
        
        if(input === undefined){
        // if there is not a movie name entered
          movieTitle = 'Mr.'+ "+" +"Nobody";  
        }  else {
        // or else this will take movie names with 1 or more words
          for (var i = 3; i < theArg.length; i++){
              movieTitle += movieArgv[i]+ "+";
          }
        }
        
        var url = "http://www.omdbapi.com/?t="+ movieTitle +"&y=&plot=short&apikey=trilogy";
        // Axios request to the OMDB API with the movie specified
        axios.get(url)
        .then(
          function(response) {
            
            console.log("Title: "+response.data.Title);
            console.log("Year: "+response.data.Year);
            console.log("IMDB Rating: "+response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: "+response.data.Ratings[0].Value);
            console.log("Country of Origin: "+response.data.Country);
            console.log("Language: "+response.data.Language);
            console.log("Plot: "+response.data.Plot);
            console.log("Actors :"+response.data.Actors);
            }
          );
        }

// 4. `node liri.js do-what-it-says`
function dowhatitSays(){
    
    fs.readFile("log.txt", "utf8", function(error,data){
        if (error) {
            return console.log(error);
        } 
        
        var command = data.split(',');
             
          
              request = command[0];
              input = command[1];

              confirmCommand();
            });
          }
          function confirmCommand(){

            if(request == "spotify-this-song"){
              searchSong();
            }else if(request === 'movie-this'){
              movieThis();
            } else if(request === 'concert-this'){
              bandsintown();
            }else if (request === 'do-what-it-says'){
              dowhatitSays();
            } else {
              console.log("Your command is invalid!");
            }
            
            }
            confirmCommand();
            if (err) {
                return console.log('Error: ' + err);
            }
            console.log('\n')
    
            var artistData = `\n
                Artist: ${data.tracks.items[0].artists[0].name}
                Track: ${data.tracks.items[0].name}
                Preview: ${data.tracks.items[0].preview_url}
                Album: ${data.tracks.items[0].album.name}
                `
                    console.log(artistData)
                            dataLog(artistData)
        }
    );
}

// node liri.js do-what-it-says - created another function

function dowhatitSays2 () {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }

        var dataArr = data.split(",");
      
        searchLast = dataArr[1];
        spotifySong()
      });
}


