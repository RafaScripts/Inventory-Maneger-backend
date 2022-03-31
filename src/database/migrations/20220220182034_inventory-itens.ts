import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('itens', function(table){
        table.increments('id')

        table.text('name').notNullable()
        table.text('descricao').notNullable()
        table.text('total').notNullable()
        table.text('NCM').notNullable()
        table.text('cEAN').notNullable()
        table.text('CEST').notNullable()

        table.integer('value_cust')
        table.integer('Value').notNullable()


        table.integer('vendor_id')
            .references('vendors.id')
            .onDelete('SET NULL')

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('itens');
}

