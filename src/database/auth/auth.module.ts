import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './strategies/api-key.strategy';
import { ConfigModule } from 'nestjs-config';
import { resolve } from 'path';

@Module({
    imports: [PassportModule, ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}'))],
    providers: [AuthService, ApiKeyStrategy],
    exports: [AuthService]
})
export class AuthModule {}
