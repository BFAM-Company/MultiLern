import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { FichesService } from './fiches.service';
import { CreateFichDto } from './dto/create-fich.dto';
import { UpdateFichDto } from './dto/update-fich.dto';

@Controller('fiches')
export class FichesController {
    constructor(private readonly fichesService: FichesService) {}

    @Post()
    create(@Body() createFichDto: CreateFichDto) {
        return this.fichesService.create(createFichDto);
    }

    @Get()
    findAll() {
        return this.fichesService.findAll();
    }

    @Get(':id')
    findAllByUser(@Param('id') id: string) {
        return this.fichesService.findAllByUser(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFichDto: UpdateFichDto) {
        return this.fichesService.update(+id, updateFichDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.fichesService.remove(+id);
    }
}
