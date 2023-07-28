import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  password: string;
}
