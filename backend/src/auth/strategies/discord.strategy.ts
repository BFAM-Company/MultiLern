import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
    constructor() {
        super({
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: 'http://localhost:3001/auth/discord/callback',
            scope: ['identify', 'email'],
        });
    }

    // make sure to add this or else you won't get the refresh token
    authorizationParams(): { [key: string]: string } {
        return {
            access_type: 'offline',
            prompt: 'consent',
        };
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
    ) {
        done(null, profile);
    }
}
