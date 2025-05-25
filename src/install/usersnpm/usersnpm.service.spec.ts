import { Test, TestingModule } from '@nestjs/testing';
import { UsersnpmService } from './usersnpm.service';

describe('UsersnpmService', () => {
  let service: UsersnpmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersnpmService],
    }).compile();

    service = module.get<UsersnpmService>(UsersnpmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
