# Fresh

Fresh (a.k.a. `npm create fresh`) is a shortcut to create modern **Turbo Stacks** for web artisans.

## Tiramisu

Tiramisu is a first-class *Turbo Stack* powered by [Fresh]. It features zero-config [TypeScript] and ESM support, comprehensive testing tools powered by [Vitest], and efficient bundling capabilities for optimal performance. With [Biome] integration for modern linting and formatting, Tiramisu provides everything developers need to build production-ready applications with minimal setup and maximum developer productivity! ✨

[![Node.js][nodejs-badge]][Node.js]
[![TypeScript][ts-badge]][TypeScript]
[![Biome][biome-badge]][Biome]
[![Vitest][vitest-badge]][Vitest]
[![MIT][mit-badge]](LICENSE)

### Get Started

#### Create New Project

Scaffold a new Tiramisu project using your favorite package manager:

```bash
# NPM
npm create fresh@latest tiramisu

# Yarn
yarn create fresh tiramisu

# PNPM
pnpm create fresh tiramisu

# Bun
bun create fresh tiramisu
```

#### Development Workflow

Use these essential commands to accelerate your development experience:

| Command                 | Action                              |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start dev server with file watching |
| `npm run dev:test`      | Start test suite with file watching |
| `npm run check`         | Verify code formatting & lint rules |
| `npm run fix`           | Auto-fix formatting & lint issues   |
| `npm run format`        | Format code without lint fixes      |
| `npm run test`          | Execute test suite                  |
| `npm run test:coverage` | Generate test coverage reports      |
| `npm run build`         | Create production build             |
| `npm run start`         | Start optimized production server   |

#### Project Structure

```tree
my-app/
│
├── src/               # Source code
│   ├── index.ts       # Entry point
│   └── index.test.ts  # Entry point test
│
├── .env               # Environment variables
│
├── build/             # Compiled output
│
├── .vscode/           # Editor settings
├── biome.json         # Biome configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vitest configuration
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

Please review our [Contribution Guide](https://github.com/mislam/fresh/blob/main/CONTRIBUTING.md) before submitting changes.

> **Powered by Fresh**  
> If this turbo stack helps accelerate your development, consider showing your support with a ⭐ on [Fresh]!

[Fresh]: https://github.com/mislam/fresh
[Node.js]: https://nodejs.org/
[TypeScript]: https://www.typescriptlang.org/
[Biome]: https://biomejs.dev/
[Vitest]: https://vitest.dev/

[nodejs-badge]: https://img.shields.io/badge/Node.js-000000?style=flat-square&logo=node.js&logoColor=5CAA47
[ts-badge]: https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=3178C6
[biome-badge]: https://img.shields.io/badge/Biome-000000?style=flat-square&logo=biome&logoColor=5FA5FA
[vitest-badge]: https://img.shields.io/badge/Vitest-000000?style=flat-square&logo=vitest&logoColor=739C1C
[mit-badge]: https://img.shields.io/badge/License-MIT-000000?style=flat-square&logoColor=white
