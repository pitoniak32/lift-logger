import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

export class ConfigService implements MongooseOptionsFactory {

  createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
    return {
      uri: `mongodb://localhost/nest`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }

}