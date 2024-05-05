import { Controller, Get, Param } from '@nestjs/common';
import { FichesService } from './fiches.service';

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
}
