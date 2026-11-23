import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'

const hook = fileURLToPath(new URL('../keeper/hooks/recovery.mjs', import.meta.url))

function run(input) {
  const result = spawnSync(process.execPath, [hook], { input, encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  return result.stdout
}

const failure = { hook_event_name: 'PostToolUseFailure', is_interrupt: false }
test('transient tool failures return guidance without echoing the error', () => {
  for (const error of ['HTTP/1.1 503', 'status code: 504', 'ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN',
    'connection timed out', 'connection reset by peer', '503 Service Unavailable', '502 Bad Gateway']) {
    const output = JSON.parse(run(JSON.stringify({ ...failure, error: error + ' private-fixture' })))
    assert.equal(output.hookSpecificOutput.hookEventName, failure.hook_event_name)
    assert.ok(output.hookSpecificOutput.additionalContext)
    assert.ok(!JSON.stringify(output).includes('private-fixture'))
  }
})

test('interrupted, unrelated and invalid events give no instructions', () => {
  for (const input of [
    { ...failure, error: 'HTTP 401' }, { ...failure, error: 'bad file' },
    { ...failure, is_interrupt: true, error: 'HTTP 503' },
    { ...failure, hook_event_name: 'PostToolUse', error: 'HTTP 503' }, null,
  ]) assert.equal(run(JSON.stringify(input)), '')
  assert.equal(run('{'), '')
  assert.equal(run('x'.repeat(1024 * 1024 + 1)), '')
})
