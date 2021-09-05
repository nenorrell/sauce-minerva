NODE=14

build:
	docker run -i --rm --name build-package -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run build