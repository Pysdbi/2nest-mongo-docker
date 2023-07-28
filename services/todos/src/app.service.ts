import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1><a href="http://127.0.0.1:3000/api">Swagger API</a></h1>';
  }
}
