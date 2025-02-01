# TypeZero – A Next-Gen Node.js + TypeScript Starter Kit for 2025

![Node.js Version](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript Version](https://img.shields.io/badge/typescript-5.7-blue)
![Test Coverage](https://img.shields.io/badge/coverage-90%25-success)
![License](https://img.shields.io/badge/license-MIT-green)
![Bundle Size](https://img.shields.io/badge/bundle-optimized-brightgreen)

**The zero-configuration TypeScript boilerplate for modern backend
development** - Start building production-ready Node.js applications in seconds
⏱️

## Why TypeZero?

Tired of wasting hours configuring TypeScript projects? TypeZero eliminates the
setup headache with:

- ⚡ **Blazing-fast development workflow** with hot reload
- 🔒 **Enterprise-grade code quality** (ESLint + Prettier + TypeScript strict
  mode)
- 📦 **Future-proof ESM architecture** (Native ES Modules)
- 🧪 **Testing powerhouse** (Vitest + 90% coverage enforcement)
- 🚀 **Batteries-included** for 2025 backend development

## 🌟 Featured In

[![Featured on NodeWeekly](https://img.shields.io/badge/Featured-NodeWeekly-important)](https://nodeweekly.com)
[![Trending on GitHub](https://img.shields.io/badge/Trending-GitHub-black)](https://github.com/trending)

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

## Requirements

- Node.js 22+ (LTS recommended)

## Quick Start

```bash
npx degit mislam/typezero my-app
cd my-app
```

Make a copy of `.env.example` and name it `.env`:

```bash
cp .env.example .env
```

Install dependencies & start development server:

```bash
npm install
npm run dev
```

## Project Structure

```tree
my-app/
│
├── src/              # Source code
│   ├── index.ts      # Entry point
│   └── utils/        # Utility modules
│
├── build/            # Compiled output
│
├── .env              # Environment variables
├── .vscode/          # Editor settings
├── .prettierrc       # Code formatting rules
├── eslint.config.js  # ESLint configuration
├── tsconfig.json     # TypeScript configuration
└── vite.config.ts    # Vitest configuration
```

## Core Commands

| Command                 | Action                           |
| ----------------------- | -------------------------------- |
| `npm run dev`           | Start dev server with hot reload |
| `npm run lint`          | Check code quality               |
| `npm run lint:fix`      | Fix linting/formatting issues    |
| `npm test`              | Run all tests                    |
| `npm run test:coverage` | Generate coverage report         |
| `npm run build`         | Compile to `build/` directory    |
| `npm start`             | Start production server          |

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
