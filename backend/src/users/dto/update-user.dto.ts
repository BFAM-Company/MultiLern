import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './model-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
