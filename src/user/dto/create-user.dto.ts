import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Please enter at least 2 characters' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(2, { message: 'Please enter at least 2 characters' })
  @IsNotEmpty()
  username: string;
}
