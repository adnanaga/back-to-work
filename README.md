# Back To Work!

Call myself up if I haven't been working for 10 mins by checking if I've been playing my music.

## Idea

I have a lot of trouble with procrastination and distracting myself with other tasks when im not working. However I noticed a pattern I usually listen to music when I'm working, specifically the Apple Music app on my Mac. I created this little node program that would read when it was playing music and if it wasn't playing music for 10 mins, it would call me and tell me to get back to workStackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Server.js

We look at the memory usage of the Music app by first grepping the output

    ps aux | grep Contents/MacOS/Music


Then we look at the memory usage by splitting the string, removing any null elements and cleaning it up.

    let data = stdout.toString().split(/(\r?\n)/g);

    let memory = data[0].toString().split(' ').filter(i => i)[2];
After that we just increment a counter and once it's seen that the memory usage has been low for a while it'll call up and play an mp3!

***Guess I better get back to work***
