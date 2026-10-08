import { test, expect } from '@playwright/test'

// これはスターターの起動確認です。完成した企画の主要フロー・受入条件に合わせて
// 追加または置き換えてください。このテストだけでは成果物の完成を確認できません。
test('スターターが起動し、入力したタイトルを表示できる', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))

  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ハッカソン開発スターター.')
  await expect(page.getByText('準備できました')).toBeVisible()
  await expect(page.getByRole('button', { name: '表示を確認' })).toBeDisabled()

  await page.getByLabel('アプリの仮タイトル').fill('まちの落としものマップ')
  await page.getByRole('button', { name: '表示を確認' }).click()

  await expect(page.getByRole('heading', { name: 'まちの落としものマップ' })).toBeVisible()
  await expect(page.getByRole('status')).toHaveText('「まちの落としものマップ」を表示しました。')
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)
  expect(pageErrors).toEqual([])
})

test('画面URLを直接開け、存在しないアセットはHTMLへ変換されない', async ({ page, request }) => {
  await page.goto('/demo/direct-link')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ハッカソン開発スターター.')
  await page.reload()
  await expect(page.getByText('準備できました')).toBeVisible()

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
