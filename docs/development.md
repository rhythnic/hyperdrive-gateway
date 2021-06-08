# Hyperdrive Gateway Development

The Hyperdrive Gateway is a full-stack JavaScript application, using Node.js on the server and Svelte for the front-end.
This guide is for orchestrating development using docker-compose.

## Setup

### Repositories
```
git clone git@github.com:rhythnic/hyperdrive-gateway.git
git clone git@github.com:rhythnic/hyperdrive-gateway-server.git
git clone git@github.com:rhythnic/hyperdrive-gateway-ui.git

ln -s ./hyperdrive-gateway-server ./hyperdrive-gateway/hyperdrive-gateway-server
ln -s ./hyperdrive-gateway-ui ./hyperdrive-gateway/hyperdrive-gateway-ui
```

### SSL
The SSL setup relies on a public domain `local.computer` that supports wildcards and resolves to localhost.
There's no need to edit your hosts file.

```
cd hyperdrive-gateway/dev-certs
./generate
cd ..
```

### Start

```
npm run dev
```

If you don't have NPM installed, you can use the docker-compose command from `package.json scripts.dev`

### Use

- **UI** - `https://local.computer:8081`
- **Server** - `https://local.computer:8080`