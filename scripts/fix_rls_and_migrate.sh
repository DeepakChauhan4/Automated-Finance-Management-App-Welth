#!/bin/bash

# This script disables RLS on users table, runs prisma migrations, then re-enables RLS.
# It handles DATABASE_URL with pgbouncer query parameter by stripping it for psql commands.

# Set your database connection string here or ensure DATABASE_URL is set in environment
if [ -z "$DATABASE_URL" ]; then
  echo "Please set the DATABASE_URL environment variable before running this script."
  exit 1
fi

# Remove ?pgbouncer=true or &pgbouncer=true from DATABASE_URL for psql commands
PSQL_DATABASE_URL=$(echo "$DATABASE_URL" | sed -E 's/(\?|&)pgbouncer=true//')

echo "Disabling RLS on users table..."
psql "$PSQL_DATABASE_URL" -c "ALTER TABLE users DISABLE ROW LEVEL SECURITY;"

echo "Running Prisma migrations..."
npx prisma migrate deploy

MIGRATE_EXIT_CODE=$?

if [ $MIGRATE_EXIT_CODE -ne 0 ]; then
  echo "Prisma migrate deploy failed with exit code $MIGRATE_EXIT_CODE"
  echo "Re-enabling RLS on users table before exiting..."
  psql "$PSQL_DATABASE_URL" -c "ALTER TABLE users ENABLE ROW LEVEL SECURITY;"
  exit $MIGRATE_EXIT_CODE
fi

echo "Re-enabling RLS on users table..."
psql "$PSQL_DATABASE_URL" -c "ALTER TABLE users ENABLE ROW LEVEL SECURITY;"

echo "Migration completed successfully."
