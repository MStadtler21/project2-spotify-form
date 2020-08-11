module.exports = {
	"development": {
		"username": process.env.DB_USERNAME,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_DATABASE,
		"host": process.env.DB_HOST,
		"port": process.env.DB_PORT,
		"dialect": "mysql"
	},
	"test": {
		"username": "root",
		"password": "D@l3C00p3r!",
		"database": "database_test",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"production": {
		"use_env_variable": "JAWSDB_URL",
		"username": "q39sj547h2l7d4sb",
		"password": "c53yrg8k18rexug9",
		"database": "zuaaf48fpg6jpvov",
		"host": "ijj1btjwrd3b7932.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
		"dialect": "mysql"
	}
};