#!/bin/bash

# Script to disable RLS on users table, run prisma migrations, then re-enable RLS
# Assumes no password in connection string and no pgbouncer param

# Construct connection string without password and pgbouncer param
DB_USER="welth"
DB_HOST="aws-0-ap-southeast-1.pooler.supabase.com"
DB_PORT="6543"
DB_NAME="postgres"

PSQL_CONN="postgresql://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "Disabling RLS on users table..."
psql "$PSQL_CONN" -c "ALTER TABLE users DISABLE ROW LEVEL SECURITY;"

echo "Running Prisma migrations..."
npx prisma migrate deploy

MIGRATE_EXIT_CODE=$?

if [ $MIGRATE_EXIT_CODE -ne 0 ]; then
  echo "Prisma migrate deploy failed with exit code $MIGRATE_EXIT_CODE"
  echo "Re-enabling RLS on users table before exiting..."
  psql "$PSQL_CONN" -c "ALTER TABLE users ENABLE ROW LEVEL SECURITY;"
  exit $MIGRATE_EXIT_CODE
fi

echo "Re-enabling RLS on users table..."
psql "$PSQL_CONN" -c "ALTER TABLE users ENABLE ROW LEVEL SECURITY;"

echo "Migration completed successfully."
