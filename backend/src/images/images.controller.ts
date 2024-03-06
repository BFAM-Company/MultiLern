import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    create(@Body() createImageDto: CreateImageDto) {
        return this.imagesService.create(createImageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imagesService.remove(+id);
    }
}
