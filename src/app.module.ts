import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { RolesGuard } from './roles/guard/roles.guard';
import { AdminModule } from './admin/admin.module';
//import { AttachmentsModule } from './files/attachments.module';

@Module({
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', `.${process.env.NODE_ENV}.env`],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: parseInt(process.env.POSTGRES_PORT) || 5432,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                synchronize: true,
                autoLoadEntities: true,
                retryAttempts: 5,
                retryDelay: 5000, // ms
                namingStrategy: new SnakeNamingStrategy(),
            }),
        }),
        UserModule,
        AuthModule,
        RolesModule,
        AdminModule,
        RouterModule.register([
            {
                path: 'admin',
                module: AdminModule,
            },
        ]),
    ],
})
export class AppModule {}
