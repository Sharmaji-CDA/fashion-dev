import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './Users/users.module';
import { UsersnpmService } from './install/usersnpm/usersnpm.service';
import { OtpModule } from './User_otp/otps.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Automatically load entities
      synchronize: false, // Auto-create tables (disable in production)
    }),
    UsersModule,
    OtpModule
  ],
  controllers: [AppController],
  providers: [AppService, UsersnpmService],
})
export class AppModule {}
