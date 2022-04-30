# Fill In The Blanks Card Game

## Install Node Version Manager (NVM)

### OSx installation

```node
brew install nvm (OSx with Brew installed)
```

### Install Node Version 16.13.0

```node
nvm install 16.13.0
```

(Optional OSx only) Instruct NVM to use the project's required version of Node as set in the `.nvmrc` file (16.13.0)

```node
nvm use
```

## Project setup

```node
npm install
```

### Add environment variables files

Build time environment variables not stored in repo for safety reasons, these may not be the final solution for add variables, just this is how it's usually done!
3 files need adding to root directory alongside `package.json` for example.

- .env.development.local
- .env.mocked.local
- .env.production.local

Sample content below

```local
VITE_APP_TITLE=Fill In The Blanks Card Game
VITE_APP_DEV_TOOLS_ENABLED=true
VITE_APP_I18N_LOCALE=en-GB
VITE_APP_I18N_FALLBACK_LOCALE=en-GB
VITE_APP_VALIDATOR_COUNTRY=en-GB
VITE_APP_BASE_URL=http://127.0.0.1:8080/
VITE_APP_ROOT_PATH=/
VITE_APP_HOST=http://127.0.0.1
VITE_APP_PORT=:8080
```

### Compiles and hot-reloads for development

```node
npm run dev
```

### Unit testing

Unit tests should be located within each component in a folder `tests/unit`.
Snapshots compare current test with previous tests, these are automatically created on first run and added to folder `tests/unit/__snapshots__`.
NOTE:

- Snapshots can be updated when required (see below).
- Unit test snapshots compare code result, not UI, this is handled via Playwright tests

#### Test Commands

- Run all unit tests (test against previous snapshots): `npm run test:unit`
- Run all unit tests (update previous snapshots): `npm run test:unit -- -u`
- Watch a specific unit test (tdd): `npm run test:unit:watch --NameOfTest.spec.js`

### Compiles and minifies for production

```node
npm run build
```

### Compiles, minifies for production and copies assets and setting to website

```node
npm run deploy
```
### Lints and fixes files

```node
npm run lint
```

### Resolve the Git Message "The file will have its original line endings in your working directory"

#### OSx only - Tell Git to convert CRLF to LF on commit but not the other way around by setting core.autocrlf to input

```node
git config --global core.autocrlf input
```

#### Windows only - This converts LF endings into CRLF when you check out code

```node
git config --global core.autocrlf true
```
