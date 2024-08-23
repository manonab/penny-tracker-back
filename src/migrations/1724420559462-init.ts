import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1724420559462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Couple Table
    await queryRunner.query(`
            CREATE TABLE "couple" (
              "id" SERIAL PRIMARY KEY,
              "name" VARCHAR(255) NOT NULL
            )
          `);
    // Create User Table
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) UNIQUE NOT NULL,
        "password" VARCHAR(255) NOT NULL,
        "balance" DECIMAL(10, 2) DEFAULT 0,
        "coupleId" INTEGER,
        CONSTRAINT "FK_couple_user" FOREIGN KEY ("coupleId") REFERENCES "couple" ("id") ON DELETE SET NULL
      )
    `);

    // Create Deposit Table
    await queryRunner.query(`
      CREATE TABLE "deposit" (
        "id" SERIAL PRIMARY KEY,
        "amount" DECIMAL(10, 2) NOT NULL,
        "userId" INTEGER,
        "coupleId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_user_deposit" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL,
        CONSTRAINT "FK_couple_deposit" FOREIGN KEY ("coupleId") REFERENCES "couple" ("id") ON DELETE SET NULL
      )
    `);

    // Create Expense Table
    await queryRunner.query(`
      CREATE TABLE "expense" (
        "id" SERIAL PRIMARY KEY,
        "amount" DECIMAL(10, 2) NOT NULL,
        "description" VARCHAR(255) NOT NULL,
        "userId" INTEGER,
        "coupleId" INTEGER,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FK_user_expense" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL,
        CONSTRAINT "FK_couple_expense" FOREIGN KEY ("coupleId") REFERENCES "couple" ("id") ON DELETE SET NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "expense"`);
    await queryRunner.query(`DROP TABLE "deposit"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "couple"`);
  }
}
