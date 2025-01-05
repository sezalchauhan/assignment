import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegesModule } from './colleges/colleges.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://college_management_4bt4_user:Ym97YVr0Hf9AjwdsZPFu1q0kh3snfWTg@dpg-ctso5lrqf0us73duv4b0-a/college_management_4bt4',
      synchronize: true,  // Set to false in production
      logging: true,      // Enable logging if needed
      ssl: {
        rejectUnauthorized: false,  // Disable SSL verification for Render
      },
    }),
    CollegesModule,
  ],
})
export class AppModule {}
