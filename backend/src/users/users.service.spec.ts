import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
// Przykładowy import dla PrismaMock

describe('UsersService', () => {
    let usersService: UsersService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService, PrismaService],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Wyczyść wszystkie mocki po każdym teście
    });

    it('findByUsername should return user if exists', async () => {
        const mockUser = {
            id: 1,
            nickname: 'testuser',
            password: 'hashedpassword',
            email: 'test@example.com',
            avatar: 'avatar.jpg',
            logginMethod: 'Multilern',
        };
        jest.spyOn(prismaService.users, 'findFirst').mockResolvedValueOnce(
            mockUser
        );

        const user = await usersService.findByUsername('testuser');

        expect(user).toEqual(mockUser);
    });

    it('findByUsername should return undefined if user does not exist', async () => {
        jest.spyOn(prismaService.users, 'findFirst').mockResolvedValueOnce(
            undefined
        );

        const user = await usersService.findByUsername('nonexistentuser');

        expect(user).toBeUndefined();
    });

    it('findWithLogginMethod should return user if exists', async () => {
        const mockUser = {
            id: 1,
            nickname: 'testuser',
            password: 'hashedpassword',
            email: 'test@example.com',
            avatar: 'avatar.jpg',
            logginMethod: 'Google',
        };
        jest.spyOn(prismaService.users, 'findFirst').mockResolvedValueOnce(
            mockUser
        );

        const user = await usersService.findWithLogginMethod(
            'Google',
            'test@example.com'
        );

        expect(user).toEqual(mockUser);
    });

    it('findWithLogginMethod should return undefined if user does not exist', async () => {
        jest.spyOn(prismaService.users, 'findFirst').mockResolvedValueOnce(
            undefined
        );

        const user = await usersService.findWithLogginMethod(
            'Google',
            'nonexistent@example.com'
        );

        expect(user).toBeUndefined();
    });
});
