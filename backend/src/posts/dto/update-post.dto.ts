import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
    @ApiProperty({ example: 'Czas na biologie zad.1 str.16' })
    title: string;

    @ApiProperty({ example: 'Hejka pomocy nie umiem macie' })
    content: string;

    @ApiProperty({ example: new Date() })
    date: Date | string;

    @ApiProperty({
        example: [{ images: { create: { img: 'Image in base64' } } }],
    })
    images?: {
        images: {
            create: {
                img: string;
            };
        };
    }[];

    @ApiProperty({
        example: [
            { where: { id: 1 }, create: { tagsId: 1 } },
            { where: { id: 2 }, create: { tagsId: 2 } },
        ],
    })
    tags?: {
        where: {
            id: number;
        };
        create: {
            tagsId: number;
        };
    }[];

    @ApiProperty({ example: 1 })
    userId: number;
}
