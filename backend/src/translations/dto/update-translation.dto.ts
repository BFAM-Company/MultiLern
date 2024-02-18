import { PartialType } from '@nestjs/swagger';
import { CreateTranslationDto } from './create-translation.dto';

export class UpdateTranslationDto extends PartialType(CreateTranslationDto) {}
