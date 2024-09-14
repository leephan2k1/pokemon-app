import { MigrationInterface, QueryRunner } from "typeorm";

export class UPDATEUSEREMAIL1726291436179 implements MigrationInterface {
    name = 'UPDATEUSEREMAIL1726291436179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_226bb9aa7aa8a69991209d58f5"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userName" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_226bb9aa7aa8a69991209d58f5" ON "users" ("userName") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_226bb9aa7aa8a69991209d58f5"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userName" character varying`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_226bb9aa7aa8a69991209d58f5" ON "users" ("userName") `);
    }

}
