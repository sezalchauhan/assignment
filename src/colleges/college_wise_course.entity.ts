import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { College } from './colleges.entity';  // Ensure the correct path for your College entity

@Entity('college_wise_course')
export class CollegeCourse {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  college_id: number;

  @ManyToOne(() => College, college => college.id)
  @JoinColumn({name:"name",  referencedColumnName: "id" })
  college: College;



  @Column({ type: 'varchar', length: 255, nullable: false })
  course_name: string;

  @Column({ type: 'int', nullable: false })
  course_duration: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  course_fee: number;
}
