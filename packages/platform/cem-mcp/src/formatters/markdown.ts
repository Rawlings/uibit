import type { ComponentApiInfo } from '../manifest-scanner.js';

export interface ApiFormatter {
  format(comp: ComponentApiInfo): string;
}

export class MarkdownFormatter implements ApiFormatter {
  /**
   * Helper to extract inline lifecycle metadata from descriptions (e.g. [deprecated: use X])
   * and clean up the description.
   */
  private parseInlineMetadata(description?: string): {
    cleanDesc: string;
    meta: string;
  } {
    if (!description) return { cleanDesc: '', meta: '' };

    let cleanDesc = description.trim();
    let meta = '';

    // Parse [deprecated: ...] or [deprecated]
    const deprMatch = cleanDesc.match(/\[deprecated(?::\s*([^\]]+))?\]/i);
    if (deprMatch) {
      meta += ` [deprecated${deprMatch[1] ? `: ${deprMatch[1]?.trim()}` : ''}]`;
      cleanDesc = cleanDesc.replace(deprMatch[0]!, '').trim();
    }

    // Parse [see: ...]
    const seeMatch = cleanDesc.match(/\[see:\s*([^\]]+)\]/i);
    if (seeMatch) {
      meta += ` [see: ${seeMatch[1]?.trim()}]`;
      cleanDesc = cleanDesc.replace(seeMatch[0]!, '').trim();
    }

    return { cleanDesc, meta };
  }

  public format(comp: ComponentApiInfo): string {
    const lines: string[] = [];

    // Header info
    lines.push(`tag: ${comp.tagName}`);
    lines.push(`class: ${comp.name}`);
    lines.push(`pkg: ${comp.package}`);

    if (comp.summary) {
      lines.push(`summary: ${comp.summary.trim()}`);
    }
    if (comp.description) {
      lines.push(`desc: ${comp.description.trim()}`);
    }
    if (comp.since) {
      lines.push(`since: ${comp.since}`);
    }
    if (comp.deprecated) {
      lines.push(`deprecated: ${comp.deprecated}`);
    }
    if (comp.see) {
      lines.push(`see: ${comp.see}`);
    }

    // Attributes
    if (comp.attributes && comp.attributes.length > 0) {
      lines.push('attrs:');
      for (const attr of comp.attributes) {
        const typeStr = attr.type ? ` (${attr.type})` : '';
        const defStr = attr.default ? ` = ${attr.default}` : '';
        const { cleanDesc, meta } = this.parseInlineMetadata(attr.description);
        const descStr = cleanDesc ? ` | ${cleanDesc}` : '';
        lines.push(`  - ${attr.name}${typeStr}${defStr}${meta}${descStr}`);
      }
    }

    // Properties
    if (comp.properties && comp.properties.length > 0) {
      lines.push('props:');
      for (const prop of comp.properties) {
        const typeStr = prop.type ? ` (${prop.type})` : '';
        const defStr = prop.default ? ` = ${prop.default}` : '';
        let meta = '';
        if (prop.deprecated) meta += ` [deprecated: ${prop.deprecated}]`;
        if (prop.see) meta += ` [see: ${prop.see}]`;
        if (prop.readonly) meta += ` [readonly]`;
        if (prop.writeonly) meta += ` [writeonly]`;

        const { cleanDesc, meta: inlineMeta } = this.parseInlineMetadata(
          prop.description,
        );
        const descStr = cleanDesc ? ` | ${cleanDesc}` : '';
        lines.push(
          `  - ${prop.name}${typeStr}${defStr}${meta}${inlineMeta}${descStr}`,
        );
      }
    }

    // Slots
    if (comp.slots && comp.slots.length > 0) {
      lines.push('slots:');
      for (const slot of comp.slots) {
        const nameStr = slot.name || 'default';
        const { cleanDesc, meta } = this.parseInlineMetadata(slot.description);
        const descStr = cleanDesc ? ` | ${cleanDesc}` : '';
        lines.push(`  - ${nameStr}${meta}${descStr}`);
      }
    }

    // Events
    if (comp.events && comp.events.length > 0) {
      lines.push('events:');
      for (const ev of comp.events) {
        const typeStr = ev.type ? ` (${ev.type})` : '';
        const { cleanDesc, meta } = this.parseInlineMetadata(ev.description);
        const descStr = cleanDesc ? ` | ${cleanDesc}` : '';
        lines.push(`  - ${ev.name}${typeStr}${meta}${descStr}`);
      }
    }

    // CSS Properties
    if (comp.cssProperties && comp.cssProperties.length > 0) {
      lines.push('cssProps:');
      for (const cp of comp.cssProperties) {
        const defStr = cp.default ? ` = ${cp.default}` : '';
        const { cleanDesc, meta } = this.parseInlineMetadata(cp.description);
        const descStr = cleanDesc ? ` | ${cleanDesc}` : '';
        lines.push(`  - ${cp.name}${defStr}${meta}${descStr}`);
      }
    }

    // CSS Custom States (JSDoc @cssstate)
    if (comp.cssStates && comp.cssStates.length > 0) {
      lines.push('cssStates:');
      for (const cs of comp.cssStates) {
        const { cleanDesc, meta } = this.parseInlineMetadata(cs.description);
        const descStr = cleanDesc ? ` | ${cleanDesc}` : '';
        lines.push(`  - :${cs.name}${meta}${descStr}`);
      }
    }

    // Methods
    if (comp.methods && comp.methods.length > 0) {
      lines.push('methods:');
      for (const method of comp.methods) {
        const params = (method.parameters || [])
          .map((p: any) => `${p.name}${p.type ? `: ${p.type}` : ''}`)
          .join(', ');
        const retType = method.return ? ` => ${method.return.type}` : '';
        let meta = '';
        if (method.deprecated) meta += ` [deprecated: ${method.deprecated}]`;
        if (method.see) meta += ` [see: ${method.see}]`;

        const { cleanDesc, meta: inlineMeta } = this.parseInlineMetadata(
          method.description,
        );
        const descStr = cleanDesc ? ` | ${cleanDesc}` : '';
        lines.push(
          `  - ${method.name}(${params})${retType}${meta}${inlineMeta}${descStr}`,
        );
      }
    }

    return lines.join('\n');
  }
}
