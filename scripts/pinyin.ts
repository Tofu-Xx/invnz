#!/usr/bin/env node

import process from 'node:process'
import { directSyllable, splitSyllable } from '../src/main'

const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invnz <pinyin>')
  process.exit(1)
}

input.forEach((pinyin) => {
  const direct = directSyllable(pinyin)
  const splitted = splitSyllable(pinyin)
  console.log(`${pinyin}`)
  if (direct) {
    console.log(`  direct: ${direct.wordroot} (zeroInitial: ${direct.isZeroInitial})`)
  }
  else {
    console.log(`  no direct match`)
  }
  console.log(`  split: [${splitted.join(', ')}]`)
})
