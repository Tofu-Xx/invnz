#!/usr/bin/env node

import process from 'node:process'
import { pinin2invnzChars, pinyin2pinin } from './main'

// Node 获取参数（前两个是 node 路径 + 脚本路径）
const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invnz <text>')
  process.exit(1)
}

input.forEach((pinyin) => {
  const pinin = pinyin2pinin(pinyin)
  const invnzChars = pinin2invnzChars(pinin)
  console.log(`${pinyin} -> ${pinin} -> ${invnzChars}`)
})
