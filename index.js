const cluster = require('cluster');
const express = require('express');

const app = express();

if (cluster.isMaster && !module.parent) {
    const cpuCount = require('os').cpus().length;

    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.id} died :(`);
        cluster.fork();
    });
} else {
    const rootRouter = require('./routes');
    const PORT = process.env.PORT || 3000;

    app.get('/', (req, res) => {
        res.send('hello world');
    });

    app.use(rootRouter);

    if (!module.parent) {
        app.listen(PORT, () => {
            console.log(`App listening on PORT ${PORT}`);
        });
    }
}

module.exports = app;
