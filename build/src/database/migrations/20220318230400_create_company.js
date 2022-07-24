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
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable('company', function (table) {
            table.increments('id');
            table.text('nomeFantasia').notNullable();
            table.text('razaoSocial').notNullable();
            table.text('CNPJ').notNullable();
            table.text('inscricaoEstadual').notNullable();
            table.text('inscricaoMunicipal').notNullable();
            table.text('codRegimeTributario').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('update_at').defaultTo(knex.fn.now());
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('company');
    });
}
exports.down = down;
//# sourceMappingURL=20220318230400_create_company.js.map