import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CollegePlacement } from './college_placement.entity';
import { CollegeCourse } from './college_wise_course.entity'; // Adjust this to your actual entity path
import { College } from './colleges.entity'; // Adjust this to your actual entity path

@Injectable()
export class CollegesService {
  constructor(
    @InjectRepository(CollegePlacement)
    private collegePlacementRepository: Repository<CollegePlacement>,

    @InjectRepository(CollegeCourse)
    private readonly collegeCourseRepository: Repository<CollegeCourse>,

    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
  ) {}

  async getCollegeData(college_id: number) {
    // Section 1: avg_section
    const rawResult = await this.collegePlacementRepository.query(
      `
        SELECT 
            placement.year AS year,
            AVG(placement.highest_placement) AS Highest_Placement,
            AVG(placement.average_placement) AS Average_Placement,
            AVG(placement.median_placement) AS Median_Placement,
            AVG(placement.placement_rate) AS Placement_Rate
        FROM 
            College_Placement placement
        WHERE 
            placement.college_id = $1
            AND placement.highest_placement > 0
            AND placement.average_placement > 0
            AND placement.median_placement > 0
            AND placement.placement_rate > 0
        GROUP BY 
            placement.year
        ORDER BY 
            placement.year;
      `,
      [college_id],
    );

    // Add placement_trend
    for (let i = 1; i < rawResult.length; i++) {
      const prevYear = rawResult[i - 1];
      const currentYear = rawResult[i];
      rawResult[i]['placement_trend'] =
        currentYear.placement_rate > prevYear.placement_rate
          ? 'UP'
          : currentYear.placement_rate < prevYear.placement_rate
            ? 'DOWN'
            : 'SAME';
    }

    return rawResult;
  }

  // Method to filter colleges by city or state
  async getCollegesByCityAndState(city?: string, state?: string) {
    let query = `
      SELECT 
        college.id AS "College Id", 
        college.name AS "College Name",
        city.name AS "City Name", 
        state.name AS "State Name"
      FROM colleges college
      INNER JOIN cities city ON college.city_id = city.id
      INNER JOIN states state ON college.state_id = state.id
    `;
  
    const parameters: any[] = [];
  
    if (city) {
      query += ` WHERE city.name = $1`;
      parameters.push(city);
    }
  
    if (state) {
      if (parameters.length > 0) {
        query += ` AND state.name = $2`;
        parameters.push(state);
      } else {
        query += ` WHERE state.name = $1`;
        parameters.push(state);
      }
    }
  
    query += ` ORDER BY college.name`;  // You can modify ordering based on your needs
  
    return await this.collegeRepository.query(query, parameters);
  }
  
  

  // Method to fetch college courses by college_id
  async getCollegeCourses(college_id: number) {
    const result = await this.collegeCourseRepository.query(
      `SELECT 
    course.id AS "Course Id", 
    course.course_name AS "Course Name", 
    course.course_duration AS "Duration", 
    course.course_fee AS "Fee", 
    college.name AS "College Name"
   FROM college_wise_course course
   INNER JOIN colleges college ON course.college_id = college.id
   WHERE course.college_id = $1
   ORDER BY course.course_fee DESC`, [college_id]
    );
  
    return result;
  }
  
}
