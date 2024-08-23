import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1724407967328 implements MigrationInterface {
  private readonly logger = new Logger(Init1724407967328.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up');

    // Create 'couple' table if it does not exist
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
        );
      `);
    }

    // Create 'user' table if it does not exist
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
        );
      `);
    }

    // Create 'deposit' table if it does not exist
    const depositTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'deposit'
      );
    `);

    if (!depositTableExists[0].exists) {
      await queryRunner.query(`
        CREATE TABLE deposit (
          id SERIAL PRIMARY KEY,
          amount DECIMAL NOT NULL,
          user_id INTEGER,
          couple_id INTEGER,
          FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
          FOREIGN KEY (couple_id) REFERENCES couple(id) ON DELETE CASCADE
        );
      `);
    }

    // Create 'expense' table if it does not exist
    const expenseTableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'expense'
      );
    `);

    if (!expenseTableExists[0].exists) {
      await queryRunner.query(`
        CREATE TABLE expense (
          id SERIAL PRIMARY KEY,
          amount DECIMAL NOT NULL,
          description TEXT,
          user_id INTEGER,
          couple_id INTEGER,
          FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
          FOREIGN KEY (couple_id) REFERENCES couple(id) ON DELETE CASCADE
        );
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Down');

    await queryRunner.query(`DROP TABLE IF EXISTS expense`);
    await queryRunner.query(`DROP TABLE IF EXISTS deposit`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
    await queryRunner.query(`DROP TABLE IF EXISTS couple`);
  }
}
