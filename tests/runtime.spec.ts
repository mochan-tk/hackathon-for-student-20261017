import { test, expect } from '@playwright/test'

// 配信とAPIの基盤確認です。企画に合わせてスターターの画面を置き換えても残します。
// 画面固有の文言を使わず、SPAの入口と公開してはいけないファイルを確認します。
test('画面URLを直接開け、存在しないアセットはHTMLへ変換されない', async ({ request }) => {
  const entry = await request.get('/', { headers: { Accept: 'text/html' } })
  const directLink = await request.get('/demo/direct-link', { headers: { Accept: 'text/html' } })
  expect(entry.status()).toBe(200)
  expect(directLink.status()).toBe(200)
  expect(directLink.headers()['content-type']).toContain('text/html')
  expect(await directLink.text()).toBe(await entry.text())

  for (const path of ['/assets/missing.js', '/assets/missing', '/missing.css', '/server/index.js', '/.env']) {
    const missingAsset = await request.get(path)
    expect(missingAsset.status(), path).toBe(404)
    expect(missingAsset.headers()['content-type'], path).not.toContain('text/html')
  }
})

test('同じURLのAPIが応答し、未知のAPIや非HTMLのリクエストは画面へ変換されない', async ({ request }) => {
  const health = await request.get('/api/health')
  expect(health.status()).toBe(200)
  expect(health.headers()['content-type']).toContain('application/json')
  expect(await health.json()).toEqual({ status: 'ok' })

  for (const path of ['/api', '/api/missing', '/api/missing.js']) {
    const missingAPI = await request.get(path, { headers: { Accept: 'text/html' } })
    expect(missingAPI.status(), path).toBe(404)
    expect(missingAPI.headers()['content-type'], path).toContain('application/json')
  }

  const wrongMethod = await request.post('/api/health')
  expect(wrongMethod.status()).toBe(404)
  const nonHTML = await request.get('/demo/direct-link', { headers: { Accept: 'application/json' } })
  expect(nonHTML.status()).toBe(404)
})
