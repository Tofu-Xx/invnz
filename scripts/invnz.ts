#!/usr/bin/env node

import process from 'node:process'
import { pinin2invnzChars, pinyin2pinin } from '../src/main'

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
