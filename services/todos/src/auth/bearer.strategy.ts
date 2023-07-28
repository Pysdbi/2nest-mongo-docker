import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(token: string): Promise<any> {
    try {
      const response = await axios.get(`http://nest-auth:3000/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) return response.data;
      throw 'Invalid token';
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
