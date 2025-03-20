import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToEntry1741879370067 implements MigrationInterface {
    name = 'AddCreatedAtToEntry1741879370067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
