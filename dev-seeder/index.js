import {
  Server as HyperspaceServer,
  Client as HyperspaceClient
} from 'hyperspace'
import Hyperdrive from 'hyperdrive'
import fs from 'fs'
import storage from 'random-access-memory'

const HOST_ID = 'seeder'

async function buildDrive (client, filePath, content) {
  const drive = new Hyperdrive(client.corestore(), null)
  await drive.promises.ready()
  await drive.promises.writeFile(filePath, content)
  return drive
}

async function main () {
  const server = new HyperspaceServer({
    storage,
    host: HOST_ID
  })
  await server.ready()
  console.log('HyperspaceServer is listening...')

  // Print some client connection/disconnection events.
  server.on('client-open', () => {
    console.log('A HyperspaceClient has connected')
  })
  server.on('client-close', () => {
    console.log('A HyperspaceClient has disconnected')
  })

  const client = new HyperspaceClient({ host: HOST_ID })

  const webappDependency = fs.readFileSync('/app/dev-seeder/webapp-dependency/index.js', 'utf-8')
  const webappDependencyDrive = await buildDrive(client, '/index.js', webappDependency)
  const webappDependencyKey = webappDependencyDrive.key.toString('hex')
  const webapp = fs
    .readFileSync('/app/dev-seeder/webapp/index.html', 'utf-8')
    .replace('{{dependencyKey}}', webappDependencyKey)
  const webappDrive = await buildDrive(client, '/index.html', webapp)
  const webappKey = webappDrive.key.toString('hex')

  console.log('JS MODULE KEY:', webappDependencyKey)
  console.log('WEB APP KEY:', webappKey)

  // Log when the core has any new peers.
  webappDependencyDrive.on('peer-add', () => {
    console.log('(webappDependency) Replicating with a new peer.')
  })

  // Log when the core has any new peers.
  webappDrive.on('peer-add', () => {
    console.log('(webappDrive) Replicating with a new peer.')
  })

  // seed both drives
  await Promise.all([
    client.replicate(webappDependencyDrive.metadata),
    client.replicate(webappDrive.metadata)
  ])

  process.on('SIGINT', cleanup)

  async function cleanup () {
    console.log('Seeder shutting down...')
    await client.close()
    await server.close()
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})