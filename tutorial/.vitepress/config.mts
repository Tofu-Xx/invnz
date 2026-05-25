import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'invnz',
  description: '汉语拼音 ↔ 音韵码 ↔ 音韵字 转换教程',

  themeConfig: {
    logo: undefined,
    nav: [
      { text: '指南', link: '/guide/intro' },
      { text: '参考', link: '/reference/consonants' },
      { text: '示例', link: '/examples' },
    ],

    sidebar: {
      '/guide/': [
        { text: '简介', link: '/guide/intro' },
        { text: '标准拼音 → 音韵码', link: '/guide/pinyin' },
        { text: '音韵码详解', link: '/guide/invn' },
        { text: '音韵字详解', link: '/guide/invnz' },
        { text: '转换流水线', link: '/guide/pipeline' },
        { text: '往返不变性', link: '/guide/roundtrip' },
      ],
      '/reference/': [
        { text: '声母映射表', link: '/reference/consonants' },
        { text: '韵母编码表', link: '/reference/vowels' },
      ],
    },

    footer: {
      message: '基于 MIT 许可协议发布',
    },
  },
})
