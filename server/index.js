import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { api } from './api.js'

const development = process.argv.includes('--dev')
const preview = process.argv.includes('--preview')
const port = Number(process.env.PORT ?? (development ? 4280 : preview ? 4281 : 8080))
const host = process.env.HOST ?? '127.0.0.1'
const root = fileURLToPath(new URL('../', import.meta.url))

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535')
}

const app = express()
app.disable('x-powered-by')
const httpServer = createServer(app)
let vite

if (development) {
  // 開発だけViteを読み込みます。本番コンテナには開発用の依存関係は不要です。
  const { createServer: createViteServer } = await import('vite')
  vite = await createViteServer({
    root,
    // Nodeのwatchが一時的な設定ファイルの生成・削除で再起動し続けるのを避けます。
    configLoader: 'runner',
    appType: 'custom',
    server: {
      middlewareMode: true,
      ws: { server: httpServer },
    },
  })
  app.use(vite.middlewares)
}

// 開発時はViteのHost検証をAPIにも通してからルーティングします。
app.use('/api', api)
if (!development) app.use(express.static(join(root, 'dist')))

// SPAの画面URLを直接開く場合だけindex.htmlを返します。
// API・アセット・非HTMLリクエストには通常の404を返します。
app.use(async (request, response, next) => {
  const isPage = ['GET', 'HEAD'].includes(request.method)
    && request.accepts('html')
    && (!extname(request.path) || request.path === '/index.html')
    && !request.path.split('/').some((segment) => segment.startsWith('.'))
    && !/^\/assets(?:\/|$)/.test(request.path)

  if (!isPage) return next()

  if (development) {
    const template = await readFile(join(root, 'index.html'), 'utf8')
    const html = await vite.transformIndexHtml(request.originalUrl, template)
    response.type('html').send(html)
  } else {
    response.sendFile('index.html', { root: join(root, 'dist') })
  }
})

app.use((_request, response) => {
  response.status(404).type('text').send('Not found')
})

httpServer.listen(port, host, () => {
  console.log(`App running at http://${host}:${port}`)
})

let stopping = false
async function stop() {
  if (stopping) return
  stopping = true
  const timeout = setTimeout(() => process.exit(1), 10_000)
  timeout.unref()
  await vite?.close()
  httpServer.close(() => process.exit(0))
}

process.on('SIGTERM', stop)
process.on('SIGINT', stop)
