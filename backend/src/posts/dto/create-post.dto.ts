import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({ example: 'Czas na biologie zad.1 str.16' })
    title: string;

    @ApiProperty({ example: 'Hejka pomocy nie umiem macie' })
    content: string;

    @ApiProperty({ example: new Date() })
    date: Date | string;

    @ApiProperty({ example: [{ imgId: 1 }, { imgId: 2 }] })
    images?: {
        imgId: number;
    }[];

    @ApiProperty({ example: [{ tagsId: 1 }, { tagsId: 2 }] })
    tags?: {
        tagsId: number;
    }[];

    @ApiProperty({ example: 1 })
    userId: number;
}
