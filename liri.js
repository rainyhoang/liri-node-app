var stuffINeed = require("./key.js");
var twitter = require("twitter");
var request = require("request");
var SpotifyWebapi = require('node-spotify-api');
var fs = require("fs")
var inquirer = require('inquirer');
//store command of array
var nodeArgv = process.argv;
var command = process.argv[2];



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

  var params = {screen_name: "rainyhoang", count:'20'};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        for(var i = 0; i<tweets.length; i++){
          var date = tweets[i].created_at;
                 console.log("Rain Hoang: " + tweets[i].text + " Created At: " + date.substring(0, 19));
                 console.log("-----------------------");
        }
      }
      // console.log(tweets.text)

  });

  // end of twitterKeys

// Spotify

  // read the file in random.txt and turn to array
fs.readFile("random.txt", "utf8", function(data, error) {

  if (error) {
    return console.log(error);
  }

  var dataArr = data.split(",");
  console.log(dataArr);

//insert API key of Spotify

  var spotify = new Spotify({
  id: "96b5920f93df4fb8a65d963d69fe4ebd",
  secret: "263061cdddbc412eadba1822e3ca5f23"
  });

  spotify.search({ type: 'artist OR album OR track', query: "I want it that way" }, function(err, data) {

    if (err) {
    return console.log('Error occurred: ' + err);
    console (err);
    }

  });
  })

//spotify end

//OMDP
