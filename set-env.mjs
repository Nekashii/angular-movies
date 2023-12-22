import 'dotenv/config'
import { writeFileSync } from 'fs'

const env = `export const environment = {
  token: '${process.env['API_TOKEN']}'
}
`
writeFileSync('./src/environments/environment.ts', env)
