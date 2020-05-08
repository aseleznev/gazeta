import { Injectable, Logger } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectConfig } from 'nestjs-config';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(@InjectConfig() private readonly config) {}

    async authenticateClient(apiKey: string): Promise<boolean> {
        this.logger.log(apiKey);
        this.logger.log(this.config.get('app.cmsApiKey'));
        try {
            return this.checkApiKey(this.config.get('app.cmsApiKey'), apiKey);
        } catch (e) {
            this.logger.error(`Auth error: ${e}`);
        }

        return false;
    }

    async checkApiKey(data: string, apiKey: string): Promise<boolean> {
        return await compare(data, apiKey);
    }
}
