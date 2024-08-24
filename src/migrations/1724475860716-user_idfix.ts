import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserIdfix1724475860716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Ajouter une nouvelle colonne temporaire avec UUID dans user
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "uuid" UUID DEFAULT gen_random_uuid();
        `);

    // 2. Copier les données de l'ancienne colonne id vers la nouvelle colonne uuid
    await queryRunner.query(`
            UPDATE "user" SET "uuid" = gen_random_uuid();
        `);

    // 3. Ajouter une nouvelle colonne userId de type UUID dans deposit et expense
    await queryRunner.query(`
            ALTER TABLE "deposit"
            ADD COLUMN "userUuid" UUID;
        `);
    await queryRunner.query(`
            ALTER TABLE "expense"
            ADD COLUMN "userUuid" UUID;
        `);

    // 4. Copier les données de userId (integer) vers userUuid (UUID) en utilisant une jointure
    await queryRunner.query(`
            UPDATE "deposit" d
            SET "userUuid" = u."uuid"
            FROM "user" u
            WHERE d."userId" = u."id";
        `);
    await queryRunner.query(`
            UPDATE "expense" e
            SET "userUuid" = u."uuid"
            FROM "user" u
            WHERE e."userId" = u."id";
        `);

    // 5. Supprimer les contraintes et les colonnes userId (integer)
    await queryRunner.query(`
            ALTER TABLE "deposit" DROP CONSTRAINT "FK_user_deposit";
        `);
    await queryRunner.query(`
            ALTER TABLE "expense" DROP CONSTRAINT "FK_user_expense";
        `);
    await queryRunner.query(`
            ALTER TABLE "deposit" DROP COLUMN "userId";
        `);
    await queryRunner.query(`
            ALTER TABLE "expense" DROP COLUMN "userId";
        `);

    // 6. Renommer userUuid en userId
    await queryRunner.query(`
            ALTER TABLE "deposit" RENAME COLUMN "userUuid" TO "userId";
        `);
    await queryRunner.query(`
            ALTER TABLE "expense" RENAME COLUMN "userUuid" TO "userId";
        `);

    // 7. Supprimer la contrainte de clé primaire existante sur user avec CASCADE
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "user_pkey" CASCADE;
        `);

    // 8. Supprimer la colonne id existante et renommer uuid en id
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id";
        `);
    await queryRunner.query(`
            ALTER TABLE "user" RENAME COLUMN "uuid" TO "id";
        `);

    // 9. Ajouter la contrainte de clé primaire sur la colonne id
    await queryRunner.query(`
            ALTER TABLE "user" ADD PRIMARY KEY ("id");
        `);

    // 10. Ajouter les nouvelles contraintes de clé étrangère pour userId
    await queryRunner.query(`
            ALTER TABLE "deposit" ADD CONSTRAINT "FK_user_deposit" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;
        `);
    await queryRunner.query(`
            ALTER TABLE "expense" ADD CONSTRAINT "FK_user_expense" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Inversez les étapes ci-dessus
    await queryRunner.query(`
            ALTER TABLE "deposit" DROP CONSTRAINT "FK_user_deposit";
        `);
    await queryRunner.query(`
            ALTER TABLE "expense" DROP CONSTRAINT "FK_user_expense";
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "user_pkey";
        `);
    await queryRunner.query(`
            ALTER TABLE "user" ADD COLUMN "id" SERIAL PRIMARY KEY;
        `);
  }
}
