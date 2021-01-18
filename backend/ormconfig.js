module.exports = [
  {
    "type": "postgres",
    "environment": "development",
    "name": "default",
    "url": process.env.DATABASE_URL,
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


