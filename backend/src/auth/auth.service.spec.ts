import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

describe('AuthService', () => {
    let service: AuthService;
    let usersService: UsersService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, UsersService, PrismaService],
        }).compile();

        service = module.get<AuthService>(AuthService);
        usersService = module.get<UsersService>(UsersService); // Initialize dependencies
        prismaService = module.get<PrismaService>(PrismaService); // Initialize dependencies
    });

    it('should return access and refresh tokens for valid credentials', async () => {
        const result = await service.login(
            'Multilern',
            'Kubuszrama10',
            { userAgent: 'userAgent', ipAdress: 'ipAddress' },
            'kubuszrama@gmail.com'
        );
        expect(result).toBeDefined();
        expect(result.accessToken).toBeDefined();
        expect(result.refreshToken).toBeDefined();
    });

    it('should return undefined for invalid credentials', async () => {
        const result = await service.login(
            'Multilern',
            'invalidPassword',
            { userAgent: 'userAgent', ipAdress: 'ipAddress' },
            'kubuszrama@gmail.com'
        );
        expect(result).toBeUndefined();
    });

    it('should return undefined for an invalid refresh token', async () => {
        const refreshToken = 'invalidRefreshToken';
        const result = await service.refresh(refreshToken);
        expect(result).toBeUndefined();
    });

    it('should return undefined for invalid credentials', async () => {
        // Mock the findByEmail or findByUsername method to return undefined
        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined);
        const result = await service.login(
            'Multilern',
            'invalidPassword',
            { userAgent: 'userAgent', ipAdress: 'ipAddress' },
            'kubuszrama@gmail.com'
        );
        expect(result).toBeUndefined();
    });

    it('should return undefined for an invalid refresh token', async () => {
        // Mock the retrieveRefreshToken method to return undefined
        jest.spyOn(service as any, 'retrieveRefreshToken').mockResolvedValue(
            undefined
        );
        const refreshToken = 'invalidRefreshToken';
        const result = await service.refresh(refreshToken);
        expect(result).toBeUndefined();
    });

    it('should return undefined for an invalid or expired refresh token', async () => {
        const refreshToken = 'invalidRefreshToken';
        jest.spyOn(service as any, 'retrieveRefreshToken').mockResolvedValue(
            undefined
        );
        const result = await service.refresh(refreshToken);
        expect(result).toBeUndefined();
    });

    it('should return undefined for invalid credentials', async () => {
        jest.spyOn(usersService, 'findByEmail').mockResolvedValue(undefined); // Simulate user not found
        const result = await service.login(
            'Multilern',
            'invalidPassword',
            { userAgent: 'userAgent', ipAdress: 'ipAddress' },
            'kubuszrama@gmail.com'
        );
        expect(result).toBeUndefined();
    });

    it('should return undefined for an invalid login method', async () => {
        jest.spyOn(usersService, 'findWithLogginMethod').mockResolvedValue(
            undefined
        ); // Simulate user not found
        const result = await service.login(
            'InvalidMethod',
            'password',
            { userAgent: 'userAgent', ipAdress: 'ipAddress' },
            'kubuszrama@gmail.com'
        );
        expect(result).toBeUndefined();
    });

    it('should correctly refresh the token', async () => {
        // Create a mock refreshToken object
        const refreshToken = {
            id: 1,
            userId: 1,
            userAgent: 'mockUserAgent',
            ipAdress: 'mockIpAddress',
            sign: jest.fn().mockReturnValue('mockRefreshToken'),
        };

        // Mock the retrieveRefreshToken method to return the mock refreshToken
        jest.spyOn(service as any, 'retrieveRefreshToken').mockResolvedValue(
            refreshToken
        );

        // Call the refresh method
        const result = await service.refresh('validRefreshToken');

        // Assertions
        expect(result).toBeDefined();
    });

    it('should correctly delete the refresh token upon logout', async () => {
        // Mock the retrieveRefreshToken method to return a valid refreshToken
        jest.spyOn(service as any, 'retrieveRefreshToken').mockResolvedValue({
            id: 1,
            userId: 1,
            userAgent: 'mockUserAgent',
            ipAdress: 'mockIpAddress',
        });

        // Mock the prisma refresh_tokens delete method
        jest.spyOn(prismaService.refresh_tokens, 'delete').mockResolvedValue({
            id: 1,
            userAgent: 'xd',
            userId: 1,
            ipAdress: 'xd',
        }); // Mock the deletion to succeed

        // Call the logout method
        await service.logout('validRefreshToken');

        // Assertions
        expect(prismaService.refresh_tokens.delete).toHaveBeenCalled();
        expect(prismaService.refresh_tokens.delete).toHaveBeenCalledWith({
            where: { id: 1 }, // Ensure the argument matches the expected type
        });
    });
});
