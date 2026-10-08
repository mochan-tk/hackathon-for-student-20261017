import { test, expect } from '@playwright/test'

// これはスターターの起動確認です。完成した企画の主要フロー・受入条件に合わせて
// 追加または置き換えてください。runtime.spec.tsの配信・APIの基盤確認は残します。
// このテストだけでは成果物の完成を確認できません。
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
