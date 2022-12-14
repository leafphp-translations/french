/// <reference types="vitepress/client" />
/// <reference types="vue/macros-global" />

declare module '@leafphp/docs-theme/config' {
  import { UserConfig } from 'vitepress'
  const config: () => Promise<UserConfig>
  export default config
}

declare module '@leafphp/docs-theme/highlight' {
  const createHighlighter: () => Promise<(input: string) => string>
  export default createHighlighter
}
