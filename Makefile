.PHONY: docker-build docker-run

IMAGE=registry.gitlab.com/sms-it/galaxy-frontend
TAG=main

.env:
	cp -r .env.dist .env

.env.playwright:
	cp -r .env.playwright.dist .env.playwright

docker-build:
	docker build --pull --cache-from=${IMAGE}:${TAG} -t ${IMAGE}:${TAG} .
	docker push ${IMAGE}:${TAG}

docker-run:
	docker rm galaxy-ui || true
	docker run -ti -e API_URL=http://localhost:8081/api/v1/ -e ENABLE_MOCK=false -p 3000:80 --name=galaxy-ui ${IMAGE}:${TAG}

docker-e2e:
	docker rm galaxy-ui-e2e || true
	docker run -ti -e UI_URL=http://localhost:3000 -e USERNAME=username -e PASSWORD=password -v $$PWD:/var/www/html -w /var/www/html --name galaxy-ui-e2e mcr.microsoft.com/playwright:focal
