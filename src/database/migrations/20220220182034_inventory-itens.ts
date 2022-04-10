import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('itens', function(table){
        table.increments('id')
        table.text('reference')

        table.text('name').notNullable()
        table.text('descricao')
        table.text('quantidade')
        table.text('NCM')
        table.text('cEAN')
        table.text('CEST')
        table.float('IPI')

        table.float('value_cust')
        table.float('Value').notNullable()


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

