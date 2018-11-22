import * as dotenv from 'dotenv';
import * as os from 'os';

dotenv.config();

interface Config {
    secret: string,
    database: string,
    port: string,
    serverHost: string,
    clientURL: string,
};

const config: Config = {
    secret: '',
    database: process.env.DATABASE_URL,
    port: process.env.PORT,
    serverHost: `http://${os.hostname()}`,
    clientURL: process.env.CLIENT_URL,
};

export default config;
