module.exports = {
    development: {
        client: 'pg',
        version: '14',
        connection: {
            host : '20.226.64.20',
            port : 5432,
            user : 'postgres',
            password : '032211',
            database : 'SysPOS'
        },
        migrations: {
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
}