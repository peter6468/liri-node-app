require('dotenv').config();

var key = require('./key.js');

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

// var twitter = new Twitter({
//     consumer_key: process.env.TWITTER_CONSUMER_KEY,
//     consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//     access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

//keys.spotify
var spotify = new Spotify(key.spotify);
var request = require('request');
var fs = require('fs');

var getMyTweets = function () {

    var client = new Twitter(key.twitter);
    //creating an instance of an object

    var params = { screen_name: 'peterki25399602' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        console.log(error)
        if (!error) {
            //console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log('');
                console.log(tweets[i].text);
            }
        } else {
            //console.log(error);
        }
    });
}


var getArtistNames = function (artist) {
    return artist.name;
}

var getMySpotify = function (songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(data.tracks.items[0]); 
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview songs: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('-------------------------')
        }
    });
}

var getMovie = function (movieName) {

    request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        //request('"http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="', function (error, response, body) {

        //If the request is successful
        if (!error && response.statusCode === 200) {

            //Parse the body of the site and recover just the imdbRating
            //(Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            var jsonData = JSON.parse(body);
            //console.log(body);
            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMBD Rating: ' + jsonData.imdbRating);
            console.log('Rotten tomatoes rating: ' + jsonData.Ratings[1].Value);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot:' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);

            //adds text to log.txt
            //fs.appendFile('log.txt', "Title: " + jsonData.Title);

        }
    })
};


var doWhatItSays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    });
}

//swtich statement that hold all the diff arguments , runs only when user types certain command
var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            getMyTweets();
            break;
        case 'spotify-this-song':
            if (functionData) {
                getMySpotify(functionData);
            } else {
                getMySpotify('Ace of Base: The Sign');
            }
            break;
        case 'movie-this':
            if (functionData) {
                getMovie(functionData);
            } else {
                getMovie('Mr. Nobody');
                console.log('If you have not watched it, you really should.  it is on netflix.');
            }
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log('Liri does not know that');
    }
}

//this function allows me to pass arguments into when i run pick, 
//runThis only job to take some arguments from the user and run them into the switch statement   
var runThis = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

//i want to pass runThis the function the aruguments fromm the user,argv[2] will be my-tweets,...
//...spotify-this-song, movie-this, do-what-it says, argv[3] will be song or movie they choose
runThis(process.argv[2], process.argv[3]);