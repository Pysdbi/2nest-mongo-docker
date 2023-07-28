import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class TaskCreateDto {
  @ApiHideProperty()
  owner: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
