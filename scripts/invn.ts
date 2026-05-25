#!/usr/bin/env node

import process from 'node:process'
import { invn2invnz, invn2pinyin } from '../src/main'

const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invn <text>')
  process.exit(1)
}

input.forEach((invn) => {
  const pinyin = invn2pinyin(invn)
  const invnz = invn2invnz(invn)
  console.log(`${invn} -> ${pinyin} -> ${invnz}`)
})
