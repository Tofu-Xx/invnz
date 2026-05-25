# 转换流水线

invnz 库提供 **6 个核心函数**，覆盖三种表示法之间的所有转换路径。

## 流水线总览

```
             pinyin2invn              invn2invnz
  标准拼音 ──────────→ 音韵码 ──────────→ 音韵字
      ↑                    ↑                    │
      │   invn2pinyin      │    invnz2invn      │
      └────────────────────┘────────────────────┘
           ←───────  ←───────────

  直接转换（组合函数）：
  pinyin2invnz = pinyin → (pinyin2invn) → invn → (invn2invnz) → invnz
  invnz2pinyin = invnz → (invnz2invn) → invn → (invn2pinyin) → pinyin
```

## 函数速查表

| 函数           | 输入     | 输出     | 说明                                |
| -------------- | -------- | -------- | ----------------------------------- |
| `pinyin2invn`  | 标准拼音 | 音韵码   | 含 jqx+u→ü、空韵省略、y/w 还原      |
| `invn2pinyin`  | 音韵码   | 标准拼音 | 含 ü→u、零声母 y/w/yu 正写          |
| `invn2invnz`   | 音韵码   | 音韵字   | 拆分组件，按 IDC 规则组合           |
| `invnz2invn`   | 音韵字   | 音韵码   | 提取末位部首，反查还原组件          |
| `pinyin2invnz` | 标准拼音 | 音韵字   | `pinyin2invn` + `invn2invnz` 的组合 |
| `invnz2pinyin` | 音韵字   | 标准拼音 | `invnz2invn` + `invn2pinyin` 的组合 |

## 源码结构

```
src/
├── main.ts                 # 入口，6 个函数的定义与重导出
├── pinyin-convert.ts       # pinyin ↔ invn 双向
├── invnz-convert.ts        # invn ↔ invnz 双向
├── combine.ts              # 韵母组件 → invnz 组合逻辑
└── data/
    ├── ternary.ts          # 原始映射数据（声母 × 韵母）
    ├── tables.ts           # 预计算索引表（运行时构建）
    └── zeroinitial.ts      # 零声母正写映射表
```

## 关键实现细节

### pinyin2invn 流程

```
1. 去除声调（输入应为无声调拼音）
2. 最长前缀匹配声母
3. 剩余部分匹配韵母模板
4. 去除模板中的 _ 占位符
5. 若声母为 j/q/x，将 u 还原为 ü（即 v）
6. 若声母为可读声母且剩余为 i，省略 i
7. 若为零声母，先还原 y/w/yu 正写法
```

### invn2invnz 流程

```
1. 匹配声母，取声母的 invnzPart（如 ⿰匕）
2. 匹配韵母，拆解模板中的组件（按 _ 分割）
3. 按组件数量和类型选择组合规则
4. 韵尾（⿵/⿹）包裹前一个组件
5. 韵头（⿱）包裹剩余部分
```

### invnz2invn 流程

```
1. 遍历 invnz 字符串，收集所有非 IDC 字符（部首）
2. 反查 ROOT_TO_COMP 表，还原为音韵码组件
3. 非韵尾组件在前，韵尾组件在后
4. 拼接为完整的音韵码
```

## 使用示例

```typescript
import {
  invn2invnz,
  invn2pinyin,
  invnz2invn,
  invnz2pinyin,
  pinyin2invn,
  pinyin2invnz,
} from 'invnz'

// 标准拼音 → 音韵码
pinyin2invn('zhuang') // → 'zhuag'
pinyin2invn('tian') // → 'tian'

// 音韵码 → 标准拼音
invn2pinyin('zhuag') // → 'zhuang'
invn2pinyin('tian') // → 'tian'

// 音韵码 → 音韵字
invn2invnz('zhuag') // → '⿰止⿱土⿹勹才'
invn2invnz('tian') // → '⿰丁⿱一⿵冂才'

// 音韵字 → 音韵码
invnz2invn('⿰止⿱土⿹勹才') // → 'zhuag'

// 直接转换
pinyin2invnz('zhuang') // → '⿰止⿱土⿹勹才'
invnz2pinyin('⿰止⿱土⿹勹才') // → 'zhuang'
```
