import { createClient } from 'redis';

const client = await createClient({ url: 'redis://redis:6379' })
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();

client.on('error', (error) => {
    console.log(error);
});
export default client;
