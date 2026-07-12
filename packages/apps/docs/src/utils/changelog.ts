export interface ParsedReleaseSection {
  title: string;
  category: 'Added' | 'Fixed' | 'Security' | 'Changed' | 'Deprecated' | 'Other';
  items: string[];
}

export interface ParsedRelease {
  version: string;
  date: string;
  sections: ParsedReleaseSection[];
}

function getCategory(title: string): ParsedReleaseSection['category'] {
  const t = title.toLowerCase().trim();
  if (t.includes('major') || t.includes('minor') || t.includes('add') || t.includes('feat') || t.includes('new')) return 'Added';
  if (t.includes('patch') || t.includes('fix') || t.includes('bug')) return 'Fixed';
  if (t.includes('sec')) return 'Security';
  if (t.includes('change') || t.includes('refactor') || t.includes('improv') || t.includes('updat')) return 'Changed';
  if (t.includes('deprecat')) return 'Deprecated';
  return 'Other';
}

export function parseChangelog(md: string): ParsedRelease[] {
  const releases: ParsedRelease[] = [];
  let currentRelease: ParsedRelease | null = null;
  let currentSection: ParsedReleaseSection | null = null;

  const lines = md.split('\n');
  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    const versionMatch = trimmed.match(/^##\s+\[?([0-9a-zA-Z.-]+)\]?(?:\s*-\s*([0-9-]+))?/);
    if (versionMatch) {
      currentRelease = {
        version: versionMatch[1],
        date: versionMatch[2] || '',
        sections: []
      };
      releases.push(currentRelease);
      currentSection = null;
      continue;
    }

    if (currentRelease) {
      const sectionMatch = trimmed.match(/^###\s+(.+)$/);
      if (sectionMatch) {
        const title = sectionMatch[1].trim();
        currentSection = {
          title,
          category: getCategory(title),
          items: []
        };
        currentRelease.sections.push(currentSection);
        continue;
      }

      if (currentSection) {
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          const hasIndentation = /^\s+[-*]/.test(rawLine);
          if (hasIndentation && currentSection.items.length > 0) {
            const lastIdx = currentSection.items.length - 1;
            const subText = trimmed.substring(1).trim();
            if (currentSection.items[lastIdx] === 'Updated dependencies') {
              currentSection.items[lastIdx] = `Updated dependencies: ${subText}`;
            } else if (currentSection.items[lastIdx].startsWith('Updated dependencies:')) {
              currentSection.items[lastIdx] = `${currentSection.items[lastIdx]}, ${subText}`;
            } else {
              currentSection.items[lastIdx] = `${currentSection.items[lastIdx]} (${subText})`;
            }
          } else {
            const itemText = trimmed.substring(1).trim();
            currentSection.items.push(itemText);
          }
        }
      }
    }
  }

  return releases;
}
