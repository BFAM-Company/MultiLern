import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImagesService {
    constructor(private readonly prisma: PrismaService) {}

    create(createImageDto: CreateImageDto) {
        return this.prisma.images.create({
            data: createImageDto.img,
        });
    }

    remove(id: number) {
        return this.prisma.images.delete({ where: { id: id } });
    }
}
