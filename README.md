# LIRI BOT

###Overview
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI takes in 4 parameters
1.my-tweets
2.spotify-this-song
3.movie-this
4.do-what-it says
***if something else is entered liri will say, "Liri does not know that"

How to Get Started
1.clone repo
2.run 'npm install'
3.run "node.liri.js'

What each command does
1.node liri.js my-tweets
    -displays my last 20 tweets
2.node liri.js spotify-this-song "song name"
    -displays the following information for 20 songs(0-19)
        -displays artist
        -displays song name
        -displays preview url address for song
        -displays album
        ***if no song is passed through it will default to The Sign by Ace of Base
3.node liri.js movie-this "movie name"
    -displays the following information
        -displays title
        -displays year released
        -displays movie rating
        -displays IMBD rating
        -displays Rotten Tomato Rating
        -displays Country
        -displays Language
        -displays Plot
        -displays Actors
4.node liri.js do-what-it-says
    -takes text from random.text and runs the command, which in this case is Welcome 
     to The Jungle

This Project in maintained by peter6468 and users can contact him to get help.


