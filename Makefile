NODE=14

build:
	docker run -i --rm --name build-package -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run build

install:
	docker run -i --rm --name install-minerva -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm install ${PCKG}

lint:
	docker run -i --rm --name lint-minerva -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run lint

lint-fix:
	docker run -i --rm --name lint-fix-minerva -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run lint:fix