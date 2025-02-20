/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule, // Importa el módulo de configuración para acceder a variables de entorno
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('config.postgres.host'),
        port: configService.get<number>('config.postgres.port'),
        username: configService.get<string>('config.postgres.user'),
        password: configService.get<string>('config.postgres.password'),
        database: configService.get<string>('config.postgres.dbName'),
        ssl: { rejectUnauthorized: false }, // Acepta certificados autofirmados
        autoLoadEntities: true,
        synchronize: true, // Solo para desarrollo
      }),
    }),
  ],
})
export class DatabaseModule {}
