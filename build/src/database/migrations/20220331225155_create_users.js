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
        return knex.schema.createTable('Users', function (table) {
            table.increments('id');
            table.text('username').notNullable();
            table.text('email').notNullable();
            table.text('password_hash').notNullable();
            table.boolean('Caixa').defaultTo(false);
            table.boolean('Operator').defaultTo(true);
            table.boolean('Provider').defaultTo(false);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('update_at').defaultTo(knex.fn.now());
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable('Users');
    });
}
exports.down = down;
//# sourceMappingURL=20220331225155_create_users.js.map