# 往返不变性

invnz 库的最核心保证：**任何转换路径都是可逆的**。

## 核心断言

所有测试文件（`test/*.test.ts`）都验证同一个不变性：

```typescript
expect(pinyin2invnz(invnz2pinyin(invnz))).toBe(invn2invnz(invn))
expect(pinyin2invn(invn2pinyin(invn))).toBe(invnz2invn(invnz))
```

翻译过来就是：

```
沿任一方向走一圈，回到起点：
  pinyin → invn → invnz → pinyin → invn → invnz   ✓
  invn → pinyin → invn → invnz → invn              ✓
```

## 验证的路径

```
           ┌─── invn2invnz ───┐
           │                   ▼
         invn               invnz
           ▲                   │
           └─── invnz2invn ────┘

           ┌─── invn2pinyin ──┐
           │                   ▼
         invn               pinyin
           ▲                   │
           └─── pinyin2invn ───┘
```

## 四种测试数据分组

测试覆盖所有汉语拼音合法音节，分为四组：

| 测试文件              | 分组                           | 条目数 |
| --------------------- | ------------------------------ | ------ |
| `bpmfdtnlgkh.test.ts` | 普通声母 b/p/m/f/d/t/n/l/g/k/h | 240    |
| `jqx.test.ts`         | 舌面声母 j/q/x                 | 56     |
| `zhchshrzcs.test.ts`  | 舌尖/卷舌声母 zh/ch/sh/r/z/c/s | 124    |
| `zeroinitial.test.ts` | 零声母                         | 35     |

**共约 455 个音节**，每个音节都验证了往返不变性。

## 测试脚本

测试数据由 `scripts/gentest.ts` 自动生成，遍历所有有效的声韵组合，用库本身的转换函数计算预期值。

```bash
# 运行测试
pnpm test

# 查看详细输出
pnpm test:fail
```

测试使用 vitest 的 `it.each` 参数化运行：

```typescript
it.each(DATA)(
  '%s → %s → %s',
  (_, invn, invnz) => {
    expect(pinyin2invnz(invnz2pinyin(invnz))).toBe(invn2invnz(invn))
    expect(pinyin2invn(invn2pinyin(invn))).toBe(invnz2invn(invnz))
  },
)
```

## 不变性的意义

往返不变性保证了：

1. **无损转换**：pinyin ↔ invn ↔ invnz 之间不会丢失任何信息
2. **可逆性**：可以从任意表示法还原回另一种
3. **一致性**：无论走哪条路径，相同输入必然得到相同输出

这使得 invnz 可以作为**拼音的确定性编码方案**使用，适用于拼音输入法、汉字字形生成、语言教学等场景。
