// ---------------------------------------------------
// For postgres db script need to install a dependency
// npm install pg
// ----------------------------------------------------

const { Client } = require('pg');

const insertData = async () => {
  const dbClient = new Client({
    user: 'piyush.chauhan', // Replace with your PostgreSQL username
    host: 'localhost', // PostgreSQL server
    database: 'college_management', // Default database
    password: '', // Replace with your password
    port: 5432, // Default PostgreSQL port
  });

  try {
    // Connect to PostgreSQL
    await dbClient.connect();
    console.log('Connected to PostgreSQL');

    // Step 3: Create tables
    const insertDataQuery = `
    INSERT INTO States (id, name) VALUES
(1, 'Andhra Pradesh'), (2, 'Arunachal Pradesh'), (3, 'Assam'), (4, 'Bihar'), (5, 'Chhattisgarh'),
(6, 'Goa'), (7, 'Gujarat'), (8, 'Haryana'), (9, 'Himachal Pradesh'), (10, 'Jharkhand'),
(11, 'Karnataka'), (12, 'Kerala'), (13, 'Madhya Pradesh'), (14, 'Maharashtra'), (15, 'Manipur'),
(16, 'Meghalaya'), (17, 'Mizoram'), (18, 'Nagaland'), (19, 'Odisha'), (20, 'Punjab'),
(21, 'Rajasthan'), (22, 'Sikkim'), (23, 'Tamil Nadu'), (24, 'Telangana'), (25, 'Tripura'),
(26, 'Uttar Pradesh'), (27, 'Uttarakhand'), (28, 'West Bengal'), (29, 'Delhi'), (30, 'Chandigarh'),
(31, 'Puducherry'), (32, 'Lakshadweep'), (33, 'Andaman and Nicobar Islands'), (34, 'Dadra and Nagar Haveli'),
(35, 'Daman and Diu'), (36, 'Jammu and Kashmir'), (37, 'Ladakh'), (38, 'Bengaluru Urban'),
(39, 'Hyderabad'), (40, 'Chennai'), (41, 'Mumbai'), (42, 'Kolkata'), (43, 'Lucknow'),
(44, 'Kanpur'), (45, 'Nagpur'), (46, 'Pune'), (47, 'Jaipur'), (48, 'Surat'),
(49, 'Ahmedabad'), (50, 'Patna');
INSERT INTO Cities (id, name) VALUES
(1, 'Visakhapatnam'), (2, 'Itanagar'), (3, 'Guwahati'), (4, 'Patna'), (5, 'Raipur'),
(6, 'Panaji'), (7, 'Ahmedabad'), (8, 'Chandigarh'), (9, 'Shimla'), (10, 'Ranchi'),
(11, 'Bengaluru'), (12, 'Thiruvananthapuram'), (13, 'Bhopal'), (14, 'Mumbai'), (15, 'Imphal'),
(16, 'Shillong'), (17, 'Aizawl'), (18, 'Kohima'), (19, 'Bhubaneswar'), (20, 'Amritsar'),
(21, 'Jaipur'), (22, 'Gangtok'), (23, 'Chennai'), (24, 'Hyderabad'), (25, 'Agartala'),
(26, 'Lucknow'), (27, 'Dehradun'), (28, 'Kolkata'), (29, 'Delhi'), (30, 'Dharamshala'),
(31, 'Puducherry'), (32, 'Kavaratti'), (33, 'Port Blair'), (34, 'Silvassa'),
(35, 'Diu'), (36, 'Srinagar'), (37, 'Leh'), (38, 'Mysuru'),
(39, 'Warangal'), (40, 'Madurai'), (41, 'Thane'), (42, 'Howrah'), (43, 'Varanasi'),
(44, 'Kanpur'), (45, 'Nagpur'), (46, 'Pune'), (47, 'Udaipur'), (48, 'Rajkot'),
(49, 'Gandhinagar'), (50, 'Gaya');
INSERT INTO Colleges (id, name, score, city_id, state_id) VALUES
(1, 'University of California, Los Angeles', 950, 1, 1),
(2, 'Stanford University', 980, 2, 1),
(3, 'Columbia University', 970, 3, 2),
(4, 'Rice University', 890, 4, 3),
(5, 'University of Chicago', 920, 5, 5),
(6, 'California Institute of Technology', 985, 1, 1),
(7, 'New York University', 940, 3, 2),
(8, 'University of Texas at Austin', 910, 4, 3),
(9, 'University of Florida', 870, 1, 4),
(10, 'University of Illinois Urbana-Champaign', 930, 5, 5),
(11, 'Georgia Institute of Technology', 965, 6, 6),
(12, 'Ohio State University', 900, 7, 7),
(13, 'University of Pennsylvania', 960, 8, 8),
(14, 'University of Washington', 955, 9, 9),
(15, 'University of Oregon', 875, 10, 10),
(16, 'University of Nevada, Reno', 850, 11, 11),
(17, 'Arizona State University', 890, 12, 12),
(18, 'University of Michigan', 945, 13, 13),
(19, 'University of Colorado Boulder', 880, 14, 14),
(20, 'Harvard University', 995, 15, 15);
    INSERT INTO College_Placement (id, college_id, year, highest_placement, average_placement, median_placement, placement_rate) VALUES
(1, 1, 2022, 150000, 120000, 100000, 85.5), (2, 1, 2023, 160000, 130000, 110000, 87.0),
(3, 2, 2022, 180000, 140000, 120000, 90.0), (4, 2, 2023, 190000, 150000, 125000, 92.5),
(5, 3, 2022, 170000, 130000, 115000, 88.0), (6, 3, 2023, 175000, 135000, 118000, 89.5),
(7, 4, 2022, 140000, 110000, 95000, 82.0), (8, 4, 2023, 145000, 115000, 98000, 83.5),
(9, 5, 2022, 155000, 125000, 102000, 86.0), (10, 5, 2023, 165000, 135000, 110000, 88.5),
(11, 6, 2022, 200000, 170000, 140000, 95.0), (12, 6, 2023, 210000, 175000, 145000, 97.0),
(13, 7, 2022, 190000, 160000, 135000, 93.0), (14, 7, 2023, 195000, 165000, 138000, 94.0),
(15, 8, 2022, 175000, 145000, 125000, 89.0), (16, 8, 2023, 180000, 150000, 130000, 90.0),
(17, 9, 2022, 165000, 135000, 115000, 88.0), (18, 9, 2023, 170000, 140000, 120000, 89.5),
(19, 10, 2022, 155000, 125000, 105000, 85.0), (20, 10, 2023, 160000, 130000, 110000, 86.5);
        INSERT INTO College_Wise_Course (id, college_id, course_name, course_duration, course_fee) VALUES
(1, 1, 'Computer Science', 4, 200000), (2, 1, 'Data Science', 2, 150000),
(3, 2, 'Engineering', 4, 250000), (4, 2, 'Artificial Intelligence', 2, 220000),
(5, 3, 'Business Administration', 2, 180000), (6, 3, 'Psychology', 4, 170000),
(7, 4, 'Mechanical Engineering', 4, 240000), (8, 4, 'Civil Engineering', 4, 230000),
(9, 5, 'Law', 3, 190000), (10, 5, 'Medical Science', 5, 300000),
(11, 6, 'Aeronautical Engineering', 4, 270000), (12, 6, 'Robotics', 2, 250000),
(13, 7, 'Philosophy', 4, 160000), (14, 7, 'Linguistics', 4, 155000),
(15, 8, 'Economics', 3, 185000), (16, 8, 'Statistics', 3, 180000),
(17, 9, 'Biotechnology', 4, 220000), (18, 9, 'Environmental Science', 4, 210000),
(19, 10, 'Education', 4, 170000);
`;

    await dbClient.query(insertDataQuery);
    console.log('Record Added');

    // Close the connection
    await dbClient.end();
    console.log('Database setup complete');
  } catch (error) {
    console.error('Error:', error.message);
  }
};
insertData();
