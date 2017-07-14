console.log('this is loaded');

//REQUIRES STORED IN VARIABLES s
var fs = require('fs');
var keys = require('./keys.js');
var twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');
var liriRequestedItem = "";




//FUNCTION FOR TWITTER

function mytweets() {

	var client = new twitter(keys.twitterKeys);
	var params = {screen_name: 'MuslimIQ', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			return console.log (error);
		}

		console.log('\n********************************************************************************');
		console.log('Screen Name: ' + tweets[0].user.screen_name, 
					'\nLocation: ' + tweets[0].user.location, 
					'\nDescription: ' + tweets[0].user.description);
		console.log('\n********************************************************************************');

		for (var i = 0; i < tweets.length; i++) {
			tweets[i];

		console.log('\n================================================================================');
   		console.log('\nDate created: ' + tweets[i].created_at + '\nTweet: ' + tweets[i].text)			
		}		  		  	
	});
	}

 // FUNCTION FOR SPOTIFY.

function spotThatFy(songName) {

 	var spotify = new Spotify(keys.spotifyKeys);
 	//spotThatFy doen't care where the song name is coming from. You determine where the songName comes from wherever you call the function. 

 	songName = songName || 'Ace of Base The Sign';
	

	spotify.search({ type: 'track', query: songName, limit: 1}, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
  		}
  		var artistName = data.tracks.items[0].artists[0].name;
	  	var songName = data.tracks.items[0].name;
  		var previewLink = data.tracks.items[0].preview_url;
  		var albumName = data.tracks.items[0].album.name;

		console.log('\n********************************************************************************');
  		console.log('Artist: ' + artistName,
  					'\nSong Name: ' + songName, 
  					'\nPreview Link: ' + previewLink, 
  					'\nAlbum Name: ' + albumName);
		console.log('********************************************************************************');
 	});
	}


 //FUNCTION FOR MOVIES...and "Because I'm not a regular mom, I'm a cool mom!..." I made the default movie "Mean Girls,"

function movieInfo() {

 	var movieName = process.argv[3] || "Mean Girls";
 	var key = keys.omdbKeys.api_key;
 	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + key;

 	request(queryUrl, function(error, response, body) {
 		if(error) {
 			return console.log(error);
 		}
 		if (!error && response.statusCode === 200) {
 			body = JSON.parse(body)
	 		var movieTitle = body.Title;
	 		var movieYear = body.Year;
	 		var imdbRating = body.Ratings[0].Value;
	 		var rottenTomatoesRating = body.Ratings[1].Value;
	 		var country = body.Country;
	 		var language = body.Language;
	 		var plot = body.Plot;
	 		var actors = body.Actors;

	 		console.log('********************************************************************************');
 			console.log('\nTitle: '+ movieTitle, 
 						'\nYear: ' + movieYear, 
 						'\nIMBD Rating: ' + imdbRating, 
 						'\nRotten Tomatoes Rating: ' + rottenTomatoesRating, 
 						'\nProduction Country: ' + country, 
 						'\nMovie Language: ' + language, 
 						'\nPlot: ' + plot, 
 						'\nActors: ' + actors);
 			console.log('********************************************************************************');
 		}
 	});
 }	


//FUNCTION FOR DO WHAT IT SAYS
function doIt() {

		fs.readFile("random.txt", "utf8", function(err, data) {
			if (err) { console.log(err);}

			else {
				var listItem = data.split(",")
				var index1 = listItem[1];
		   		console.log(index1);
		   		spotThatFy(index1);
		   	}
		});
}	
		
	
	   			

var action = process.argv[2];

 switch (action) {
    case 'my-tweets':
        mytweets();
        break;

    case 'spotify-this-song':
        spotThatFy(process.argv[3]);
        break;

    case 'movie-this':
        movieInfo();
        break;

    case 'do-what-it-says':
        doIt();
        break;
  };





     

     
     



 




