# 内部原理

invnz 的转换过程可以分为三个步骤。本文详细讲解每一步的内部机制。

## 第一步：拆解音素

拼音由声母和韵母组成。invnz 把韵母进一步拆分为**音素（phoneme）**——最小的发音单位。

### 韵母分解表

以下韵母会被拆分为多个音素（不在表中的保持原样）：

| 韵母 | 分解 | 示例拼音 | 音素序列 |
|------|------|----------|----------|
| ia | i_a | lia | `l` + `i` + `a` |
| iao | i_ao | biao | `b` + `i` + `ao` |
| iu | i_ou | liu | `l` + `i` + `ou` |
| ian | ie_an | bian | `b` + `ie` + `an` |
| in | i_en | bin | `b` + `i` + `en` |
| iang | i_ang | liang | `l` + `i` + `ang` |
| ing | i_eng | ling | `l` + `i` + `eng` |
| ua | u_a | gua | `g` + `u` + `a` |
| uai | u_ai | guai | `g` + `u` + `ai` |
| ui | u_ei | gui | `g` + `u` + `ei` |
| uan | u_an | guan | `g` + `u` + `an` |
| un | u_en | gun | `g` + `u` + `en` |
| uang | u_ang | guang | `g` + `u` + `ang` |
| ong | ong | hong | `h` + `ong`（整体）|
| iong | iong | xiong | `x` + `iong`（整体）|
| üe | ve | nüe | `n` + `ve` |
| üan | ve_an | quan | `q` + `ve` + `an` |
| ün | v_en | qun | `q` + `v` + `en` |

### 特殊规则

**i 省略**：当声母为 `j` `q` `x` `zh` `ch` `sh` `r` `z` `c` `s` 时，韵母中独立的 `i` 被省略：

```
ji     → j_i     → j_i    （纯韵母，不变）
jin    → j_i_en  → j_en   （i 被省略）
jing   → j_i_eng → j_eng  （i 被省略）
xin    → x_i_en  → x_en   （i 被省略）
```

但 `iong` 是整体音素，不触发 i 省略：

```
xiong  → x_iong  → x_iong （iong 整体，不变）
```

**bpmf + o → uo**：

```
bo  → b_uo
po  → p_uo
mo  → m_uo
fo  → f_uo
```

**jqx + u → ü**：

```
ju   → j_v
qu   → q_v
xu   → x_v
juan → j_ve_an
```

## 第二步：音素 → 字根

每个音素对应一个汉字部件，称为**字根（wordroot）**。

### 声母字根

| 声母 | 字根 | 结构 |
|------|------|------|
| b | ⿱不 | 上下 |
| p | ⿱攵 | 上下 |
| m | ⿰木 | 左右 |
| f | ⿱父 | 上下 |
| d | ⿱𠂊 | 上下 |
| t | ⿰七 | 左右 |
| n | ⿱冖 | 上下 |
| l | ⿺𠃊 | 左下包围 |
| g | ⿰𠂎 | 左右 |
| k | ⿰丬 | 左右 |
| h | ⿰丩 | 左右 |
| j | ⿱几 | 上下 |
| q | ⿱七 | 上下 |
| x | ⿱西 | 上下 |
| zh | ⿱止 | 上下 |
| ch | ⿱尺 | 上下 |
| sh | ⿸尸 | 左上包围 |
| r | ⿰日 | 左右 |
| z | ⿰子 | 左右 |
| c | ⿰朿 | 左右 |
| s | ⿱四 | 上下 |

### 韵母字根

| 音素 | 字根 | 说明 |
|------|------|------|
| a | 八 |  |
| i | 一 |  |
| u | 五 |  |
| v (ü) | 雨 |  |
| ie | 也 | 整体音素 |
| ve (üe) | 月 | 整体音素 |
| ai | 才 |  |
| ei | 巿 |  |
| ao | 刀 |  |
| ou | 口 |  |
| ong | 工 |  |
| iong | 用 | 整体音素（唯一零声母整体）|
| er | 耳 |  |
| en | ⿵冂 | **韵尾**，上包围 |
| an | ⿵𰃦 | **韵尾**，上包围 |
| eng | ⿹𠃌 | **韵尾**，右上包围 |
| ang | ⿹勹 | **韵尾**，右上包围 |

> 韵尾（en、an、eng、ang）是特殊的——它们在组合时会**包裹**前一个字根，而不是简单拼接。

## 第三步：字根组合

把字根用汉字结构指示符（IDC）组合起来，形成最终的音韵字。

组合规则详见[组合规则详解](/guide/combination-rules)。

---

继续阅读[音素 → 字根对照表](/guide/phoneme-to-root)或直接进入[互动演示](/guide/playground)。
