import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { FichesService } from './fiches.service';
import { UpdateFichDto } from './dto/update-fich.dto';

@Controller('fiches')
export class FichesController {
    constructor(private readonly fichesService: FichesService) {}

    @Get('/:page')
    findAll(@Param('page') page: string) {
        return this.fichesService.findAll(+page);
    }

    @Get('id/:id')
    findById(@Param('id') id: string) {
        return this.fichesService.findById(+id);
    }

    @Get('userId/:id/:page')
    findAllByUser(@Param('id') id: string, @Param('page') page: string) {
        return this.fichesService.findAllByUser(+id, +page);
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
