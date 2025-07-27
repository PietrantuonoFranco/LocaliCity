"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provincia = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Pais_1 = require("./Pais");
const Localidad_1 = require("./Localidad");
let Provincia = class Provincia extends typeorm_1.BaseEntity {
};
exports.Provincia = Provincia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Provincia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Provincia.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pais_1.Pais, pais => pais.provincias),
    (0, typeorm_1.JoinColumn)({ name: 'pais_id' }),
    __metadata("design:type", Pais_1.Pais)
], Provincia.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Localidad_1.Localidad, localidad => localidad.provincia, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Provincia.prototype, "localidades", void 0);
exports.Provincia = Provincia = __decorate([
    (0, typeorm_1.Entity)()
], Provincia);
