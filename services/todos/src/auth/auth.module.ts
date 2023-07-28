import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BearerStrategy } from './bearer.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'bearer' })],
  providers: [BearerStrategy],
  exports: [],
})
export class AuthModule {}
