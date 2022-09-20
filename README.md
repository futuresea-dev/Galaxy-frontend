# Galaxy frontend

![Gitlab code coverage (specific job)](https://img.shields.io/gitlab/coverage/sms-it/galaxy-frontend/main?job_name=test-coverage%3Acobertura)
## 🚀 Instalace prerekvizit

1. Stáhneme si GIT a CURL 

```sh
sudo apt install git curl
```

2. Pro běh prostředí potřebujeme Node.js >=16.x. Pro stažení můžeme použít nástroj NVM.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

3. Reloadujeme bash a zkontrolujeme zda máme nainstalován NVM

```sh
source ~/.bashrc
```

```sh
nvm --version
```

4. Nainstalujeme Node.js a pokud máme více verzí, nastavíme poslední LTS verzi

```sh
nvm install { číslo verze }
nvm use { číslo verze }
nvm default { číslo verze }
```

5. Zkontrolujeme zda vše funguje

```sh
npm --version
node --version
```
6. Nainstalujeme Yarn

```sh
npm install --global yarn
```

## 🧐 Instalace, tvorba .ENV a spuštění

Instalace
```sh
yarn install
```

Vytvoření .env proměnných
```sh
yarn make-env
```

Spuštění prostředí
```sh
yarn dev
```

## Další příkazy

Spustí automatické opravy dle nastavení litneru

```sh
yarn lint-fix
```

Analýza kódu typescript

```sh
yarn ts-check
```

Spustí unit testy

```sh
# Plugin pro vitest - https://github.com/linux-china/vitest-jetbrains-plugin

yarn test
```

Spustí e2e testy

```sh
# Pokud chceme pouštět e2e testy lokálně je potřeba doinstalovat závislosti (npx playwright install)
yarn e2e-test
```

Coverage status

```sh
yarn coverage
```

Vytvoří produkční prostředí

```sh
yarn build
yarn preview
```

Update balíčků

```sh
yarn allupdate
```


:boom: Experimentální spuštění v dockeru 

Je potřeba být [přihlášený ke 
container registy gitlabu](https://docs.gitlab.com/ee/user/packages/container_registry/#authenticate-with-the-container-registry)
a mít spuštěný backend. Poté běží standardně na portu 3000.

```Sh
make docker-run
```

## Spuštění mock serveru
Zapnutí mock serveru se provádí v souboru **.env** 

## 💫 Deploy
Při změně závislostí se v CI vytváří nový docker image soubor 

## Contributing

Pro detaily k přispívání a dodržování standartů prosím pokračujte na [Contribution guidelines](CONTRIBUTING.MD)
