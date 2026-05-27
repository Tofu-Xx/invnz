# 快速开始

## 安装

```bash
pnpm add invnz
# 或
npm install invnz
# 或
yarn add invnz
```

## 一行代码，看见音韵

```ts
import { getInvnz } from 'invnz'

getInvnz('zhong') // => '⿱止工'
getInvnz('tian')  // => '⿰七⿵𰃦也'
getInvnz('guang') // => '⿰𠂎⿹勹五'
getInvnz('yong')  // => '用'
```

`getInvnz` 接受一个标准汉语拼音（不带声调），返回对应的 **音韵字（invnz）**——用汉字部首和结构指示符组成的「类汉字」字符串。

## 三个核心函数

invnz 只有三个函数，分别对应三层编码的转换：

| 函数 | 作用 | 示例 |
|------|------|------|
| `pinyin2invenma(pinyin)` | 拼音 → 音韵码 | `'zhong'` → `'zh_ong'` |
| `invenma2invenz(invenma)` | 音韵码 → 音韵字 | `'zh_ong'` → `'⿱止工'` |
| `invenz2invenma(invenz)` | 音韵字 → 音韵码 | `'⿱止工'` → `'zh_ong'` |

组合起来就是完整的流水线：

```
pinyin  ──→  invenma  ──→  invenz
  ↑                        ↓
  └──── invenz2invenma ────┘
```

> **便捷接口**：`getInvnz` 一步完成 pinyin → invenz 的转换，内部自动走 `pinyin2invenma` → `invenma2invenz` 流水线。

## 试试看

```bash
# 使用 CLI
pnpm pinyin zhong tian guang yong
# => zhong → ⿱止工
# => tian  → ⿰七⿵𰃦也
# => guang → ⿰𠂎⿹勹五
# => yong  → 用
```

现在你已经学会了 invnz 的基本用法。接下来，深入了解[三层编码](/guide/three-layers)的设计思想，或者在[互动演示](/guide/playground)中实时体验。
