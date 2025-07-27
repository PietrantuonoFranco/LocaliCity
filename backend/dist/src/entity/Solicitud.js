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
exports.Solicitud = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Pais_1 = require("./Pais");
const Provincia_1 = require("./Provincia");
const Localidad_1 = require("./Localidad");
let Solicitud = class Solicitud extends typeorm_1.BaseEntity {
};
exports.Solicitud = Solicitud;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Solicitud.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Solicitud.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Solicitud.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 45 }),
    __metadata("design:type", String)
], Solicitud.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, usuario => usuario.solicitudes),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", Usuario_1.Usuario)
], Solicitud.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Pais_1.Pais, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'pais_id' }),
    __metadata("design:type", Pais_1.Pais)
], Solicitud.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Provincia_1.Provincia, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'provincia_id' }),
    __metadata("design:type", Provincia_1.Provincia)
], Solicitud.prototype, "provincia", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Localidad_1.Localidad, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'localidad_id' }),
    __metadata("design:type", Localidad_1.Localidad)
], Solicitud.prototype, "localidad", void 0);
exports.Solicitud = Solicitud = __decorate([
    (0, typeorm_1.Entity)()
], Solicitud);
