import { ApiProperty } from '@nestjs/swagger';

export class findByNicknameAndPasswordUserDto {
    @ApiProperty()
    nickname: string;
    @ApiProperty()
    password: string;
}
