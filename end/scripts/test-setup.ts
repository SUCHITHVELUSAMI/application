// scripts/test-setup.ts
import { createConnection } from 'typeorm';

async function setup() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'touse', // Change this to your PostgreSQL username
    password: 'topass', // Change this to your PostgreSQL password
    database: 'To', // Change this to your test database name
    entities: [__dirname + '/../src/**/*.entity{.ts,.js}'],
    synchronize: true, // Automatically synchronize schema with database
  });

  await connection.close();
}

setup()
  .then(() => console.log('Test database setup complete.'))
  .catch((error) => console.error('Error setting up test database:', error));
