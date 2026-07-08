# UIBit AI Skills Directory

This directory contains skill definitions for AI-assisted development of Lit web components in the UIBit project.

## Available Skills

### Component Development

- **[lit-component-generator](./lit-component-generator/SKILL.md)** - Generate new components with scaffolding, tests, and docs
- **[lit-component-refactor](./lit-component-refactor/SKILL.md)** - Refactor components for quality and performance

### Quality Assurance

- **[lit-a11y-audit](./lit-a11y-audit/SKILL.md)** - Audit components for WCAG compliance
- **[lit-test-generator](./lit-test-generator/SKILL.md)** - Generate comprehensive test suites

### Documentation & Build

- **[lit-docs-generator](./lit-docs-generator/SKILL.md)** - Auto-generate component documentation
- **[lit-build-optimizer](./lit-build-optimizer/SKILL.md)** - Optimize build configuration and bundle size

## How Skills Work

### Discovery
Skills are automatically discovered from `.agents/skills/[name]/SKILL.md` files.

### Invocation
Via Claude Code CLI:
```bash
claude --skill <skill-name> --args '{...}'
```

Via Claude Code in IDE/Web:
- Open Command Palette
- Search "Claude: Run Skill"
- Select skill and configure args

### Args Format
Pass arguments as JSON objects:
```bash
claude --skill lit-component-generator --args '{
  "componentName": "MyButton",
  "category": "forms",
  "description": "A button component"
}'
```

## Creating Custom Skills

### Step 1: Create Directory Structure
```bash
mkdir -p .agents/skills/my-skill
```

### Step 2: Add SKILL.md
Copy [SKILL-TEMPLATE.md](./SKILL-TEMPLATE.md) and fill in:
- Frontmatter metadata (`name`, `description`, etc.)
- Purpose and capabilities
- Input parameters table
- Usage examples
- Output description
- Implementation details
- Next steps and verification

### Step 3: Register in Configuration
Add to `.claude/settings.json`:
```json
{
  "skills": {
    "my-skill": {
      "enabled": true,
      "path": ".agents/skills/my-skill"
    }
  }
}
```

### Step 4: Add Skill Handler (Optional)
For advanced skills, add implementation:
```bash
touch .agents/skills/my-skill/handler.js
```

### Step 5: Test
```bash
claude --skill my-skill --args '{}'
```

## Skill Structure

Each skill directory should contain:

```
.agents/skills/<skill-name>/
├── SKILL.md              # Main skill documentation
├── handler.js            # (Optional) Skill implementation
├── templates/            # (Optional) Code templates
│   ├── component.ts
│   ├── test.ts
│   └── ...
└── examples/             # (Optional) Example outputs
```

## SKILL.md Format

Required frontmatter:
```yaml
---
name: skill-name              # Unique identifier (kebab-case)
description: One-line desc    # Shown in skill list
category: development         # Category for grouping
tags: [tag1, tag2]           # Searchable tags
author: Your Name            # Who maintains it
---
```

Required sections:
1. **What It Does** - Purpose and capabilities
2. **Input Parameters** - Table of args with types
3. **Usage Examples** - 2-3 concrete examples
4. **Output** - What gets generated/returned
5. **Next Steps** - What user should do after

Optional sections:
- Implementation Details
- Integration Points
- Configuration
- Troubleshooting
- Related Skills

## Skill Guidelines

### Naming
- Use kebab-case: `my-awesome-skill`
- Prefix by domain: `lit-`, `test-`, `docs-`, etc.
- Make it searchable: avoid abbreviations

### Description
- One line, 50-80 characters
- Action verb: "Generate", "Audit", "Optimize"
- Include domain: "for Lit web components"
- Example: "Generate comprehensive test suites for Lit web components"

### Parameters
- Always provide sensible defaults
- Use clear, descriptive names
- Include type information
- Document all parameters in table format
- Show examples with different parameter combinations

### Examples
- Provide 2-3 realistic usage examples
- Include both basic and advanced uses
- Make examples copy-paste ready
- Show complete JSON args

### Output
- Describe what gets generated/modified
- List files created or modified
- Show example output format
- Include metrics or reports if applicable

## Best Practices

### For Skill Authors

1. **Test thoroughly** - Skills should work reliably
2. **Document completely** - Users shouldn't need to guess
3. **Provide examples** - Multiple real-world scenarios
4. **Handle errors** - Clear error messages and recovery
5. **Be consistent** - Follow naming and documentation patterns
6. **Link related skills** - Help users discover workflows
7. **Keep focused** - One skill = one clear purpose

### For Skill Users

1. **Read the SKILL.md** - Understand what it does first
2. **Try examples** - Start with documented examples
3. **Review output** - Understand what was generated
4. **Customize** - Adapt generated output for your needs
5. **Verify** - Test that generated code works
6. **Combine skills** - Chain skills for complex workflows

## Skill Workflows

### Component Development Workflow
```
1. lit-component-generator
   ↓ (creates new component)
2. lit-test-generator
   ↓ (creates test suite)
3. lit-component-refactor (optional)
   ↓ (improves code quality)
4. lit-docs-generator
   ↓ (creates documentation)
5. lit-build-optimizer
   ↓ (optimizes for production)
```

### Quality Review Workflow
```
1. lit-a11y-audit
   ↓ (checks accessibility)
2. lit-test-generator
   ↓ (ensures test coverage)
3. lit-build-optimizer
   ↓ (checks performance)
```

### Refactoring Workflow
```
1. lit-component-refactor
   ↓ (improves code)
2. (Run tests to verify)
3. lit-a11y-audit
   ↓ (verify accessibility)
4. lit-build-optimizer
   ↓ (check performance impact)
```

## Configuration

Skills are configured in `.claude/settings.json`:

```json
{
  "skills": {
    "lit-component-generator": {
      "enabled": true,
      "timeout": 60000,
      "maxTokens": 10000
    },
    "lit-a11y-audit": {
      "enabled": true,
      "wcagLevel": "AA"
    }
  }
}
```

## Troubleshooting

### Skill Not Appearing
1. Check `.agents/skills/[name]/SKILL.md` exists
2. Verify frontmatter format (valid YAML)
3. Check `name:` field is unique
4. Run `claude --refresh` to reload

### Skill Failing
1. Check input parameters match expected types
2. Review error message carefully
3. Try simple example first
4. Check `.claude/settings.json` configuration

### Skill Output Issues
1. Review generated output carefully
2. Check example outputs in SKILL.md
3. Customize template files if needed
4. Report issues if behavior is unexpected

## Contributing

To contribute a new skill:

1. Create skill in `.agents/skills/[name]/`
2. Write comprehensive SKILL.md
3. Test thoroughly with examples
4. Add to this README's available skills
5. Update `.claude/settings.json`
6. Create PR for review

## Resources

- [Skill Template](./SKILL-TEMPLATE.md) - Start here for new skills
- [AGENTS.md](../AGENTS.md) - Overview of AI agent architecture
- [Contributing Guide](../../CONTRIBUTING.md) - Contribution guidelines
- [Claude Code Documentation](https://github.com/anthropics/claude-code) - Main Claude Code docs

## Questions?

- Check the specific [SKILL.md](./lit-component-generator/SKILL.md) for skill-specific questions
- Review examples and troubleshooting in each skill's documentation
- See [CONTRIBUTING.md](../../CONTRIBUTING.md) for general questions

---

**Last Updated:** 2026-07-08

Each skill is maintained by its author. Check the `author:` field in the skill's SKILL.md for questions.
