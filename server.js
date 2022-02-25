const { exec } = require("child_process");

const accountSid = "";
const authToken = "";
const client = require('twilio')(accountSid, authToken);
const VoiceResponse = require('twilio').twiml.VoiceResponse;

let counter = 0;

const response = new VoiceResponse();
response.play({
    loop : 1,
},"");


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

        if (parseFloat(memory) < 4){
            counter++;
            console.log("no music playing", counter)
        } else {
            counter = 0;
        }

        if (counter == 120){
            console.log("Havent been listening to music in a while");
            console.log("lets give you a call");
        client.calls
            .create({
                twiml: response.toString(),
                to: '',
                from: ''
            }).then(call => console.log(call.sid)).catch(e=>console.log(e));
        }
    });
}, 5000);