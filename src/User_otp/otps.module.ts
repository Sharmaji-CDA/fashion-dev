import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './otp.entity';
import { OtpService } from './otps.service';
import { OtpController } from './otps.controllor';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpService],
  controllers: [OtpController],
  exports: [OtpService],
})
export class OtpModule {}