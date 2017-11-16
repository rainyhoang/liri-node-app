var stuffINeed = require("./key.js");
var twitter = require("twitter");
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs")
//store command of array

var action = process.argv[2]
var nodeArgs = process.argv;

var a = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    a = a + "+" + nodeArgs[i];
  }
  else {
    a += nodeArgs[i];
  }
}



switch(action){
  case "my-tweets":tweet();
  break;

  case "spotify-this-song":
    if(a){
      spotifySong(a);
    } else{
      spotifySong("Ace of Base");
    }
  break;

  case "movie-this":
    if(a){
      omdbData(a)
    } else{
      omdbData("Mr. Nobody")
    }
  break;

  case "do-what-it-says":
    dootherthings();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}


// get twitt from twitter


// var client = new twitter({
  // consumer_key: stuffIneed.twitterKeys.consumer_key,
  // consumer_secret: '',
  // access_token_key: '',
  // access_token_secret: ''

  var twitter = require('twitter')
  var client = new twitter({
    // consumer_key: stuffIneed.twitterKeys.consumer_key,
    // consumer_secret: stuffIneed.twitterKeys.consumer_secret,
    // access_token_key: stuffIneed.twitterKeys.access_token_key,
    // access_token_secret: stuffIneed.twitterKeys.access_token_secret,
    consumer_key: 'rE06R7d4t9ats8lfh9NuM93Gi',
    consumer_secret: 'q80GkH7wT36Ob9CqfhgpYUdfbeG3UXPO6BwZ5KfYkdo2kzKgQR',
    access_token_key: '68999431-lrsGQLB7qvE9NmtmlRme1Zr9GvTRcSLmSEMovFj7m',
    access_token_secret: 'imXEGnwyrRpAZe3EWpLCvijNKJ4NWsNkl8oylBhjRvggH',
  });

function tweet(){
    var params = {screen_name: "rainyhoang", count:'20'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          for(var i = 0; i<tweets.length; i++){
            var date = tweets[i].created_at;
                   console.log("Rain Hoang: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                   console.log("-----------------------");
          }
        }

    });
}
//
// ---------------------------------SPOTIFY------------------------------

var spotify = new Spotify({
id: "96b5920f93df4fb8a65d963d69fe4ebd",
secret: "263061cdddbc412eadba1822e3ca5f23"
});

function spotifySong(song){
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

            //adds text to log.txt
            fs.appendFile('log.txt', songData.artists[0].name);
            fs.appendFile('log.txt', songData.name);
            fs.appendFile('log.txt', songData.preview_url);
            fs.appendFile('log.txt', songData.album.name);
            fs.appendFile('log.txt', "-----------------------");
          }
        } else{
          console.log('Error occurred.');
        }
      });
}


//============================OMDB========================================
function OmdbData(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error && response.statusCode == 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);

    } else{
      console.log('Error occurred.')
    }
    if(movie === "Mr. Nobody"){
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

    }
  });
}
//===============READ THE TEXT FILE========================================

function dootherthings(){
fs.readFile("random.txt", "utf8", function(data, error) {

      if (error) {
        return console.log(error);
      }

      var dataArr = data.split(",");
      spotifySong(data[1]);
      console.log(dataArr);
})
}

// // //insert API key of Spotify

  // var spotify = new Spotify({
  // id: "96b5920f93df4fb8a65d963d69fe4ebd",
  // secret: "263061cdddbc412eadba1822e3ca5f23"
  // });
