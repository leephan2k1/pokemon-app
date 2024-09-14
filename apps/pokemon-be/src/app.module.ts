import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs';
import { envSchema } from './configs/env.schema';
import { AuthModule } from './modules/auth.module';
import { PokemonModule } from './modules/pokemon.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PokemonModule,

    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),

    ConfigModule.forRoot({
      cache: true,
      validationSchema: envSchema,
      load: [DatabaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbOptions: TypeOrmModuleOptions = {
          type: 'postgres',
          host: config.get<string>('PG_HOST'),
          port: Number(config.get<string>('PG_PORT')),
          username: config.get<string>('PG_USERNAME'),
          password: config.get<string>('PG_PASSWORD'),
          database: config.get<string>('PG_DB'),
          entities: ['dist/**/*.+(model|enum).js'],
          autoLoadEntities: true,
          migrations: ['dist/db/migrations/*.js'],
          migrationsRun: true,
          synchronize: false,
          logging: true,
          logger: 'simple-console',
        };
        return dbOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
