import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('College_Placement')
export class CollegePlacement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  college_id: number;

  @Column()
  year: number;

  @Column('decimal', { precision: 10, scale: 2 })
  highest_placement: number;

  @Column('decimal', { precision: 10, scale: 2 })
  average_placement: number;

  @Column('decimal', { precision: 10, scale: 2 })
  median_placement: number;

  @Column('decimal', { precision: 5, scale: 2 })
  placement_rate: number;
}
