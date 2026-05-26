#!/bin/bash
echo "Starting PostgreSQL..."
docker start taskflow-postgres

echo "Starting Backend..."
cd /workspaces/taskflow/backend
npm run dev &

echo "Starting Frontend..."
cd /workspaces/taskflow/frontend
npm run dev
