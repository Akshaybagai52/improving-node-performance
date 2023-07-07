const express = require('express');
const cluster = require('cluster');
const app = express()

function delay(duration) {
    const startTime = Date.now();
    while ((Date.now()-startTime)< duration){
    }
}
app.get('/', (req, res) => {
    res.send(`Performance example: ${process.pid}`);
})

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`timer!!!!!!!!!!!!!!!: ${process.pid}`);
})

if(cluster.isMaster) {
    console.log("master has been started");
    cluster.fork()
    cluster.fork()
} else {
    console.log('Worker process started')
app.listen(3000, () => console.log("listening on port 3000"))

}



