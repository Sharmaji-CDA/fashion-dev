import { Test, TestingModule } from '@nestjs/testing';
import { OtpController } from './otps.controllor';

describe('UsersController', () => {
  let controller: OtpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
    }).compile();

    controller = module.get<OtpController>(OtpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});