all:
	@echo "usage: 'make build' or 'make run'"

build:
	sudo docker rm -f iq-game || true
	sudo docker build --tag iq-game:latest .

run:
	sudo docker rm -f iq-game || true
	sudo docker run --privileged -d \
		--name=iq-game \
		--memory=4096m \
		--net container:tf \
		iq-game:latest