---
name: skill-template
description: Template for creating new custom skills
category: template
tags: [template, example, howto]
author: Your Name
---

# Skill Template

Use this as a template for creating new custom skills. This skill provides a structured format for documenting AI-assisted workflows for your project.

## Frontmatter

The `---` YAML frontmatter is required:

- **name** - Unique kebab-case identifier (used in CLI)
- **description** - One-line summary (shown in skill list)
- **category** - Skill category (development, quality, documentation, etc.)
- **tags** - Array of searchable tags
- **author** - Your name or team name

## What It Does

Describe the skill's purpose in 2-3 sentences. What problem does it solve? What tasks does it automate?

## Input Parameters

Document all input parameters as a table:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| param1 | string | ✓ | Description of param1 |
| param2 | boolean | | Description of param2 (optional) |
| param3 | number | | Default value and description |

## Usage Examples

Provide 2-3 concrete examples of how to use the skill:

### Example 1: Basic Usage
```bash
claude --skill your-skill-name --args '{
  "param1": "value1",
  "param2": true
}'
```

### Example 2: Advanced Usage
```bash
claude --skill your-skill-name --args '{
  "param1": "value1",
  "param2": false,
  "param3": 42
}'
```

## What It Generates/Produces

Describe the output:
- Files created/modified
- Analysis produced
- Recommendations generated
- Code examples provided

## Implementation Details

### Section 1
Describe major functionality, algorithms, or patterns used.

Include code examples:
```typescript
// Example code
const myFunction = () => {
  // Implementation
};
```

### Section 2
More detailed information about the skill's behavior.

### Section 3
Edge cases, limitations, or special considerations.

## Integration Points

How does this skill integrate with other tools/skills/workflows?

- Works with: Other skills or tools
- Depends on: Prerequisites or requirements
- Outputs for: Skills that consume this skill's output

## Configuration

Any configuration needed:

```json
{
  "setting1": "value",
  "setting2": true
}
```

## After Using This Skill

What should the user do after running the skill?

1. Step 1
2. Step 2
3. Step 3

## Verification

How to verify the skill worked correctly:

- ✓ Check for expected files
- ✓ Verify output format
- ✓ Test the generated code
- ✓ Review generated documentation

## Troubleshooting

### Issue 1
Description and solution.

### Issue 2
Description and solution.

## Related Skills

Links to related skills:

- **skill-name** - Related skill description

## Next Steps

What should the user do next?

1. Use **another-skill** to process the output
2. Run tests to verify
3. Review generated code

---

**Best Practice:** Describe the skill from the user's perspective. Focus on outcomes, not implementation details.

**Pro Tips:**
- Provide complete, runnable examples
- Include expected output or results
- Mention common pitfalls
- Link to related documentation
