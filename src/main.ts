
// import * as dotenv from 'dotenv'
// dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
 


(async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
   
    await app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();
