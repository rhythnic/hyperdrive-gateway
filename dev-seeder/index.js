import Corestore from 'corestore'
import Networker from '@corestore/networker'
import Hyperdrive from 'hyperdrive'
import fs from 'fs'
import storage from 'random-access-memory'

async function main () {
  const corestore = new Corestore(storage)
  await corestore.ready()
  const networker = new Networker(corestore)

  // Create a drive for a JS module
  const jsModuleDrive = new Hyperdrive(corestore, null)
  await jsModuleDrive.promises.ready()
  const jsModuleContent = fs.readFileSync('/app/dev-seeder/webapp-dependency/index.js', 'utf-8')
  await jsModuleDrive.promises.writeFile('/index.js', jsModuleContent)
  
  // Create a drive for a single page application that uses the JS module
  const webappContent = fs.readFileSync('/app/dev-seeder/webapp/index.html', 'utf-8')
  const webappDrive = new Hyperdrive(corestore, null)
  await webappDrive.promises.ready()
  await webappDrive.promises.writeFile('/index.html', webappContent)
  await webappDrive.promises.mount('/jsModule', jsModuleDrive.key)

  console.log('WEB APP KEY:', webappDrive.key.toString('hex'))

  // Log when the core has any new peers.
  jsModuleDrive.on('peer-add', () => {
    console.log('(webappDependency) Replicating with a new peer.')
  })

  // Log when the core has any new peers.
  webappDrive.on('peer-add', () => {
    console.log('(webappDrive) Replicating with a new peer.')
  })

  // seed both drives
  await Promise.all([
    networker.configure(jsModuleDrive.discoveryKey, { announce: true, lookup: false }),
    networker.configure(webappDrive.discoveryKey, { announce: true, lookup: false })
  ])

  process.on('SIGINT', cleanup)

  async function cleanup () {
    console.log('Seeder shutting down...')
    await networker.close()
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})