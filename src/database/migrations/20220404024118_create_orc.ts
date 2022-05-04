import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('orc', function(table){
        table.increments('id')

        table.integer('user_id').references('Users.id').defaultTo(null)
        table.integer('products_id').references('orcProducts.id').defaultTo(null)
        table.float('valor_total')

        table.integer('statuss').references('Status.id').defaultTo(1)

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('orc');
}
