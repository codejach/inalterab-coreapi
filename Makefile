dev:
	docker-compose up
install:
	docker-compose -f docker-compose.builder.yml run --rm install
setup:
	docker volume create node-modules && docker volume create mongo-data
