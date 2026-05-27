#!/usr/bin/env node

import process from 'node:process'
import { invnma2invnz, pinyin2invnma } from '../src/main'

const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invnz <text>')
  process.exit(1)
}

input.forEach((pinyin) => {
  const invnma = pinyin2invnma(pinyin)
  const invnz = invnma2invnz(pinyin)
  console.log(`${pinyin} -> ${invnma} -> ${invnz}`)
})
