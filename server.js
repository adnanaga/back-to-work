require('dotenv').config();

const { exec } = require("child_process");

const accountSid = process.env.accountSID;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

let pollingTime = 5000;

let allowedProcrastinationTime = 10; // in minutes

let counter = 0;

const response = new VoiceResponse();
response.play({
    loop : 1,
},"https://github.com/adnanaga/back-to-work/blob/main/backtowork.mp3?raw=true");


setInterval(()=> {
    exec("ps aux | grep Contents/MacOS/Music", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        
        let data = stdout.toString().split(/(\r?\n)/g);

        let memory = data[0].toString().split(' ').filter(i => i)[2];

        // This seems like about the 
        if (parseFloat(memory) < 4){
            counter++;
            console.log("no music playing", counter)
        } else {
            counter = 0;
        }

        // Let's wait for 10 mins
        if (counter == ((allowedProcrastinationTime * 1000 * 60)/pollingTime)){
            console.log("Havent been listening to music in a while");
            console.log("lets give you a call");

        // Time to call you I guess
        client.calls
            .create({
                twiml: response.toString(),
                to: process.env.toPhoneNumber,
                from: process.env.fromPhoneNumber,
            }).then(call => console.log(call.sid)).catch(e=>console.log(e));
            
            //Reset counter for now
            counter = 0;
        }
        
        
    });
}, pollingTime);