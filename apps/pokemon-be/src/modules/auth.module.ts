import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from '../configs';
import { IAuthService } from '../contracts/service-contracts/auth-service.interface';
import { AuthService } from 'src/services/auth.service';
import { Token } from 'src/models/token.model';
import { ITokenRepository } from 'src/contracts/repository-contracts/token-repository.interface';
import { TokenRepository } from 'src/repositories/token.repository';
import { UserModule } from './user.module';
import { JwtStrategy, RefreshJwtStrategy } from 'src/strategies/jwt.strategy';
import { AuthController } from 'src/controllers/auth/auth.controller';

const tokenRepositoryProvider: Provider = {
  provide: ITokenRepository,
  useClass: TokenRepository,
};
const authServiceProvider: Provider = {
  provide: IAuthService,
  useClass: AuthService,
};
@Module({
  imports: [
    UserModule,

    ConfigModule.forFeature(JwtConfig),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.secret'),
          signInOptions: {
            expiresIn: configService.get('jwt.expiresIn'),
          },
        };
      },
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Token]),
  ],

  controllers: [AuthController],

  providers: [
    JwtStrategy,
    RefreshJwtStrategy,

    tokenRepositoryProvider,
    authServiceProvider,
  ],
})
export class AuthModule {}
