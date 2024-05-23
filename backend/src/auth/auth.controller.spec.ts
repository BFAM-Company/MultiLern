import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { FichesService } from 'src/fiches/fiches.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                UsersService,
                FichesService,
                PrismaService,
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should login user', async () => {
        const req = { headers: { 'user-agent': 'Test User Agent' } }; // mock request object with user-agent header
        const ip = '127.0.0.1'; // mock IP address
        const body: LoginDto = {
            // mock LoginDto
            logginMethod: 'Multilern',
            password: 'Kubuszrama10',
            email: 'kubuszrama@gmail.com',
            isLogingFromOutside: false,
            username: 'Kubuszrama10',
        };

        try {
            const result = await controller.login(req, ip, body);
            expect(result).toBeDefined();
            // Add more assertions based on your expected behavior
        } catch (error) {
            throw error; // Rethrow the error to fail the test
        }
    });

    it('should return user details for authenticated user', async () => {
        const req = { user: { userId: 1 } }; // mock authenticated user
        const expectedResult = {}; // mock expected user details

        // Mock UsersService method response
        jest.spyOn(controller['usersService'], 'findOne').mockResolvedValue(
            expectedResult
        );

        const result = await controller.me(req);
        expect(result).toEqual(expectedResult);
        // Add more assertions as needed
    });

    it('should refresh access token', async () => {
        const refreshTokenDto = { refreshToken: 'mockedRefreshToken' }; // mock refresh token DTO
        const expectedResult = 'mockedAccessToken'; // mock expected access token

        // Mock AuthService method response
        jest.spyOn(controller['authService'], 'refresh').mockResolvedValue(
            expectedResult
        );

        const result = await controller.refreshToken(refreshTokenDto);
        expect(result).toEqual(expectedResult);
        // Add more assertions as needed
    });

    it('should logout user', async () => {
        const refreshTokenDto = { refreshToken: 'mockedRefreshToken' }; // mock refresh token DTO
        const expectedResult = undefined; // mock expected result

        // Mock AuthService method response
        jest.spyOn(controller['authService'], 'logout').mockResolvedValue(
            expectedResult
        );

        const result = await controller.logout(refreshTokenDto);
        expect(result).toEqual(expectedResult);
        // Add more assertions as needed
    });

    it('should handle Discord login callback', async () => {
        const req = {
            user: {
                global_name: 'testuser',
                email: 'test@example.com',
                id: 123,
                avatar: 'avatar.jpg',
            },
            headers: { 'user-agent': 'Test User Agent' },
        }; // mock request object with user data
        const res = { redirect: jest.fn() }; // mock response object with redirect method
        const ip = '127.0.0.1'; // mock IP address

        // Mock PrismaService method responses
        jest.spyOn(controller['prisma'].users, 'findFirst').mockResolvedValue(
            null
        );
        jest.spyOn(
            controller['prisma'].refresh_tokens,
            'create'
        ).mockResolvedValue({
            id: 1, // mock refresh token id
            userAgent: 'Test User Agent', // mock user-agent
            ipAdress: ip, // mock IP address
            userId: 123, // mock user id
        });

        // Mock AuthService method response
        jest.spyOn(controller['authService'], 'login').mockResolvedValue({
            accessToken: 'mockedAccessToken',
            refreshToken: 'mockedRefreshToken',
        });

        await controller.discordLoginCallback(req, res, ip);

        expect(res.redirect).toHaveBeenCalledWith(
            'exp://192.168.33.8:8081?accessToken=mockedAccessToken&refreshToken=mockedRefreshToken'
        );
    });
});
