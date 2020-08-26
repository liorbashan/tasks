CREATE TABLE users (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "phone" VARCHAR,
    "groups" VARCHAR,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" timestamptz not null DEFAULT CURRENT_TIMESTAMP
);