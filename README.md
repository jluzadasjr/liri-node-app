# liri-node-app




# What each command will do
1. `node liri.js concert-this <artist/band name here>`
Display the results of an artist and display the following: 

* Name of the venue

* Venue location

* Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`
Displays the results information. If no song is entered, then "The Sign" by Ace of Base will show up. 

* Artist(s)

* The song's name

* A preview link of the song from Spotify

* The album that the song is from

3. `node liri.js movie-this '<movie name here>'`

Displays the following movie information. If no movie is entered, then the terminal will output data for the movie 'Mr. Nobody.'

```
* Title of the movie.
* Year the movie came out.
* IMDB Rating of the movie.
* Rotten Tomatoes Rating of the movie.
* Country where the movie was produced.
* Language of the movie.
* Plot of the movie.
* Actors in the movie.
```

4. `node liri.js do-what-it-says`

* When using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

* It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
