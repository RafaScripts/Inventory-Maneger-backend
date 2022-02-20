module.exports = {
    development: {
        client: 'pg',
        version: '14',
        connection: {
            host : '159.223.111.47',
            port : 5432,
            user : 'postgres',
            password : '032211',
            database : 'inventory'
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
}