import path from 'node:path'
import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'invnz',
  description: '汉语拼音 → 音韵码 → 音韵字 —— 发现汉语拼音的结构之美',

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
    },
  },

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600;700&family=ZCOOL+XiaoWei&display=swap', rel: 'stylesheet' }],
  ],

  themeConfig: {
    logo: undefined,
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '参考', link: '/reference/rules' },
      { text: '互动演示', link: '/guide/playground' },
    ],

    sidebar: {
      '/guide/': [
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '三层编码', link: '/guide/three-layers' },
        { text: '音韵码详解', link: '/guide/invenma' },
        { text: '音韵字详解', link: '/guide/invenz' },
        { text: '🖌 互动演示', link: '/guide/playground' },
      ],
      '/reference/': [
        { text: '映射规则', link: '/reference/rules' },
        { text: '声母映射表', link: '/reference/consonants' },
        { text: '韵母编码表', link: '/reference/vowels' },
        { text: '音节速查', link: '/reference/quickref' },
      ],
    },

    footer: {
      message: '以音韵为笔，以汉字为墨 — invnz 基于 MIT 许可发布',
    },
  },
})
