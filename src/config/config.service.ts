import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import * as os from 'os'
import { join } from 'path'

export class ConfigService implements MongooseOptionsFactory {
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    const credentials = join(os.homedir(), '.cert', 'lift-logger.pem')

    return {
      uri: `mongodb+srv://cluster0.9lce6.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority`,
      sslKey: credentials,
      sslCert: credentials,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }
}
