import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'

export class ConfigService implements MongooseOptionsFactory {
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {

    return {
      uri: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.9lce6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }
}
