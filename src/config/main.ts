import * as dotenv from 'dotenv';
dotenv.config();

let main: {
    port: string,
    serverHost: string,
    clientURL: string
};

export default main = {
    port: process.env.PORT,
    serverHost: process.env.HOST,
    clientURL: process.env.CLIENT_URL,
}
