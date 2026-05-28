import path from 'node:path'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'invnz',
  description: '把拼音变成看得见的汉字 —— 409 个标准音节全覆盖',

  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './theme'),
        '@invnz': path.resolve(__dirname, '../../src'),
      },
    },
    server: {
      fs: {
        allow: [path.resolve(__dirname, '../..')],
      },
      proxy: {
        '/zi': {
          target: 'http://zu.zi.tools',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/zi/, ''),
        },
      },
    },
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600;700&family=ZCOOL+XiaoWei&family=ZCOOL+QingKe+HuangYou&display=swap', rel: 'stylesheet' }],
  ],

  themeConfig: {
    logo: undefined,
    nav: [
      { text: '指南', link: '/guide/what-is-invnz' },
      { text: '参考', link: '/reference/rules' },
      { text: '互动演示', link: '/guide/playground' },
    ],

    sidebar: {
      '/guide/': [
        { text: '介绍', link: '/guide/what-is-invnz' },
        { text: '快速上手', link: '/guide/quick-start' },
        { text: '内部原理', link: '/guide/how-it-works' },
        { text: '音素 → 字根', link: '/guide/phoneme-to-root' },
        { text: '组合规则', link: '/guide/combination-rules' },
        { text: '特殊音节', link: '/guide/special-syllables' },
        { text: '🖌 互动演示', link: '/guide/playground' },
      ],
      '/reference/': [
        { text: '映射规则', link: '/reference/rules' },
        { text: '声母字根表', link: '/reference/consonant-root' },
        { text: '韵母字根表', link: '/reference/vowel-root' },
        { text: '409 音节全表', link: '/reference/all-syllables' },
      ],
    },

    footer: {
      message: '音者，声也；韵者，和也；字者，形也 — invnz 基于 MIT 许可发布',
    },
  },
})
