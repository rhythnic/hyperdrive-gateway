import { h, text, app } from "https://unpkg.com/hyperapp"

app({
  init: {},
  view: () =>
    h("main", {}, [
      h("h1", {}, text("Web App on Hyperdrive")),
      h("p", {}, text("This is a single page web application that's distributed as a hyperdrive, and it imports an ESM from another hyperdrive."))
    ]),
  node: document.getElementById("app"),
})