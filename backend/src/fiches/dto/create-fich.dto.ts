import { ApiProperty } from '@nestjs/swagger';
export class CreateFichDto {
    @ApiProperty({ example: 'Angielski Focus4' })
    title: string;
    @ApiProperty({ example: '18' })
    userId: number;
    @ApiProperty({
        example: [
            {
                translations: {
                    create: {
                        foreignTranslation: 'home',
                        polishTranslation: 'dom',
                    },
                },
            },
            {
                translations: {
                    create: {
                        foreignTranslation: 'dog',
                        polishTranslation: 'pies',
                    },
                },
            },
        ],
    })
    translationsList: {
        translations: {
            create: {
                foreignTranslation: string | null;
                polishTranslation: string | null;
            };
        };
    }[];
}
