import { MigrationInterface, QueryRunner } from "typeorm";

export class ADDPOKEMONTABEL1726298197876 implements MigrationInterface {
    name = 'ADDPOKEMONTABEL1726298197876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" integer NOT NULL, "name" character varying(125) NOT NULL, "type1" character varying(64) NOT NULL, "type2" character varying(64) NOT NULL, "image" text NOT NULL, "ytbUrl" text NOT NULL, "total" integer NOT NULL, "hp" integer NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "spAttack" integer NOT NULL, "spDefense" integer NOT NULL, "speed" integer NOT NULL, "generation" integer NOT NULL, "isLegendary" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorite_pokemons_pokemons" ("usersId" uuid NOT NULL, "pokemonsId" integer NOT NULL, CONSTRAINT "PK_c25d38cb7237f4a5a8ebb8b0036" PRIMARY KEY ("usersId", "pokemonsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe5a594bf101d562b8a07c8270" ON "users_favorite_pokemons_pokemons" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_493be51466526141cc70b836c7" ON "users_favorite_pokemons_pokemons" ("pokemonsId") `);
        await queryRunner.query(`ALTER TABLE "users_favorite_pokemons_pokemons" ADD CONSTRAINT "FK_fe5a594bf101d562b8a07c8270c" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorite_pokemons_pokemons" ADD CONSTRAINT "FK_493be51466526141cc70b836c77" FOREIGN KEY ("pokemonsId") REFERENCES "pokemons"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorite_pokemons_pokemons" DROP CONSTRAINT "FK_493be51466526141cc70b836c77"`);
        await queryRunner.query(`ALTER TABLE "users_favorite_pokemons_pokemons" DROP CONSTRAINT "FK_fe5a594bf101d562b8a07c8270c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_493be51466526141cc70b836c7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe5a594bf101d562b8a07c8270"`);
        await queryRunner.query(`DROP TABLE "users_favorite_pokemons_pokemons"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
    }

}
