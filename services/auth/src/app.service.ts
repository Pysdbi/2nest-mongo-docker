import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1><a href="http://127.0.0.1:3001/api">Swagger API</a></h1>';
  }
}
