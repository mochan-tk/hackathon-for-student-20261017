import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

export default function App() {
  const [draftTitle, setDraftTitle] = useState('')
  const [displayedTitle, setDisplayedTitle] = useState('あなたのアイデア')
  const [hasSubmitted, setHasSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = draftTitle.trim()

    if (!title) return

    setDisplayedTitle(title)
    setHasSubmitted(true)
  }

  return (
    <div className="page-shell">
      <a className="skip-link" href="#main">本文へ移動</a>

      <header className="site-header">
        <div className="wordmark">
          <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span>STUDENT HACKATHON</span>
        </div>
        <span className="ready-badge"><span aria-hidden="true" />準備できました</span>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">YOUR NEXT IDEA STARTS HERE</p>
          <h1 id="page-title">ハッカソン<br />開発スターター<span aria-hidden="true">.</span></h1>
          <p className="hero-message">アイデアを、動くかたちに。</p>
          <p className="hero-description">
            開発環境の準備は完了です。まずは小さく試して、<br className="desktop-break" />
            ここから自分たちのアプリをつくっていきましょう。
          </p>
        </section>

        <section className="try-card" aria-labelledby="try-title">
          <div className="try-content">
            <p className="section-label"><span aria-hidden="true">01</span> 動作を試す</p>
            <h2 id="try-title">まずは、名前をつけてみよう。</h2>
            <p className="section-description">入力した文字が、プレビューカードに表示されます。</p>

            <form onSubmit={handleSubmit}>
              <label htmlFor="app-title">アプリの仮タイトル</label>
              <div className="input-row">
                <input
                  id="app-title"
                  name="app-title"
                  value={draftTitle}
                  onChange={(event) => setDraftTitle(event.target.value)}
                  placeholder="例：まちの落としものマップ"
                  maxLength={50}
                  required
                  aria-describedby="input-help"
                />
                <button type="submit" disabled={!draftTitle.trim()}>
                  表示を確認<span aria-hidden="true">↗</span>
                </button>
              </div>
              <p id="input-help" className="input-help">仮の名前で大丈夫。あとから自由に変えられます。</p>
            </form>
          </div>

          <div className="preview-area">
            <div className="idea-preview">
              <span className="preview-label">FIRST PROTOTYPE</span>
              <span className="idea-mark" aria-hidden="true">✦</span>
              <h3>{displayedTitle}</h3>
              <p>最初の一歩から、<br />新しい体験がはじまる。</p>
            </div>
            <p className="preview-status" role="status" aria-live="polite">
              {hasSubmitted
                ? `「${displayedTitle}」を表示しました。`
                : 'タイトルを入力して、表示を確認してみましょう。'}
            </p>
          </div>
        </section>

        <section className="next-section" aria-labelledby="next-title">
          <div className="next-heading">
            <p className="section-label"><span aria-hidden="true">02</span> 自分たちのアイデアへ</p>
            <h2 id="next-title">この画面を、スタート地点に。</h2>
          </div>
          <div className="edit-guides">
            <article>
              <span className="guide-icon" aria-hidden="true">↗</span>
              <h3>画面と動きを変える</h3>
              <p>企画に合わせて、文字・入力・操作をつくっていきましょう。</p>
              <code>src/App.tsx</code>
            </article>
            <article>
              <span className="guide-icon" aria-hidden="true">◐</span>
              <h3>見た目を整える</h3>
              <p>色や余白を変えて、使う人に伝わる画面にしましょう。</p>
              <code>src/App.css</code>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>考える。つくる。試す。伝える。</p>
        <span>BUILD SOMETHING THAT MATTERS TO YOU.</span>
      </footer>
    </div>
  )
}
