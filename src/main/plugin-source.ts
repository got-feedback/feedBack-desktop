export const PLUGIN_SOURCE_FILE = '.feedback-plugin-source.json';

export function parseGitHubRepository(value: string): { owner: string; repo: string } | null {
    try {
        const url = new URL(value);
        const parts = url.pathname.replace(/^\/+|\/+$/g, '').split('/');
        if (url.protocol !== 'https:' || url.hostname.toLowerCase() !== 'github.com' || parts.length !== 2) return null;
        const owner = parts[0];
        const repo = parts[1].replace(/\.git$/, '');
        if (!/^[A-Za-z0-9_.-]+$/.test(owner) || !/^[A-Za-z0-9_.-]+$/.test(repo)) return null;
        return { owner, repo };
    } catch {
        return null;
    }
}
