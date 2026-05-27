# invnz

汉语拼音 → invenma(音韵码) → invenz(IDS→SVG) 映射库。

仅 3 个函数：`pinyin2invenma` / `invenma2invenz` / `invenz2invenma`
（pinyin→invenma 多对一，不做反向）

## 映射规则

### invenma（pinyin → invenma）

规则来源：`docs/rule.md` §1 + `src/data/vowel2phonemes.ts`

- `v` 代表 ü，包括 jqxy 后的 u
- jqx/zcsr/zhchsh 后省略韵母 i；iong 为整体音素不省略
- bpmf 后 `o` → `uo`
- 韵母按 `vowel2phonemesMap` 分解后与声母拼接；不在表中的不分解

### invenz（invenma → IDS）

数据来源：`src/data/phoneme2wordroot.ts` — `vowelPhonemeMap` + `consonantPhonemeMap`

**§2.1 关于一**：`⿰X一` → `⿱X一`

**§2.2 韵尾包围**：`⿵冂`(en)/`⿵𰃦`(an)/`⿹𠃌`(eng)/`⿹勹`(ang) 包围前一个字根

**§2.3 零声母**：匹配到 `-` 前缀条目时加 `⿰丨`

**匹配优先级**：韵尾优先 > 完整字符串匹配 > v=ü

**组合步骤**：

1. 韵部内：韵尾包围前一个音素字根
2. 声母 IDC 包裹整个韵部
3. 仅韵尾时直接包围声母字根
4. 单音素韵部：字根去 IDC 前缀后声母包裹
5. 零声母：匹配 `-x` 条目加 `⿰丨`

| pinyin | invenma | invenz     |
| ------ | ------- | ---------- |
| a      | a       | ⿰丨八     |
| ba     | ba      | ⿱不八     |
| ban    | ban     | ⿵𰃦不     |
| bian   | biean   | ⿱不⿵𰃦也 |
| ti     | ti      | ⿱乇一     |
| tian   | tiean   | ⿰乇⿵𰃦也 |
| guan   | guan    | ⿰𠂎⿵𰃦五 |
| wo     | wo      | ⿰丨火     |
| huo    | huo     | ⿰丩火     |
| po     | puo     | ⿱攵火     |
| yong   | yong    | 用         |
| xiong  | xiong   | ⿱西用     |
| xia    | xa      | ⿱西八     |
| xian   | xiean   | ⿱西⿵𰃦也 |
| xue    | xve     | ⿱西月     |
| hong   | hong    | ⿰丩工     |
| weng   | ueng    | ⿹𠃌五     |

## 代码结构

```
src/
├── pinyin2invenma.ts       # pinyin → invenma
├── invenma2invenz.ts        # invenma → IDS
├── invenz2invenma.ts        # IDS → invenma
├── tools/                   # 公共函数
├── data/
│   ├── phoneme2wordroot.ts  # vowelPhonemeMap + consonantPhonemeMap
│   └── vowel2phonemes.ts    # vowel2phonemesMap（复合韵母分解）
├── main.ts                  # barrel
```

## 命令

| 命令                 | 用途                 |
| -------------------- | -------------------- |
| `pnpm pinyin <拼音>` | CLI 验证             |
| `pnpm test`          | vitest               |
| `pnpm build`         | tsup 构建            |
| `pnpm docs`          | VitePress 教程       |
| `pnpm glyphs`        | 从 zi.tools 预取 SVG |

> `docs/rule.md` 和 `src/data/` 内容以实际代码为准。invenma 规则后续需完善。
