var stuffIneed = require("./key.js");
var twitter = require("twitter");
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs")
//store command of array

var action = process.argv[2]
var nodeArgs = process.argv;

var a = "";


for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    a = a + "+" + nodeArgs[i];
  }
  else {
    a += nodeArgs[i];
  }
}

//=========================SWITCH=========================

switch(action){
  case "my-tweets":tweet();
  break;

  case "spotify-this-song":
    if(a){
      spotifySong(a);
    } else{
      spotifySong("The Sign");
    }
  break;

  case "movie-this":
    if(a){
      OmdbData(a);
    } else{
      OmdbData("Mr. Nobody")
    }
  break;

  case "do-what-it-says":dootherthings();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}
//=============================TWITTER======================================
var twitter = require('twitter')
function tweet(){

  var client = new twitter({
    consumer_key: stuffIneed.consumer_key,
    consumer_secret: stuffIneed.consumer_secret,
    access_token_key: stuffIneed.access_token_key,
    access_token_secret: stuffIneed.access_token_secret,

  });

    var params = {screen_name: "rainyhoang", count: 20};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          for(var i = 0; i<tweets.length; i++){
            var date = tweets[i].created_at;
                   console.log("Rain Hoang: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                   console.log("-----------------------");

          }
        }
        else {
          console.log(error)
        }

    });
}
//
// ---------------------------------SPOTIFY------------------------------


function spotifySong(song){

  var spotify = new Spotify({
  id: "96b5920f93df4fb8a65d963d69fe4ebd",
  secret: "263061cdddbc412eadba1822e3ca5f23"
  });


    spotify.search({ type: 'track', query: song}, function(error, data){
        if(!error){
          for(var i = 0; i < data.tracks.items.length; i++){
            var songData = data.tracks.items[i];
            //artist
            console.log("Artist: " + songData.artists[0].name);
            //song name
            console.log("Song: " + songData.name);
            //spotify preview link
            console.log("Preview URL: " + songData.preview_url);
            //album name
            console.log("Album: " + songData.album.name);
            console.log("-----------------------");

          }
        } else{
          console.log(error);
        }
      });
};


//============================OMDB========================================
function OmdbData(movie){
  var omdbURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
console.log(omdbURL)
  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("-----------------------");

      console.log("Release Year: " + body.Year);
      console.log("-----------------------");

      console.log("IMdB Rating: " + body.imdbRating);
      console.log("-----------------------");

      console.log("Country: " + body.Country);
      console.log("-----------------------");

      console.log("Language: " + body.Language);
      console.log("-----------------------");

      console.log("Plot: " + body.Plot);
      console.log("-----------------------");

      console.log("Actors: " + body.Actors);

    } else{
      console.log(error)
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

    }
  });
};
//===============READ THE TEXT FILE========================================

function dootherthings(){
    fs.readFile("random.txt", "utf8", function(data, error) {

          if (error) {
            return console.log(error);
          }

          var dataArr = data.split(",");
          spotifySong(data[1]);
          console.log(dataArr);
          console.log(spotifySong);
    })
    };
