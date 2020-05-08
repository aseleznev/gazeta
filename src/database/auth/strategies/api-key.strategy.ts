import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'headerApiKey') {
    constructor(private authService: AuthService) {
        super({ header: 'apiKey', prefix: '' }, false, async (apikey: string, done) => {
            const checkKey = await authService.authenticateClient(apikey);
            if (checkKey) {
                return done(null, true);
            }
            console.log('Unauthorized');
            return done(new UnauthorizedException());
        });
    }
}
