#!/usr/bin/env node

import process from 'node:process'
import { getInvnz } from '../src/main'

const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invnz <pinyin...>')
  process.exit(1)
}

for (const pinyin of input) {
  const invnz = getInvnz(pinyin)
  console.log(`${pinyin} → ${invnz ?? 'null'}`)
}
