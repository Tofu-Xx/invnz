#!/usr/bin/env node

import process from 'node:process'
import { getIdsExps, getInvnz } from '../src/main'

const input = process.argv.slice(2)

if (input.length === 0) {
  console.error('Usage: invnz <pinyin...>')
  process.exit(1)
}

for (const pinyin of input) {
  const idsExps = getIdsExps(pinyin)
  const invnz = await getInvnz(idsExps)
  console.log(`${pinyin} → ${idsExps} → ${invnz}`)
}
