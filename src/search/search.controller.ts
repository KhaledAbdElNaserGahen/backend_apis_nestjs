import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  globalSearch(
    @Query('q') query: string,
    @Query('filters') filters?: string,
  ) {
    const filterArray = filters ? filters.split(',') : undefined;
    return this.searchService.globalSearch(query, filterArray);
  }

  @Get('doctors')
  searchDoctors(@Query('q') query: string) {
    return this.searchService.searchDoctors(query);
  }

  @Get('clinics')
  searchClinics(@Query('q') query: string) {
    return this.searchService.searchClinics(query);
  }

  @Get('videos')
  searchVideos(@Query('q') query: string) {
    return this.searchService.searchVideos(query);
  }
}
