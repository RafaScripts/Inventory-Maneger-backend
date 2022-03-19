import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('local', function(table){
        table.increments('id')

        table.text('logradouro').notNullable()
        table.text('numero').notNullable()
        table.text('complemento').notNullable()
        table.text('bairro').notNullable()
        table.text('municipio').notNullable()
        table.text('codMunicipio').notNullable()
        table.text('uf').notNullable()
        table.text('cUf').notNullable()
        table.text('cep').notNullable()
        table.text('telefone').notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('local');
}

