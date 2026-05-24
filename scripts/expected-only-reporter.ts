import type { Reporter, TestCase } from 'vitest/node'

let failed = 0

export default class ExpectedOnlyReporter implements Reporter {
  onTestCaseResult(testCase: TestCase): void {
    const result = testCase.result()
    if (result.state !== 'failed')
      return

    failed++
    const name = testCase.name
    // const name = testCase.fullName

    for (const error of result.errors) {
      const actual = (error as Record<string, unknown>).actual
      const expected = (error as Record<string, unknown>).expected

      console.error(`\n  ${name}`)
      if (expected !== undefined && actual !== undefined) {
        // console.error(`  Expected: ${JSON.stringify(expected)}`)
        console.error(`  Received: ${JSON.stringify(actual)}`)
      }
      else {
        console.error(`  ${error.message}`)
      }
    }
  }

  onTestRunEnd(): void {
    if (failed > 0) {
      console.error(`\n  ${failed} test(s) failed`)
    }
  }
}
