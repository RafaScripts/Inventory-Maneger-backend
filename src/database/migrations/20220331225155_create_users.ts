import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('Users', function(table){
        table.increments('id')

        table.text('username').notNullable()
        table.text('email').notNullable()
        table.text('password_hash').notNullable()

        table.boolean('Caixa').defaultTo(false)
        table.boolean('Operator').defaultTo(true)
        table.boolean('Provider').defaultTo(false)

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Users');
}

