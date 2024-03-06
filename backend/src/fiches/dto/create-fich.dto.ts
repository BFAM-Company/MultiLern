export class CreateFichDto {
    title: string;
    userId: number;
    translationsList: {
        translations: {
            create: {
                foreignTranslation: string | null;
                polishTranslation: string | null;
            };
        };
    }[];
}
