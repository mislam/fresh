# TypeZero ⚡️

**Kickstart your Node.js project like never before!**

![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D22-blue)
![TypeScript Version](https://img.shields.io/badge/Typescript-5.7-blue)
![MIT License](https://img.shields.io/badge/License-MIT-orange)
![Production Ready](https://img.shields.io/badge/Production-Ready-brightgreen)

Create production-ready Node.js applications in seconds with TypeScript, ESM, Linting, Testing, and so much more!

## Quick Start

Just run:

```bash
npm create typezero@latest
```

And... Baaaam! 💥

> Note: This project inherited its standards and best practices from awesome big brothers: **Vite**, **Next.js** and **SvelteKit**! And code-reviewed by **OpenAI**'s GPT models, **DeepSeek R1**, and Anthropic's **Claude** Sonnet 3.5!

## WTH is TypeZero?

TypeZero is a Zero-Config TypeScript starter for modern Node.js development. All bells and whistles are included and pre-configured for 2025!

## Why TypeZero?

You gotta be kidding me! Are you still not tired of wasting hours configuring your TypeScript projects? It's **2025** bro!

TypeZero eliminates the setup headache with:

- ⚡ **Blazing-fast development workflow** with live reload
- 🔒 **Enterprise-grade code quality** (ESLint + Prettier + TypeScript strict
  mode)
- 📦 **Future-proof ESM architecture** (Native ES Modules)
- 🧪 **Testing powerhouse** (Vitest + 90% coverage enforcement)
- 🚀 **Batteries-included** for 2025 backend development

## 🛠️ Developer Experience Highlights

| 🚄 Rapid Development          | 🛡️ Production Essentials     |
| ----------------------------- | ---------------------------- |
| ✅ Zero-config TypeScript 5.7 | ✅ Optimized build pipeline  |
| ✅ Instant dev server         | ✅ Docker-ready architecture |
| ✅ Smart import aliases       | ✅ Env validation system     |
| ✅ VS Code perfection         | ✅ Performance benchmarks    |

## Core Features

- **Modern JavaScript Foundation**

  - Node.js 22+ (LTS) with native ESM
  - TypeScript 5.7 strict mode
  - ESLint flat config (2025 standard)
  - Prettier code formatting

- **Testing Excellence**

  - Vitest test runner (Jest-compatible)
  - Coverage thresholds enforcement
  - Benchmarking support
  - Mocking utilities

- **Production Optimization**
  - Minimal dependency tree
  - Security-hardened configs
  - Multi-stage build support
  - Health check endpoints

## Features

Jumpstart your next TypeScript project with:

- ⚡ **TypeScript 5.7** - Strict type safety
- 🛠️ **Code Quality Tools** - ESLint & Prettier
- 🧪 **Vitest** - Fast testing with 90%+ coverage
- 📦 **Native ESM** - Modern import/export syntax
- 🚀 **Production-ready configuration** - Build & start scripts
- 🔄 **Live reload** - Server restarts on file changes

## Requirements

- Node.js 22+ (LTS recommended)

## Project Structure

```tree
my-app/
│
├── src/               # Source code
│   ├── index.ts       # Entry point
│   ├── index.test.ts  # Entry point test
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

## Core Commands

| Command                 | Action                            |
| ----------------------- | --------------------------------- |
| `npm run dev`           | Start dev server with live reload |
| `npm run lint`          | Check code quality                |
| `npm run lint:fix`      | Fix linting/formatting issues     |
| `npm test`              | Run all tests                     |
| `npm run test:coverage` | Generate coverage report          |
| `npm run build`         | Compile to `build/` directory     |
| `npm start`             | Start production server           |

## Editor Setup

When opening the project in VS Code, you'll be prompted to install recommended
extensions. These include:

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint),
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode),
and
[EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

This project includes configuration files that will automatically:

- Apply consistent code formatting
- Enforce code quality rules
- Configure editor settings (line endings, indentation)

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

We deeply appreciate ❤️ contributions from our community! Whether you're fixing
a typo or building new features, your help makes this project better for
everyone. Please see our [contribution guide](CONTRIBUTING.md) for details on
how to get started.

When developing the template itself, the template's development uses `pnpm` for
package management for consistent dependencies. The `pnpm-lock.yaml` file is
only present in this repository for template development. It will **not** be
included when users create new projects using `npm create typezero` (coming
soon).

> **Note**: This project is based on
> [TypeZero](https://github.com/mislam/typezero). If this template helps you
> kickstart your project, we'd be grateful if you could ⭐ the original
> repository to support its development!
