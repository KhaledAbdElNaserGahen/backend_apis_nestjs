import { Injectable } from '@nestjs/common';

@Injectable()
export class PharmacyService {
  async getPrescriptions(userId: number) {
    // TODO: Implement prescription retrieval from database
    return [];
  }
}
