#!/usr/bin/env node

import process from 'node:process'
import { pinyin2invn, pinyin2invnz } from '../src/main'

const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invnz <text>')
  process.exit(1)
}

input.forEach((pinyin) => {
  const invn = pinyin2invn(pinyin)
  const invnz = pinyin2invnz(pinyin)
  console.log(`${pinyin} -> ${invn} -> ${invnz}`)
})
