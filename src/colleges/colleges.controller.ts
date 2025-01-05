import { Query, Controller, Get, Param } from '@nestjs/common';
import { CollegesService } from './colleges.service';

@Controller('college_data')
export class CollegesDataController {
  constructor(private readonly collegesService: CollegesService) {}

  @Get(':college_id')
  async getCollegeData(@Param('college_id') college_id: number) {
    // return "Hello World!"
    return this.collegesService.getCollegeData(Number(college_id));
  }
}


@Controller('college_courses') // Define base path for college courses
export class CollegeCoursesController {
  constructor(private readonly collegesService: CollegesService) {}

  // Get all courses for a specific college, ordered by course_fee
  @Get(':college_id')
  async getCollegeCourses(@Param('college_id') college_id: number) {
    return this.collegesService.getCollegeCourses(Number(college_id));
  }
}


@Controller('colleges') // Define base path for colleges
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  // Get all colleges with optional city and state filters
  @Get()
  async getColleges(
    @Query('city') city?: string,
    @Query('state') state?: string,
  ) {
    return this.collegesService.getCollegesByCityAndState(city, state);
  }
}
