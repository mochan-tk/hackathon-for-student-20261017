import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  const codespaceHost = process.env.CODESPACE_NAME && process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN
    ? `${process.env.CODESPACE_NAME}-4280.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
    : undefined

  return {
    plugins: [react()],
    server: {
      port: 5173,
      strictPort: true,
      // Codespacesの転送先だけを追加し、通常のローカル実行は既定の許可範囲を使う。
      allowedHosts: codespaceHost ? [codespaceHost] : [],
      // CodespacesのHTTPS転送先からSWA経由でホットリロードする。
      ws: codespaceHost ? { protocol: 'wss', host: codespaceHost, clientPort: 443 } : undefined,
    },
  }
})
