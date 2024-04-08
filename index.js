const express = require('express');
const { getRedisInstance, connectRedis, quitRedisInstance } = require('./redis');
const port = 4000;

const startServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.get('/', async (req, res) => {
        const instance = await getRedisInstance().get('key');
        console.log(instance);
        return res.status(200).json({ msg: 'Welcome to the server!' });
    });
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    });
    process.on('SIGINT', async () => {
        console.log('You are performing a server shutdown!');
        console.log('Close connection redis shutdown!');
        await quitRedisInstance();
        process.exit(0);
    });
};

(async () => {
    try {
        await connectRedis();
        console.log('Connected redis successfully');
        startServer();
    } catch (error) {
        console.log('Connected redis failed.');
        console.log(error);
        process.exit(1);
    }
})();
