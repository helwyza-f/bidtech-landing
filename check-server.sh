#!/usr/bin/env bash
# Cek isi DB production & env config bidtech.
# Pakai: bash check-server.sh
set -u
HOST="root@212.85.26.8"

REMOTE_CMD='
echo "=== ENV: bidtech-api.env (tanpa nilai sensitif) ==="
grep -E "^[A-Z_]+=" /root/bidtech-api.env 2>/dev/null | sed -E "s/(PASSWORD|SECRET|HASH|TOKEN|KEY)=.*/\1=***REDACTED***/"
echo
echo "=== ENV: bidtech-api-db.env ==="
grep -E "^[A-Z_]+=" /root/bidtech-api-db.env 2>/dev/null | sed -E "s/(PASSWORD|SECRET|HASH|TOKEN|KEY)=.*/\1=***REDACTED***/"
echo
echo "=== ENV: bidtech-frontend.env ==="
grep -E "^[A-Z_]+=" /root/bidtech-frontend.env 2>/dev/null | sed -E "s/(PASSWORD|SECRET|HASH|TOKEN|KEY)=.*/\1=***REDACTED***/"
echo
echo "=== ADMIN INFO FILE ==="
ls -la /root/bidtech-api-admin.txt 2>/dev/null
echo "(isi file tidak ditampilkan — buka manual kalau perlu)"
echo
echo "=== DEPLOY FOLDER /opt/bidtech-api ==="
ls -la /opt/bidtech-api 2>/dev/null
echo
echo "=== DEPLOY FOLDER /opt/bidtech-frontend ==="
ls -la /opt/bidtech-frontend 2>/dev/null
echo
echo "=== DB TABLES ==="
DB_USER=$(grep -E "^POSTGRES_USER=" /root/bidtech-api-db.env 2>/dev/null | cut -d= -f2)
DB_NAME=$(grep -E "^POSTGRES_DB=" /root/bidtech-api-db.env 2>/dev/null | cut -d= -f2)
DB_USER=${DB_USER:-bidtech_admin}
DB_NAME=${DB_NAME:-bidtech_admin}
echo "user=$DB_USER  db=$DB_NAME"
docker exec BidTech-API-Db psql -U "$DB_USER" -d "$DB_NAME" -c "\dt"
echo
echo "=== ROW COUNTS ==="
docker exec BidTech-API-Db psql -U "$DB_USER" -d "$DB_NAME" -t -c "
  SELECT tablename, (xpath('\''/row/cnt/text()'\'', xml_count))[1]::text::int AS cnt
  FROM (SELECT tablename, query_to_xml(format('\''SELECT COUNT(*) AS cnt FROM %I'\'', tablename), false, true, '\'''\'') AS xml_count
        FROM pg_tables WHERE schemaname='\''public'\'') t
  ORDER BY tablename;"
echo
echo "=== UKURAN DB ==="
docker exec BidTech-API-Db psql -U "$DB_USER" -d "$DB_NAME" -c "SELECT pg_size_pretty(pg_database_size('"'"'$DB_NAME'"'"'));"
echo
echo "=== BACKEND LOG (10 baris terakhir) ==="
docker logs --tail 10 BidTech-API 2>&1
'

ssh "$HOST" "$REMOTE_CMD"
