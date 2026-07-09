import '@uibit/read-timer';
import { UsageExample } from '../../../../types/docs';

const articleText = `
  Typography in editorial design is the art of arranging type to make written language
  legible, readable, and appealing when displayed. The arrangement of type involves selecting
  typefaces, point sizes, line lengths, line spacing, and letter spacing, and adjusting the
  space between pairs of letters. Typography is performed by typesetters, compositors,
  typographers, graphic designers, art directors, manga artists, comic book artists, and
  clerks. Until the digital age, typography was a specialised occupation. Digitization opened
  up typography to new generations of visual designers and lay users. As the craft of
  arranging type increasingly depends on the capabilities of software, applications may be
  used to determine how type is arranged on a physical or virtual page. Typography is as
  much about the absence of type as it is about its presence — the white space around and
  between characters gives them room to breathe and guides the reader's eye through the page.
`;

function Demo() {
  return (
    <div className="max-w-2xl bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">By UIBit Editors</span>
        <span className="text-gray-200">·</span>
        <uibit-read-timer show-icon>
          <div style={{ display: 'none' }}>{articleText}</div>
        </uibit-read-timer>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">The Role of Typography in Editorial Design</h2>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{articleText.trim()}</p>
    </div>
  );
}

const example: UsageExample = {
  title: 'Article byline',
  description: 'Place the component in a byline row alongside the author name. The slotted text is hidden from view but measured for word count.',
  code: {
    html: `<div class="byline">
  <span>By UIBit Editors</span>
  <span>·</span>
  <uibit-read-timer show-icon>
    <div style="display:none">
      <!-- full article text goes here -->
    </div>
  </uibit-read-timer>
</div>`,
    react: `<div className="byline">
  <span>By UIBit Editors</span>
  <span>·</span>
  <uibit-read-timer show-icon>
    <div style={{ display: 'none' }}>{articleText}</div>
  </uibit-read-timer>
</div>`,
  },
  Demo,
};

export default example;
