import mongoose from 'mongoose';

export interface MongoDbConfig {
  database: string;
}

class MongoDb {
  connect(config: MongoDbConfig) {
    mongoose
      .connect(config.database, { useNewUrlParser: true })
      .then(() => console.log(`MongoDB is connected on ${config.database}`))
      .catch(() => console.log('connection error'));
  }

  close() {
    mongoose.connection.close();
  }
}

export default MongoDb;
