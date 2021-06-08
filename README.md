# Hyperdrive Gateway
Gateway for viewing [hyperdrive][hypercore-protocol] websites.

## About

Hyperdrive Gateway is an HTTP/2 server that can serve static websites and single-page web applications
that are contained within a hyperdrive.  A hyperdrive is peer-to-peer folder that can be shared by
it's unique key using tools provided by the [hypercore-protocol team][hypercore-protocol].  Browsers
are only beginning to support these peer-to-peer protocols.  Until browsers support the `hyper://` protocol,
gateways can fetch the web applications from the peer-to-peer network and serve it to the browser.

### How to use the gateway

1.  Create and seed(share) a hyperdrive that contains a static website, using the documentation on the [hypercore protocol site][hypercore-protocol].
    After creating a hyperdrive, you'll receive a unique key that looks like `34f4c3f0bcf6bf5c39d7814d373946d8f04da5b4a525d940c98309cafb111d93`.

2.  Until a public gateway is available, use the [development documentation][development-doc] to start a gateway locally.

3.  Enter your key into the text field on the home page, prefixed by `hyper://`.  You can also use a route to be redirected.
    The route path on the gateway is `/hyper/HYPERDRIVE_KEY/FILE_PATH`.

4.  The gateway will redirect you the unique subdomain for your website.  The hyperdrive address is too long to be used as a subdomain,
    so the gateway converts the hexadecimal address to base32, which is your unique subdomain.

### External Hyperdrive Links

The gateway supports links to other hyperdrives, as well as [ESM imports][mdn-import] from other hyperdrives.  To support this, the gateway
runs a find/replace on all `.html`, `.js`, and `.css` files, replacing all `hyper://` links with `https://` links that point
to the gateway.  If you would like to display a `hyper://` link, immediately wrap the text in an element tag, such as `<span>`.

## Repositories
 - [hyperdrive-gateway][hyperdrive-gateway] - Documentation, local development orchestration, integration testing, CI/CD, docker releases
 - [hyperdrive-gateway-server][hyperdrive-gateway-server] - The gateway server
 - [hyperdrive-gateway-ui][hyperdrive-gateway-ui] - Single-page application front-end

## Docker image

There's a [Hyperdrive Gateway docker image][hyperdrive-gateway-docker-hub] on dockerhub.
The docker image is all that's needed to run an instance of Hyperdrive Gateway and includes the UI.

## Development

[Development documentation][development-doc]


[hyperdrive-gateway]: https://github.com/rhythnic/hyperdrive-gateway
[hyperdrive-gateway-server]: https://github.com/rhythnic/hyperdrive-gateway-server
[hyperdrive-gateway-ui]: https://github.com/rhythnic/hyperdrive-gateway-ui
[hyperdrive-gateway-docker-hub]: https://hub.docker.com/repository/docker/rhythnic/hyperdrive-gateway
[development-doc]: ./docs/development.md
[hypercore-protocol]: https://hypercore-protocol.org/
[mdn-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
