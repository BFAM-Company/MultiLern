import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'REST API MultiLern (BFAM-Company)';
  }
}
