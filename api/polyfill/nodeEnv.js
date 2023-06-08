import fs from 'fs'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

// Set Package Name and Version in case these are filtered out for any reason
if (!process.env.npm_package_name) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const packageJSOnPath = path.resolve(__dirname, '../../package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJSOnPath))

  const { name, version } = packageJson
  const service = `${name}@${version}`

  process.env.npm_package_name = name
  process.env.npm_package_version = version
  process.env.SERVICE = service
}
