# 音韵码详解

**音韵码（invenma）** 是拼音与音韵字之间的桥梁。它将标准拼音拆解为用 `_` 分隔的音素序列，让每个音节的结构变得显式且可编程。

## 基本结构

一个音韵码由两部分组成，用 `_` 连接：

```
zh_ong     ← 声母 _ 韵母
tie_an     ← 声母 _ 韵母音素1 _ 韵母音素2
```

- **声母段**：与拼音的声母一致（`b`、`p`、`m`、`f`、`zh`、`ch`、`sh`……）
- **韵母段**：可包含 1~3 个音素，用 `_` 分隔

## 韵母分解

韵母的分解规则由 `vowel2phonemesMap` 定义。这是 invnz 最核心的数据结构之一。

### 复合韵母分解表

| 拼音韵母 | 音素分解 | 示例拼音 | 音韵码 |
|----------|----------|----------|--------|
| a | a | ba | b_a |
| o | o | bo | b_o → buo |
| e | e | ge | g_e |
| ai | ai | gai | g_ai |
| ei | ei | gei | g_ei |
| ao | ao | hao | h_ao |
| ou | ou | kou | k_ou |
| an | an | ban | b_an |
| en | en | ben | b_en |
| ang | ang | bang | b_ang |
| eng | eng | beng | b_eng |
| er | er | er | 零声母单独处理 |
| i | i | li | l_i |
| ia | i_a | lia | l_i_a |
| ie | ie | bie | b_ie |
| iao | i_ao | biao | b_i_ao |
| iu | i_ou | liu | l_i_ou |
| ian | ie_an | bian | b_ie_an |
| in | i_en | bin | b_i_en |
| iang | i_ang | liang | l_i_ang |
| ing | i_eng | ling | l_i_eng |
| iong | iong | xiong | x_iong |
| u | u | gu | g_u |
| ua | u_a | gua | g_u_a |
| uo | uo | guo | g_uo |
| uai | u_ai | guai | g_u_ai |
| ui | u_ei | gui | g_u_ei |
| uan | u_an | guan | g_u_an |
| un | u_en | gun | g_u_en |
| uang | u_ang | guang | g_u_ang |
| ong | ong | hong | h_ong |
| ü | v | nü | n_v |
| üe | ve | nüe | n_ve |
| üan | ve_an | quan | q_ve_an |
| ün | v_en | qun | q_v_en |

> `v` 在音韵码中代表 `ü`。j、q、x 后的 `u` 自动转为 `ü`（内部表示为 `v`）。

## 编码规则详解

### 1. i 省略（i‑drop）

当声母是 j、q、x、zh、ch、sh、r、z、c、s 时，如果韵母的第一个音素是独立的 `i`，则这个 `i` 被省略。

**规则**：`/^(j|q|x|zh|ch|sh|r|z|c|s)_i(?=(_|$))/` 匹配时去掉 `_i`。

**示例**：

| 拼音 | 分解 | 音韵码（首版） | 音韵码（i-drop 后） |
|------|------|----------------|-------------------|
| ji | j_i | j_i | j_i → 不变（纯韵母） |
| jin | j_i_en | j_i_en | j_en |
| jing | j_i_eng | j_i_eng | j_eng |
| xin | x_i_en | x_i_en | x_en |
| zhi | zh_i | zh_i | zh → zhi 特殊处理 |

> **例外**：`iong`（如 xiong）保持为整体，不触发 i‑drop。因为 `iong` 是一个完整的音素而非 `i` + `ong`。

### 2. ü 转换

j、q、x 后的 `u` 自动转为 `ü`（在音韵码中用 `v` 表示）。

| 拼音 | 音韵码 | 说明 |
|------|--------|------|
| ju | j_v | u → v |
| qu | q_v | |
| xu | x_v | |
| juan | j_ve_an | |
| quan | q_ve_an | |
| xuan | x_ve_an | |
| jun | j_v_en | |
| qun | q_v_en | |
| xun | x_v_en | |

### 3. bpmf + o → uo

当声母是 b、p、m、f 且韵母为 `o` 时，`o` 转为 `uo`。

| 拼音 | 音韵码 | 说明 |
|------|--------|------|
| bo | b_uo | o → uo |
| po | p_uo | |
| mo | m_uo | |
| fo | f_uo | |

### 4. 零声母（y / w）

以 `y` 或 `w` 开头的拼音是**零声母**音节。它们没有声母段，整个音节按韵母分解。

| 拼音 | 分解 | 音韵码 |
|------|------|--------|
| ya | i_a | i_a |
| yan | ie_an | ie_an |
| yang | i_ang | i_ang |
| yong | iong | iong |
| wa | u_a | u_a |
| wo | uo | uo |
| wan | u_an | u_an |
| weng | u_eng | u_eng |
| yu | v | v |
| yuan | ve_an | ve_an |
| yun | v_en | v_en |

> `yi`、`ye`、`wu`、`yue` 等由直接查找表（`getDirectSyllable`）处理，不走分解流水线。

## 完整流水线示例

以 `xiong` 为例，完整展示音韵码的生成过程：

```
1. 输入拼音：xiong
2. 声母提取：x + iong
3. 韵母分解（vowel2phonemesMap）：iong → iong（整体音素）
4. 声母 + 韵母：x_iong
5. i‑drop 检查：x_i(?=(_|$)) → 不匹配（iong 是整体）
6. 最终音韵码：x_iong
```

以 `tian` 为例：

```
1. 输入拼音：tian
2. 声母提取：t + ian
3. 韵母分解：ian → ie_an
4. 声母 + 韵母：t_ie_an
5. i‑drop 检查：t 不在 {jqx zhchsh rzcs} 中，不触发
6. 最终音韵码：tie_an
```

---

现在你已经理解了音韵码的编码规则。接下来，看看[音韵码如何组合成音韵字](/guide/invenz)。

也可直接在[互动演示](/guide/playground)中实时体验。
