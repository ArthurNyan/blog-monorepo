import { defineConfig } from '@hey-api/openapi-ts'

const cmsUrl = process.env.CMS_URL ?? 'http://localhost:1337'
const openApiInputUrl =
  process.env.OPENAPI_INPUT_URL ?? `${cmsUrl}/api/documentation/1.0.0/full_documentation`

export default defineConfig({
  base: cmsUrl,
  input: openApiInputUrl,
  output: {
    path: 'src/shared/api/generated',
    lint: 'eslint',
    format: 'prettier',
  },
  services: { asClass: true },
  plugins: ['@hey-api/client-axios'],
})
