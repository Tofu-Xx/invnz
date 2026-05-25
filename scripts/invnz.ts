#!/usr/bin/env node

import process from 'node:process'
import { invn2invnz, pinyin2invn } from '../src/main'

const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invnz <text>')
  process.exit(1)
}

input.forEach((pinyin) => {
  const invn = pinyin2invn(pinyin)
  const invnz = invn2invnz(invn)
  console.log(`${pinyin} -> ${invn} -> ${invnz}`)
})
