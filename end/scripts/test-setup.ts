import { DataSource } from 'typeorm';

async function setup() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'touse', // Your PostgreSQL username
    password: 'topass', // Your PostgreSQL password
    database: 'To', // Your test database name
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'], // Point to entity files
    synchronize: true, // Synchronize schema with the database
  });

  try {
    await dataSource.initialize(); // Initialize connection
    console.log('Test database setup complete.');
  } catch (error) {
    console.error('Error setting up test database:', error);
  } finally {
    await dataSource.destroy(); // Close connection after setup
  }
}

setup();
