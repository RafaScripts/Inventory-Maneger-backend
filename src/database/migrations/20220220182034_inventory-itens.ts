import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('itens', function(table){
        table.increments('id')

        table.text('name').notNullable()
        table.text('total').notNullable()

        table.integer('vendor_id')
            .references('vendors.id')
            .notNullable()
            .onDelete('CASCADE')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('itens');
}

