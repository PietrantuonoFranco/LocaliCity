"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1756062767515 = void 0;
class InitialSchema1756062767515 {
    constructor() {
        this.name = 'InitialSchema1756062767515';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "localidad" ("id" SERIAL NOT NULL, "nombre" character varying(45) NOT NULL, "provincia_id" integer, CONSTRAINT "PK_e76c026cd7c5842719b7a3901ae" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "provincia" ("id" SERIAL NOT NULL, "nombre" character varying(45) NOT NULL, "pais_id" integer, CONSTRAINT "PK_d30aa9eff4e019f83505484187f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "pais" ("id" SERIAL NOT NULL, "nombre" character varying(45) NOT NULL, CONSTRAINT "PK_a362c5bbbefe39c9187406b1917" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "solicitud" ("id" SERIAL NOT NULL, "tipo" character varying(45) NOT NULL, "mensaje" character varying(255) NOT NULL, "referencia" character varying(45) NOT NULL, "nombre" character varying(45) NOT NULL, "estado" character varying(45) NOT NULL, "usuario_id" integer NOT NULL, "pais_id" integer, "provincia_id" integer, "localidad_id" integer, CONSTRAINT "PK_511b9da509891c4d75633b5079c" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "email" character varying(45) NOT NULL, "nombre" character varying(45) NOT NULL, "apellido" character varying(45) NOT NULL, "contrasenia" character varying(255) NOT NULL, "rol_id" integer, CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE ("email"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "rol" ("id" SERIAL NOT NULL, "nombre" character varying(45) NOT NULL, CONSTRAINT "UQ_9792c580a992d554ee1621c5b45" UNIQUE ("nombre"), CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "localidad" ADD CONSTRAINT "FK_73f5c59766a3b0aa183581fde91" FOREIGN KEY ("provincia_id") REFERENCES "provincia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "provincia" ADD CONSTRAINT "FK_58a91a7d607e71245ff1991d673" FOREIGN KEY ("pais_id") REFERENCES "pais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_8a8f11241ef8efc7fbbfa9b3258" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_e97e781993a1b3a3af4b721ed6d" FOREIGN KEY ("pais_id") REFERENCES "pais"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_2d95c984842b4f8a134f8ae50cd" FOREIGN KEY ("provincia_id") REFERENCES "provincia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "solicitud" ADD CONSTRAINT "FK_00875640d8ab2a477bb392306d4" FOREIGN KEY ("localidad_id") REFERENCES "localidad"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533" FOREIGN KEY ("rol_id") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_6c336b0a51b5c4d22614cb02533"`);
            yield queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_00875640d8ab2a477bb392306d4"`);
            yield queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_2d95c984842b4f8a134f8ae50cd"`);
            yield queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_e97e781993a1b3a3af4b721ed6d"`);
            yield queryRunner.query(`ALTER TABLE "solicitud" DROP CONSTRAINT "FK_8a8f11241ef8efc7fbbfa9b3258"`);
            yield queryRunner.query(`ALTER TABLE "provincia" DROP CONSTRAINT "FK_58a91a7d607e71245ff1991d673"`);
            yield queryRunner.query(`ALTER TABLE "localidad" DROP CONSTRAINT "FK_73f5c59766a3b0aa183581fde91"`);
            yield queryRunner.query(`DROP TABLE "rol"`);
            yield queryRunner.query(`DROP TABLE "usuario"`);
            yield queryRunner.query(`DROP TABLE "solicitud"`);
            yield queryRunner.query(`DROP TABLE "pais"`);
            yield queryRunner.query(`DROP TABLE "provincia"`);
            yield queryRunner.query(`DROP TABLE "localidad"`);
        });
    }
}
exports.InitialSchema1756062767515 = InitialSchema1756062767515;
