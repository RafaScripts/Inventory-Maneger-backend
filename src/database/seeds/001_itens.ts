import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("itens").del();

    // Inserts seed entries
    await knex("itens").insert([
        { name: "teste", total: "1", vendor_id: 1 },
        { name: "teste", total: "1", vendor_id: 2 },
        { name: "teste", total: "1", vendor_id: 1 }
    ]);
};
