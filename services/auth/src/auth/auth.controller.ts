import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SignInRequestDto } from './dto/sign-in.request.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: () => SignUpRequestDto })
  @Post('/signup')
  async signUp(@Body() payload: { password: string }) {
    return this.authService.signUp(payload.password);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: () => SignInRequestDto })
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Body() payload: SignInRequestDto) {
    const { id, password } = payload;
    return this.authService.signIn(id, password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user information' })
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUser(@Req() req) {
    return { id: req.user.id };
  }
}
