import { Router, json } from 'express'

export const api = Router()
api.use(json({ limit: '100kb' }))

// 企画に必要なAPIをここへ追加します。秘密のキーはprocess.envから読み込みます。
api.get('/health', (_request, response) => {
  response.json({ status: 'ok' })
})

// 存在しないAPIをフロントエンドのHTMLとして返さないようにします。
api.use((_request, response) => {
  response.status(404).json({ error: 'API not found' })
})
