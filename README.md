# TypeZero ⚡️ A Next-Gen Node.js + TypeScript Starter Kit for 2025

![Bun Version](https://img.shields.io/badge/Bun-1.2.2-blue)
![TypeScript Version](https://img.shields.io/badge/TypeScript-5.7-blue)
![Hono Version](https://img.shields.io/badge/Hono-4.7.2-blue)
![Biome Version](https://img.shields.io/badge/Biome-1.9.4-orange)
![MIT License](https://img.shields.io/badge/License-MIT-orange)
![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen)

**The zero-configuration TypeScript boilerplate for modern backend
development** - Start building production-ready Node.js applications in seconds!
⏱️

## Get Started

### Install Bun

Install `bun` from <https://bun.sh/> if you don't have it already.

### Create New Project

Scaffold a new TypeZero project using `bun`:

```bash
bun create typezero
```

### Development Workflow

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

## Project Structure

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

## Editor Integration

VS Code will automatically recommend [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for linting and formatting.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

We welcome contributions through:

🐛 Bug Reports  
💡 Feature Requests  
📚 Documentation Improvements  
🛠️ Code Contributions

Please review our [Contribution Guide](CONTRIBUTING.md) before submitting changes.

> **Powered by TypeZero**  
> If this starter kit helps accelerate your development, consider showing your support with a ⭐ on [GitHub](https://github.com/mislam/typezero)!
