import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("vendors").del();

    // Inserts seed entries
    await knex("vendors").insert([
        { VendorName: "teste" },
        { VendorName: "teste" }
    ]);
};
