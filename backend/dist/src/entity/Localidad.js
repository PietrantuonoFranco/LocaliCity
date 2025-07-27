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
exports.Localidad = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Provincia_1 = require("./Provincia");
let Localidad = class Localidad extends typeorm_1.BaseEntity {
};
exports.Localidad = Localidad;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Localidad.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Localidad.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Provincia_1.Provincia, provincia => provincia.localidades),
    (0, typeorm_1.JoinColumn)({ name: 'provincia_id' }),
    __metadata("design:type", Provincia_1.Provincia)
], Localidad.prototype, "provincia", void 0);
exports.Localidad = Localidad = __decorate([
    (0, typeorm_1.Entity)()
], Localidad);
