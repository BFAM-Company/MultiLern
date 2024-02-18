import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';

@Controller('translations')
export class TranslationsController {
    constructor(private readonly translationsService: TranslationsService) {}

    @Post()
    create(@Body() createTranslationDto: CreateTranslationDto) {
        return this.translationsService.create(createTranslationDto);
    }

    @Get()
    findAll() {
        return this.translationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.translationsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTranslationDto: UpdateTranslationDto
    ) {
        return this.translationsService.update(+id, updateTranslationDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.translationsService.remove(+id);
    }
}
