# Fresh

Fresh is a swiss army knife to create modern **Turbo Stacks** for web artisans. Generate production-ready project scaffolds with zero configuration using your favorite technologies and package managers.

[![TypeScript][ts-badge]][TypeScript]
[![Node.js][nodejs-badge]][Node.js]
[![MIT License][mit-badge]][license]

## Quick Start

Create a new project using your favorite package manager:

```bash
# NPM
npm create fresh@latest

# Yarn
yarn create fresh@latest

# PNPM
pnpm create fresh@latest

# Bun
bun create fresh@latest
```

Follow the interactive prompts to select a recipe and configure your project.

### Non-Interactive Mode

You can also specify a recipe and target directory directly:

```bash
npm create fresh@latest tiramisu my-app
```

## Available Recipes

Fresh provides several recipes to match your preferences:

### Tiramisu

A minimal TypeScript stack with Biome and Vitest. Perfect for general-purpose Node.js applications.

```bash
npm create fresh@latest tiramisu
```

[![Node.js][nodejs-badge]][Node.js]
[![TypeScript][ts-badge]][TypeScript]
[![Biome][biome-badge]][Biome]
[![Vitest][vitest-badge]][Vitest]

### Honeybun

A modern web framework powered by Hono and Bun. Ideal for high-performance web APIs and applications.

```bash
bun create fresh@latest honeybun
```

[![Bun][bun-badge]][Bun]
[![TypeScript][ts-badge]][TypeScript]
[![Hono][hono-badge]][Hono]
[![Biome][biome-badge]][Biome]

### Contributing

We welcome contributions through:

🐛 Bug Reports  
💡 Feature Requests  
📚 Documentation Improvements  
🛠️ Code Contributions  

Please review our [Contribution Guide](CONTRIBUTING.md) before submitting changes.

### License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

> If Fresh helps accelerate your development, consider showing your support with a ⭐!

[TypeScript]: https://www.typescriptlang.org/
[Node.js]: https://nodejs.org/
[Bun]: https://bun.sh
[Hono]: https://hono.dev/
[Biome]: https://biomejs.dev/
[Vitest]: https://vitest.dev/
[license]: LICENSE

[ts-badge]: https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=3178C6
[nodejs-badge]: https://img.shields.io/badge/Node.js-000000?style=flat-square&logo=node.js&logoColor=5CAA47
[bun-badge]: https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white
[hono-badge]: https://img.shields.io/badge/Hono-000000?style=flat-square&logo=hono&logoColor=E36002
[biome-badge]: https://img.shields.io/badge/Biome-000000?style=flat-square&logo=biome&logoColor=5FA5FA
[vitest-badge]: https://img.shields.io/badge/Vitest-000000?style=flat-square&logo=vitest&logoColor=739C1C
[mit-badge]: https://img.shields.io/badge/License-MIT-000000?style=flat-square&logoColor=white
