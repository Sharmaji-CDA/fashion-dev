import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepo: Repository<Otp>,
  ) {}

  async generateOtp(phone: string): Promise<Otp> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    const otp = this.otpRepo.create({ phone, otpCode, expiresAt });
    return this.otpRepo.save(otp);
  }

  async verifyOtp(phone: string, code: string): Promise<boolean> {
    const otp = await this.otpRepo.findOne({
      where: { phone, otpCode: code, isUsed: false },
    });

    if (!otp || otp.expiresAt < new Date()) return false;

    otp.isUsed = true;
    await this.otpRepo.save(otp);
    return true;
  }
}