const redis = require('redis');
let instanceClient = null;
const client = redis.createClient();

client.on('error', (err) => {
    console.log(err);
    console.log('Redis Client Error');
    process.exit(1);
});

client.on('connect', () => {
    console.log('Redis plugged in.');
});

const connectRedis = async () => {
    const instance = await client.connect();
    instanceClient = instance;
};

const getRedisInstance = () => {
    if (!instanceClient) throw new Error('Must connect to database firts!');
    return instanceClient;
};
const quitRedisInstance = async () => {
    console.log('Close redis connection');
    await getRedisInstance().quit();
    instanceClient = null;
};

module.exports = { connectRedis, getRedisInstance, quitRedisInstance };
