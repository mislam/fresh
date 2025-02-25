# Fresh

Fresh (a.k.a. `npm create fresh`) is a shortcut to create modern **Turbo Stacks** for web artisans.

## Honeybun

Honeybun is a first-class *Turbo Stack* powered by [Fresh], [Hono], and [Bun]. It features zero-config [TypeScript] and ESM support, comprehensive built-in testing tools, and efficient bundling capabilities. With [Biome] integration for modern linting and formatting, Honeybun provides everything developers need to build production-ready applications with minimal setup and blazing-fast performance! ⚡️

[![Bun][bun-badge]][Bun]
[![TypeScript][ts-badge]][TypeScript]
[![Hono][hono-badge]][Hono]
[![Biome][biome-badge]][Biome]
[![MIT][mit-badge]](LICENSE)

### Get Started

#### Install Bun

Install `bun` from [bun.sh][Bun] if you don't have it already.

#### Create a Project

Scaffold a new Honeybun project:

```bash
bun create fresh honeybun
```

#### Development Workflow

Use these essential commands to accelerate your development experience:

| Command                 | Action                              |
| ----------------------- | ----------------------------------- |
| `bun run dev`           | Start dev server with file watching |
| `bun run dev:test`      | Start test suite with file watching |
| `bun run check`         | Verify code formatting & lint rules |
| `bun run fix`           | Auto-fix formatting & lint issues   |
| `bun run format`        | Format code without lint fixes      |
| `bun run test`          | Execute test suite                  |
| `bun run test:coverage` | Generate test coverage reports      |
| `bun run build`         | Create production build             |
| `bun run start`         | Start optimized production server   |

#### Project Structure

```tree
project/
│
├── .vscode/           # Editor settings
│
├── src/               # Source code
│   ├── index.ts       # Entry point
│   └── index.test.ts  # Entry point test
│
├── .env               # Environment variables
│
├── build/             # Compiled output
│
├── biome.json         # Biome configuration
└── tsconfig.json      # TypeScript configuration
```

#### Editor Integration

VS Code will automatically recommend [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for linting and formatting.

### License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

### Contributing

We welcome contributions through:

🐛 Bug Reports  
💡 Feature Requests  
📚 Documentation Improvements  
🛠️ Code Contributions

Please review our [Contribution Guide](CONTRIBUTING.md) before submitting changes.

> **Powered by Fresh**  
> If this starter kit helps accelerate your development, consider showing your support with a ⭐ on [GitHub](https://github.com/mislam/fresh)!

[Fresh]: https://github.com/mislam/fresh
[Bun]: https://bun.sh
[TypeScript]: https://www.typescriptlang.org/
[Hono]: https://hono.dev/
[Biome]: https://biomejs.dev/

[bun-badge]: https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white
[ts-badge]: https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=3178C6
[hono-badge]: https://img.shields.io/badge/Hono-000000?style=flat-square&logo=hono&logoColor=E36002
[biome-badge]: https://img.shields.io/badge/Biome-000000?style=flat-square&logo=biome&logoColor=5FA5FA
[mit-badge]: https://img.shields.io/badge/License-MIT-000000?style=flat-square&logoColor=white
