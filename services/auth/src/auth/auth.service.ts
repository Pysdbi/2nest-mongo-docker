import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(password: string): Promise<{ id: string; token: string }> {
    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({ password: hashedPassword });
    const user = await newUser.save();
    const token = this.generateToken(user.id);
    return { id: user.id, token };
  }

  async signIn(id: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findById(id);
    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException('Bad id or password');
    }
    const token = this.generateToken(user.id);
    return { token };
  }

  async validateUser(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(
    candidatePassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  private generateToken(id: string): string {
    const payload = { id };
    return this.jwtService.sign(payload);
  }
}
