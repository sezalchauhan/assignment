import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegesService } from './colleges.service';
import { CollegesDataController, CollegeCoursesController, CollegesController } from './colleges.controller';
import { College } from './colleges.entity';
import { CollegePlacement } from './college_placement.entity';
import { CollegeCourse } from './college_wise_course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([College, CollegePlacement, CollegeCourse])],
  controllers: [CollegesDataController, CollegeCoursesController, CollegesController], // Ensure the controller is declared here
  providers: [CollegesService], // Ensure the service is declared here
})
export class CollegesModule {}