import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('company', function(table){
        table.increments('id')

        table.text('nomeFantasia').notNullable()
        table.text('razaoSocial').notNullable()
        table.text('CNPJ').notNullable()
        table.text('inscricaoEstadual').notNullable()
        table.text('inscricaoMunicipal').notNullable()
        table.text('codRegimeTributario').notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('update_at').defaultTo(knex.fn.now())
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('company');
}

