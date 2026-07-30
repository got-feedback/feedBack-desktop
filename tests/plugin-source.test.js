const test = require('node:test');
const assert = require('node:assert/strict');
const { loadTs } = require('./_load-ts');

const { parseGitHubRepository } = loadTs('src/main/plugin-source.ts');

test('recognizes public GitHub repository URLs used by archive installs', () => {
    assert.deepEqual(parseGitHubRepository('https://github.com/balki97/feedforge-connect'), {
        owner: 'balki97', repo: 'feedforge-connect',
    });
    assert.deepEqual(parseGitHubRepository('https://github.com/balki97/feedforge-connect.git'), {
        owner: 'balki97', repo: 'feedforge-connect',
    });
    assert.equal(parseGitHubRepository('https://example.com/balki97/feedforge-connect'), null);
    assert.equal(parseGitHubRepository('file:///tmp/feedforge-connect'), null);
    assert.equal(parseGitHubRepository('https://github.com/balki97/feedforge-connect/releases'), null);
});
