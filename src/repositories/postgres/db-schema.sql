-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "phone" VARCHAR,
    "spaceId" VARCHAR NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spaces (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" VARCHAR NOT NULL UNIQUE,
    "description" VARCHAR NULL,
    "imageUrl" VARCHAR NULL
)

CREATE TABLE shoppingLists (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" VARCHAR NOT NULL UNIQUE,
    "description" VARCHAR NULL,
    "spaceId" uuid NOT NULL REFERENCES spaces
)

CREATE TABLE shoppingItems (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" VARCHAR NOT NULL UNIQUE,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" VARCHAR NULL,
    "shoppingListId" uuid NOT NULL REFERENCES shoppingLists
)

CREATE TABLE tasks (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" VARCHAR NOT NULL UNIQUE,
    "description" VARCHAR NULL,
    "spaceId" uuid NOT NULL REFERENCES spaces,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMPTZ NULL,
    "dueDate" TIMESTAMPTZ NULL,
    "userId" uuid NOT NULL REFERENCES users
)