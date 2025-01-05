
// ---------------------------------------------------
// For postgres db script need to install a dependency
// npm install pg
// ----------------------------------------------------

const { Client } = require("pg");

const createDatabaseAndTables = async () => {
  const dbClient = new Client({
    user: "college_management_4bt4_user", // Replace with your PostgreSQL username
    host: "dpg-ctso5lrqf0us73duv4b0-a.oregon-postgres.render.com", // PostgreSQL server
    database: "college_management_4bt4", // Default database
    // database: "postgres", // Default database
    password: "Ym97YVr0Hf9AjwdsZPFu1q0kh3snfWTg", // Replace with your password
    port: 5432, // Default PostgreSQL port
  });

  try {
    // Connect to PostgreSQL
    await dbClient.connect();
    console.log("Connected to PostgreSQL");

    //   Step 1: Create a new database
    // const dbName = "college_management";
    // await client.query(`CREATE DATABASE ${dbName}`);
    // console.log(`Database "${dbName}" created successfully`);

    //   // Disconnect from the default database
    //   await client.end();

    //   // Step 2: Reconnect to the new database
    //   const dbClient = new Client({
    //     user: "piyush.chauhan", // Replace with your PostgreSQL username
    //     host: "localhost", // PostgreSQL server
    //     database: dbName, // Default database
    //     password: "", // Replace with your password
    //     port: 5432, // Default PostgreSQL port
    //   });

    //   await dbClient.connect();
    //   console.log(`Connected to database "${dbName}"`);

    // Step 3: Create tables
    const createTablesQuery = `
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
      `;

    // await dbClient.query(createTablesQuery);
    // console.log("Tables created successfully");

    // // Close the connection
    // await dbClient.end();
    // console.log("Database setup complete");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
createDatabaseAndTables();
