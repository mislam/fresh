# TypeZero ⚡️ A Next-Gen Node.js + TypeScript Starter Kit for 2025

![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D22-blue)
![TypeScript Version](https://img.shields.io/badge/TypeScript-5.7-blue)
![MIT License](https://img.shields.io/badge/License-MIT-orange)
![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen)

**The zero-configuration TypeScript boilerplate for modern backend
development** - Start building production-ready Node.js applications in seconds!
⏱️

## Why TypeZero?

Tired of wasting hours configuring TypeScript projects? TypeZero eliminates the
setup headache with:

⚡ **Blazing-fast development workflow** with live reload  
🔒 **Enterprise-grade code quality** (ESLint + Prettier + TypeScript)  
📦 **Future-proof ESM architecture** (Native ES Modules)  
🧪 **Testing powerhouse** (Vitest + 90% coverage enforcement)  
🚀 **Batteries-included** for 2025 backend development

## Get Started

### Create New Project

Scaffold a new project using your favorite package manager:

```bash
# NPM
npm create typezero@latest

# Yarn
yarn create typezero

# PNPM
pnpm create typezero

# Bun
bun create typezero
```

### Development Workflow

Use these essential commands to accelerate your development experience:

| Command                 | Action                              |
| ----------------------- | ----------------------------------- |
| `npm run dev`           | Start dev server with file watching |
| `npm run lint`          | Check code style and quality        |
| `npm run lint:fix`      | Fix code style and quality issues   |
| `npm test`              | Execute test suite                  |
| `npm run test:coverage` | Generate coverage reports           |
| `npm run build`         | Create production build             |
| `npm start`             | Start optimized production server   |

## Features

⚡ **TypeScript 5.7** - Strict type safety  
🛠️ **Code Quality Tools** - ESLint & Prettier  
🧪 **Vitest** - Fast testing with ≥90% coverage  
📦 **Native ESM** - Modern import/export syntax  
🚀 **Production-ready** - Optimized build and runtime configuration  
🔄 **Live reload** - Server restarts on file changes

## Project Structure

```tree
my-app/
│
├── src/               # Source code
│   ├── index.ts       # Entry point
│   ├── index.test.ts  # Entry point test suites
│   └── utils/         # Utility modules
│
├── build/             # Compiled output
│
├── .env               # Environment variables
├── .vscode/           # Editor settings
├── .prettierrc        # Code formatting rules
├── eslint.config.js   # ESLint configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vitest configuration
```

## Editor Integration

VS Code will automatically recommend:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

Pre-configured to enforce:

- Consistent code style across teams
- Auto-fix on save functionality
- Type-aware linting rules
- Minimum 90% test coverage
- ESM imports only (no CommonJS)
- Strict TypeScript checks

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

We welcome contributions through:

🐛 Bug Reports  
💡 Feature Requests  
📚 Documentation Improvements  
🛠️ Code Contributions

Please review our [Contribution Guide](CONTRIBUTING.md) before submitting changes.

**Development Note**  
This template uses `pnpm` for development to ensure consistent dependencies.
The `pnpm-lock.yaml` is only used for template development and won't be
included in your project when using `npm create typezero`.

> **Powered by TypeZero**  
> If this starter kit helps accelerate your development, consider showing your support with a ⭐ on [GitHub](https://github.com/mislam/typezero)!
