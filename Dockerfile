FROM mongo:5.0.6
COPY development-user.sh /docker-entrypoint-initdb.d/
