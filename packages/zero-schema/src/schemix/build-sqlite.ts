import { createSchema } from 'schemix'
import fse from 'fs-extra'
import path from 'node:path'

const outputDir = 'dist'
fse.ensureDir(outputDir).then(() => {
  createSchema({
    basePath: path.join(__dirname),
    datasource: {
      provider: 'sqlite',
      url: { env: 'DATABASE_URL' },
      relationMode: 'prisma',
    },
    generator: {
      provider: 'prisma-client-js',
    },
  }).export('dist', 'sqlite')
})
