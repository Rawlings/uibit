import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');

// Map of known strings to their manual contexts for the existing table
const knownContexts = {
  'Countdown timer': 'aria-label on timer container',
  'Days': 'Unit label',
  'Hours': 'Unit label',
  'Minutes': 'Unit label',
  'Seconds': 'Unit label',
  'Content Carousel': 'aria-label on root region',
  'Previous slide': 'aria-label on prev button',
  'Next slide': 'aria-label on next button',
  'Slides': 'aria-label on indicator tablist',
  'Slide {n} of {total}': 'aria-label on each slide (interpolated)',
  'Go to slide {n}': 'aria-label on indicator button (interpolated)',
  '360 degree product view. Use drag, arrow keys, or buttons to rotate.': 'aria-label on viewer',
  'Rotate left': 'aria-label on prev button',
  'Rotate right': 'aria-label on next button',
  'Hotspot': 'Fallback aria-label on trigger button',
  'Hotspot details': 'Fallback aria-label on popover',
  'Close details': 'aria-label on close button',
  'Scroll progress indicator': 'aria-label on progress bar',
  'Scratch-off panel to reveal content': 'aria-label on canvas container',
  'Scratch to reveal': 'Instructions overlay text',
  'Sentiment rating': 'aria-label on radiogroup',
  'Pagination': 'aria-label on pagination nav',
  'Previous': 'aria-label on previous page button',
  'Next': 'aria-label on next page button',
  'Column filters': 'aria-label on filter row',
  'Filter {column}': 'aria-label on column filter input (interpolated)',
  'Search table': 'aria-label on search input',
  'Rows per page': 'aria-label on rows-per-page select',
  'Row density': 'aria-label on density select',
  'Export as CSV': 'aria-label on export button',
  'Clear all filters': 'aria-label on clear button',
  'Data table': 'aria-label on table region',
  'Select all rows on this page': 'aria-label on select-all checkbox',
  'Select row': 'aria-label on row checkbox',
  '{n} row(s) selected': 'Selection banner count (interpolated)',
  'Select all {n} rows': 'Selection banner button (interpolated)',
  'Clear selection': 'Selection banner button',
  'Rows:': 'Toolbar label',
  'Density:': 'Toolbar label',
  'Columns': 'Column chooser button',
  'Compact / Normal / Comfortable': 'Density option labels',
  'Export CSV': 'Export button label (no selection)',
  'Export {n} rows': 'Export button label with selection (interpolated)',
  'Clear filters': 'Active filters button label',
};

// Map of file contents to check for tag name or guess component name
function getComponentTag(packageName, fileContent) {
  const match = fileContent.match(/@customElement\(['"](uibit-[a-zA-Z0-9-]+)['"]\)/);
  if (match && match[1]) {
    return match[1];
  }
  return `uibit-${packageName}`;
}

function extractStrings() {
  const packagesPath = path.join(rootDir, 'components');
  const packages = fs.readdirSync(packagesPath).filter(p => {
    const stat = fs.statSync(path.join(packagesPath, p));
    return stat.isDirectory() && p !== 'docs' && p !== 'core';
  });

  const extracted = [];

  for (const pkg of packages) {
    const srcPath = path.join(packagesPath, pkg, 'src');
    if (!fs.existsSync(srcPath)) continue;

    const files = walkDir(srcPath).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const componentTag = getComponentTag(pkg, content);

      // Regex 1: msg('...') or msg("...") or msg(`...`)
      // Match msg('literal') or msg("literal")
      const literalRegex = /msg\(\s*(['"`])((?:[^\\]|\\.)*?)\1\s*\)/g;
      let match;
      while ((match = literalRegex.exec(content)) !== null) {
        const strVal = match[2];
        const context = knownContexts[strVal] || guessContext(content, match.index, strVal);
        if (!extracted.some(e => e.component === componentTag && e.string === strVal)) {
          extracted.push({ component: componentTag, string: strVal, context });
        }
      }

      // Regex 2: msg(str`...`)
      const strTemplateRegex = /msg\(\s*str\s*`([\s\S]*?)`\s*\)/g;
      while ((match = strTemplateRegex.exec(content)) !== null) {
        let templateContent = match[1];
        // Normalize placeholders to {placeholderName} or similar format for docs
        // e.g. "Slide ${index + 1} of ${this.totalSlides}" -> "Slide {n} of {total}"
        // e.g. "Filter ${col.label}" -> "Filter {column}"
        // e.g. "${selCount} row${selCount === 1 ? '' : 's'} selected" -> "{n} row(s) selected"
        let strVal = templateContent;
        if (strVal.includes('Slide') && strVal.includes('of')) {
          strVal = 'Slide {n} of {total}';
        } else if (strVal.includes('Go to slide')) {
          strVal = 'Go to slide {n}';
        } else if (strVal.includes('Filter')) {
          strVal = 'Filter {column}';
        } else if (strVal.includes('row') && strVal.includes('selected')) {
          strVal = '{n} row(s) selected';
        } else if (strVal.includes('Select all') && strVal.includes('rows')) {
          strVal = 'Select all {n} rows';
        } else if (strVal.includes('Export') && strVal.includes('rows')) {
          strVal = 'Export {n} rows';
        } else {
          // General cleanup of template literals
          strVal = strVal.replace(/\$\{[^}]+\}/g, '{value}');
        }

        const context = knownContexts[strVal] || guessContext(content, match.index, strVal);
        if (!extracted.some(e => e.component === componentTag && e.string === strVal)) {
          extracted.push({ component: componentTag, string: strVal, context });
        }
      }
    }
  }

  // Ensure unique and sort by component, then string
  extracted.sort((a, b) => a.component.localeCompare(b.component) || a.string.localeCompare(b.string));

  const localesDir = path.join(rootDir, 'packages/platform/core/src/locales');
  fs.mkdirSync(localesDir, { recursive: true });

  const outFilePath = path.join(localesDir, 'en-US.ts');
  const fileContent = `// This file is auto-generated by the string extraction script.
// Do not edit this file manually.

export interface LocalizedStringEntry {
  component: string;
  string: string;
  context: string;
}

export const localizedStrings: LocalizedStringEntry[] = ${JSON.stringify(extracted, null, 2)};
`;

  fs.writeFileSync(outFilePath, fileContent, 'utf8');
  console.log(`Successfully extracted ${extracted.length} localized strings to ${outFilePath}`);
}

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

function guessContext(content, index, strVal) {
  // Simple heuristic: look at the surrounding 100 characters before the match to see if it's inside an attribute
  const before = content.slice(Math.max(0, index - 100), index);
  if (before.includes('aria-label=')) {
    return 'aria-label attribute';
  }
  if (before.includes('label=')) {
    return 'Label attribute';
  }
  if (before.includes('title=')) {
    return 'Title attribute';
  }
  return 'UI text content';
}

extractStrings();
