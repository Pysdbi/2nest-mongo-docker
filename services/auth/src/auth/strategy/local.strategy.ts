import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'password',
    });
  }

  async validate(id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(id);

    // @ts-ignore
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedException('Bad id or password');
    }

    return user;
  }
}
