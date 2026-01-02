import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { User } from '../users/entities/user.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { Video } from '../videos/entities/video.entity';
import { Pharmacy } from '../pharmacy/entities/pharmacy.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Clinic, Video, Pharmacy]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
