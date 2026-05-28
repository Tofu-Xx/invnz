# 快速上手

## 安装

```bash
pnpm add invnz
# 或
npm install invnz
# 或
yarn add invnz
```

## 第一个音韵字

```ts
import { getInvnz } from 'invnz'

getInvnz('zhong') // => '⿱止工'
getInvnz('tian') // => '⿰七⿵𰃦也'
getInvnz('shuang') // => '⿸尸⿹勹五'
```

`getInvnz` 接受一个标准汉语拼音（不带声调），返回对应的**音韵字**——一个由汉字部首和结构指示符组成的字符串。

## 核心 API

invnz 只有一个核心函数：

| 函数               | 作用          | 示例                   |
| ------------------ | ------------- | ---------------------- |
| `getInvnz(pinyin)` | 拼音 → 音韵字 | `'zhong'` → `'⿱止工'` |

所有 409 个标准汉语拼音全覆盖。

## CLI 使用

```bash
pnpm pinyin zhong tian guang yong
# => zhong → ⿱止工
# => tian  → ⿰七⿵𰃦也
# => guang → ⿰𠂎⿹勹五
# => yong  → 用
```

## 浏览器中使用

```html
<script type="module">
  import { getInvnz } from 'https://esm.sh/invnz'
  console.log(getInvnz('zhong')) // ⿱止工
</script>
```

---

现在你已经学会了 invnz 的基本用法。接下来，了解 [invnz 是什么](/guide/what-is-invnz)，或直接体验[互动演示](/guide/playground)。
