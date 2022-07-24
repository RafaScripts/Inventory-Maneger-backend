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
        return knex.schema.createTable('local', function (table) {
            table.increments('id');
            table.text('logradouro').notNullable();
            table.text('numero').notNullable();
            table.text('complemento').notNullable();
            table.text('bairro').notNullable();
            table.text('municipio').notNullable();
            table.text('codMunicipio').notNullable();
            table.text('uf').notNullable();
            table.text('cUf').notNullable();
            table.text('cep').notNullable();
            table.text('telefone').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('update_at').defaultTo(knex.fn.now());
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('local');
    });
}
exports.down = down;
//# sourceMappingURL=20220319172929_create_company_local.js.map