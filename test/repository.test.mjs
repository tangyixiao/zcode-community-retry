import assert from 'node:assert/strict'
import fs from 'node:fs'
import { test } from 'node:test'

test('published marketplace resolves both plugins and Retry metadata to this repository', () => {
  const market = JSON.parse(fs.readFileSync('marketplace.json', 'utf8'))
  const pkg = JSON.parse(fs.readFileSync('community/package.json', 'utf8'))
  for (const entry of market.plugins) {
    const manifest = JSON.parse(fs.readFileSync(`${entry.source}/.zcode-plugin/plugin.json`, 'utf8'))
    assert.equal(entry.name, manifest.name)
    assert.equal(entry.version, manifest.version)
  }
  assert.equal(market.name, 'tangyixiao-zcode-community')
  assert.equal(pkg.version, market.plugins.find(p => p.name === 'zcode-community-retry').version)
  assert.equal(pkg.repository.url, 'https://github.com/tangyixiao/zcode-community-retry.git')
})
