console.log(process.env.ORM_PATH, process.env.FILE_TYPE)
module.exports = [
  {
    "type": "postgres",
    "environment": "development",
    "name": "default",
    "url": process.env.DATABASE_URL,
    "entities": [
      `${process.env.ORM_PATH}/modules/**/entities/*.${process.env.FILE_TYPE}`
    ],
    "migrations": [
      `${process.env.ORM_PATH}/database/migrations/*.${process.env.FILE_TYPE}`
    ],
    "seeds": [
      `${process.env.ORM_PATH}/database/seeds/*.${process.env.FILE_TYPE}`
    ],
    "cli": {
      "migrationsDir": "./src/database/migrations"
    }
  },
  {
    "environment": "test",
    "name": "test",
    "type": "better-sqlite3",
    "database": "./src/database/database.sqlite",
    "entities": [
      "./src/modules/**/entities/*.ts"
    ],
    "migrations": [
      "./src/database/migrations/*.ts"
    ],
    "seeds": [
      "./src/database/seeds/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/database/migrations"
    }
  }
]


