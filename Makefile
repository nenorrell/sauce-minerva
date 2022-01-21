NODE=14
UNIT_TEST := "tests/**/*.test.ts"

build:
	docker run -i --rm --name build-package -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run build

install:
	docker run -i --rm --name install-minerva -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm install ${PCKG}

lint:
	docker run -i --rm --name lint-minerva -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run lint

lint-fix:
	docker run -i --rm --name lint-fix-minerva -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run lint:fix

publish:
	npm publish --access=public

test: install compile-test unit_test

compile-test:
	docker run -i --rm --name compile-minerva -e NODE_ENV=production -u "node" -v `pwd`:/usr/src/app -w /usr/src/app node:${NODE} npm run test-compile

unit_test:
	docker run -i --rm -p "9199:9200" \
	-e JWT_PRIVATE="Test-private-key" \
	-v `pwd`:/usr/src/app \
	-w /usr/src/app node:${NODE} \
	node_modules/.bin/nyc --reporter=cobertura --report-dir=./coverage-unit \
	node_modules/.bin/mocha \
	--require ts-node/register \
	$(UNIT_TEST) -R spec --color --verbose