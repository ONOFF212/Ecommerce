import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedMigration1791997034453 implements MigrationInterface {
    name = 'UpdatedMigration1791997034453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_30cd0bbcd1dcae7673af7888eb8"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_98e6581ca926533815b4a858701"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hashed_password"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rolesId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "rolesId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hashed_password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_98e6581ca926533815b4a858701" UNIQUE ("hashed_password")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_30cd0bbcd1dcae7673af7888eb8" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
