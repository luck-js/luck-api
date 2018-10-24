import * as dotenv from 'dotenv';
dotenv.config();

let main: {
    secret: string,
    database: string,
    port: string,
    serverHost: string,
    clientURL: string
};

export default main = {
    secret: '',
    database: process.env.DATABASE_URL,
    port: process.env.PORT,
    serverHost: process.env.HOST,
    clientURL: process.env.CLIENT_URL,
}
