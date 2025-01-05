1. Install Necessary Dependencies
Node.js Setup
Install nvm (Node Version Manager):

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
Install Node.js 22:

nvm install 22
Verify the installation:

node -v  # Should print v22.12.0
nvm current  # Should print v22.12.0
npm -v  # Should print 10.9.0
PostgreSQL Setup
Install pg (PostgreSQL client):

npm install pg
Install TypeORM and NestJS TypeORM Integration:

npm install --save @nestjs/typeorm typeorm pg
Verify PostgreSQL connection by listing the databases:

\dt
To check which process is using port 3000:

sudo lsof -i :3000
2. Project Structure
The project follows a typical NestJS structure:

src/
 ├── colleges/
 │    ├── colleges.controller.ts      # Controller for handling routes related to colleges
 │    ├── colleges.service.ts         # Service for the business logic
 │    ├── college_placement.entity.ts # Entity for college placement data
 │    ├── college_wise_course.entity.ts # Entity for college courses
 │    ├── colleges.entity.ts          # Entity for colleges
 │    └── colleges.module.ts          # Module to integrate colleges components
 ├── main.ts                          # The entry point of the application
 └── app.module.ts                    # The main app module
3. Setting Up PostgreSQL Database
The following SQL schema will create the necessary tables for the College Management System:
    user: "college_management_4bt4_user", // Replace with your PostgreSQL username
    host: "dpg-ctt1k78gph6c738f6bq0-a.oregon-postgres.render.com",
    database: "college_management_axku", // Default database
    // database: "postgres", // Default database
    password: "Ym97YVr0Hf9AjwdsZPFu1q0kh3snfWTg", // Replace with your password
    port: 5432, // Default PostgreSQL port

-- Create tables for States, Cities, Colleges, Placements, and Courses

CREATE TABLE States (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE Colleges (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  score INTEGER CHECK (score BETWEEN 1 AND 1000),
  city_id INTEGER REFERENCES Cities(id),
  state_id INTEGER REFERENCES States(id)
);

CREATE TABLE College_Placement (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES Colleges(id),
  year INTEGER NOT NULL,
  highest_placement DECIMAL(10, 2),
  average_placement DECIMAL(10, 2),
  median_placement DECIMAL(10, 2),
  placement_rate DECIMAL(5, 2)
);

CREATE TABLE College_Wise_Course (
  id SERIAL PRIMARY KEY,
  college_id INTEGER REFERENCES Colleges(id),
  course_name VARCHAR(255) NOT NULL,
  course_duration INTEGER NOT NULL,
  course_fee DECIMAL(10, 2)
);
4. API Endpoints
This API provides the following key endpoints:

1. Get College Data by ID
Endpoint: GET /college_data/:college_id
Description: Retrieves placement data for a specific college.
Response: An array of placement data, including trends.
Example request:


GET /college_data/1
2. Get Colleges by City or State
Endpoint: GET /colleges?city=<city_name>&state=<state_name>
Description: Retrieves colleges filtered by city and/or state.
Response: A list of colleges matching the filters.
Example request:


GET /colleges?city=New York&state=NY
3. Get Courses by College ID
Endpoint: GET /college_courses/:college_id
Description: Retrieves all courses for a specific college, ordered by course fee.
Response: A list of courses, including name, duration, and fee.
Example request:

GET /college_courses/1
5. Running the Application
Install all dependencies:

npm install
Start the server:

npm run start
By default, the server will run on http://localhost:3000.

6. Testing
Install Required Testing Dependencies
To run tests, you'll need to install Jest and Supertest:


npm install --save-dev jest supertest @nestjs/testing
Create Test File
Create a test file in the test/ directory, e.g., app.e2e-spec.ts, with the following content:

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
Configure Jest
Ensure that Jest is configured for E2E tests in the jest-e2e.json file:

{
  "preset": "@nestjs/testing",
  "testEnvironment": "node",
  "testMatch": [
    "**/*.e2e-spec.ts"
  ]
}
Run the Test
Execute the test using the following command:

npm run test:e2e
This will start the server, perform the test, and verify the root endpoint (/) for a 200 OK response and the message Hello World!.

7. Conclusion
This College Management System provides APIs for:

Retrieving detailed college data (including placements)
Filtering colleges by city and state
Fetching courses offered by a specific college
The backend is built using NestJS, and it integrates with PostgreSQL via TypeORM. The project is extendable, allowing you to add more features such as updating/deleting records or adding user authentication.