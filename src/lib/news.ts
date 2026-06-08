const modules = import.meta.glob('../../content/news/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  body: string;
  image?: string;
  excerpt?: string;
  rawDate: string;
}

function parseFrontmatter(text: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
  const lines = text.split('\n');

  if (lines[0]?.trim() !== '---') {
    return { meta, body: text };
  }

  let bodyStart = 1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      bodyStart = i + 1;
      break;
    }
    const match = lines[i].match(/^(\w+):\s*(.*)/);
    if (match) {
      meta[match[1]] = match[2].replace(/['"]/g, '').trim();
    }
  }

  return { meta, body: lines.slice(bodyStart).join('\n').trim() };
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function toItem(path: string, raw: string): NewsItem {
  const id = path.split('/').pop() || '';
  const { meta, body } = parseFrontmatter(raw);
  return {
    id,
    title: meta.title || '',
    date: formatDate(meta.date),
    rawDate: meta.date || '',
    body,
    image: meta.image || undefined,
    excerpt: meta.excerpt || undefined,
  };
}

export function getAllNews(): NewsItem[] {
  return Object.entries(modules)
    .map(([path, raw]) => toItem(path, raw))
    .sort((a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime());
}

export function getNewsById(id: string): NewsItem | undefined {
  const entry = Object.entries(modules).find(([path]) => path.endsWith('/' + id));
  if (!entry) return undefined;
  return toItem(entry[0], entry[1]);
}
