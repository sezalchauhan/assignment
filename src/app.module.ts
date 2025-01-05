import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegesModule } from './colleges/colleges.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://college_management_axku_user:kGcHh4VvQeo2AcpNF1uPdVirKVLHyNxl@dpg-ctt1k78gph6c738f6bq0-a/college_management_axku',
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
