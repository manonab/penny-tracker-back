import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1724407967328 implements MigrationInterface {
  private readonly logger = new Logger(Init1724407967328.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up');
    
    // Check if the 'couple' table already exists
    const coupleTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'couple'
      );
    `);
    
    if (!coupleTableExists[0].exists) {
      await queryRunner.query(`
        CREATE TABLE couple (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL
        )
      `);
    }

    // Check if the 'user' table already exists
    const userTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'user'
      );
    `);
    
    if (!userTableExists[0].exists) {
      await queryRunner.query(`
        CREATE TABLE "user" (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          balance DECIMAL DEFAULT 0,
          couple_id INTEGER,
          FOREIGN KEY (couple_id) REFERENCES couple(id) ON DELETE SET NULL
        )
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down');
    // Add logic to revert migration if necessary
    // For example, drop tables or remove specific data
  }
}
