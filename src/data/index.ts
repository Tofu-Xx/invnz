import type {
  finalMap as FinalMapType,
  initialMap as InitialMapType,
  Pinin2Hanz as Pinin2HanzType,
  voidInitialMap as VoidInitialMapType,
} from './types'
import fs from 'node:fs'
import path from 'node:path'
import JSON5 from 'json5'

// Load JSON5 files at runtime
const dataDir = path.dirname(__filename)

function loadJSON5<T>(filename: string): T {
  const filePath = path.join(dataDir, filename)
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON5.parse(content) as T
}

export const finalMap: typeof FinalMapType = loadJSON5('finalMap.json5')
export const initialMap: typeof InitialMapType = loadJSON5('initialMap.json5')
export const Pinin2Hanz: typeof Pinin2HanzType = loadJSON5('Pinin2Hanz.json5')
export const voidInitialMap: typeof VoidInitialMapType = loadJSON5('voidInitialMap.json5')
