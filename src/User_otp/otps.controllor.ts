import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { OtpService } from './otps.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  async sendOtp(@Body() body: { phone: string }) {
    const otp = await this.otpService.generateOtp(body.phone);
    // Send `otp.otpCode` using an SMS API here like Twilio, Msg91, etc.
    return { message: 'OTP sent successfully' };
  }

  @Post('verify')
  async verifyOtp(@Body() body: { phone: string; code: string }) {
    const valid = await this.otpService.verifyOtp(body.phone, body.code);
    if (!valid) throw new BadRequestException('Invalid or expired OTP');
    return { message: 'OTP verified successfully' };
  }
}