import { PartialType } from '@nestjs/swagger';
import { CreateFichDto } from './create-fich.dto';

export class UpdateFichDto extends PartialType(CreateFichDto) {}
