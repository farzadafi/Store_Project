#!/bin/bash
set -e

if [ -n "$MONGO_INITDB_ROOT_USERNAME" ] && [ -n "$MONGO_INITDB_ROOT_PASSWORD" ]; then
    mongo -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase "admin" <<EOF
        use admin;
        db.createUser({
            user: "mongo",
            pwd: "mongo",
            roles: [
                { role: "readWrite", db: "admin" }
            ]
        });
EOF
fi

if [ -n "$MONGO_INITDB_DATA_FILE" ]; then
    mongoimport --host localhost -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase admin --db admin --collection category --file /home/farzad/data.json --jsonArray
fi

exec "$@"
