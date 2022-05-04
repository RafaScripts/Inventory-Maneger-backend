import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orcProducts', function(table){
        table.increments('id')
        table.json('products')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('orcProducts');
}

