# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UDS (Unicorn Delivery Service) package for SocketZero, following the Defense Unicorns UDS package template structure. The package deploys SocketZero application using Zarf and UDS bundle configurations with Helm charts.

## Development Commands

Use the UDS CLI with these tasks defined in `tasks.yaml`:

- `uds run` - Setup k3d cluster and deploy package (default)
- `uds run dev` - Create and deploy bundle on existing cluster (faster iteration)
- `uds run create-dev-package` - Create package with `--skip-sbom` flag
- `uds run test-install` - Test deploying current branch to new cluster
- `uds run test-upgrade` - Test upgrade from latest released package
- `uds run publish-package` - Build, test, and publish packages

### Testing Commands

- `uds run test:all` - Run all tests (health check, ingress, UI tests)
- `uds run test:health-check` - Verify SocketZero deployment is available
- `uds run test:ingress` - Check SocketZero UI accessibility at https://socketzero.uds.dev
- `uds run test:ui` - Run Playwright tests in Docker container

To run Playwright tests locally without Docker:
```bash
cd tests && npm ci && npx playwright test
# Run a single test file:
npx playwright test socketzero.test.ts
# Run with specific browser:
npx playwright test --project=chromium
```

### Package Management

The repository uses common UDS tasks imported from `uds-common` v1.23.0:
- `create:package`, `create:test-bundle` - Package creation
- `deploy:test-bundle` - Bundle deployment
- `setup:k3d-test-cluster` - Test cluster setup
- `lint`, `pull`, `upgrade`, `compliance` - Standard operations

### Manual Build & Deploy

```bash
uds zarf package create
uds create bundle --confirm
uds deploy bundle/uds-bundle-socketzero-<arch>-0.0.1.tar.zst --confirm \
  --set socketzero_license_org="<org>" \
  --set socketzero_license_key="<key>" \
  --set socketzero_config="$(cat config.json | base64)"
```

## Architecture

### Package Structure

- **Root `zarf.yaml`** - Main package definition importing from `common/zarf.yaml`
- **`common/zarf.yaml`** - Core component definition with SocketZero Helm chart and UDS config chart
- **`bundle/uds-bundle.yaml`** - UDS bundle for testing with variable overrides
- **`chart/`** - UDS Package custom resources (SSO, network policies, virtual services)

### Key Components

1. **SocketZero Application** - Deployed via Helm chart from https://github.com/radiusmethod/socketzero-helm.git (v0.7.0)
2. **Redis** - Bundled dependency using Iron Bank image (`registry1.dso.mil/ironbank/bitnami/redis:8.0.3`)
3. **UDS Package Resource** - Configures SSO integration and network policies in `chart/templates/uds-package.yaml`
4. **Values Files** - Environment-specific configurations in `values/` directory

### Configuration

- **SSO Integration** - Keycloak-based authentication with authservice selector on `app.kubernetes.io/name: socketzero`
- **Network Policies** - Ambient mesh mode with intra-namespace ingress/egress rules
- **Service Exposure** - SocketZero service exposed via tenant gateway on port 9997 at `socketzero.{{ domain }}`

## Image Registry

Uses Registry1 Iron Bank images:
- `registry1.dso.mil/ironbank/radiusmethod/socketzero/receiver:0.7.0`
- `registry1.dso.mil/ironbank/bitnami/redis:8.0.3`

## Variables

Key Zarf variables defined in root `zarf.yaml`:
- `DOMAIN` (default: "uds.dev")
- `SOCKETZERO_CONFIG` - Base64-encoded JSON configuration
- `SOCKETZERO_LICENSE_ORG` - Organization name for license
- `SOCKETZERO_LICENSE_KEY` - License key

## Commit Linting

This repository uses [Conventional Commits](https://www.conventionalcommits.org/) format. The CI workflow (`.github/workflows/commitlint.yaml`) validates **PR titles** against this format.

### Format

```
<type>(<optional scope>): <description>
```

### Valid Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, missing semicolons, etc.
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `perf` - Performance improvement
- `test` - Adding or updating tests
- `build` - Changes to build system or dependencies
- `ci` - CI configuration changes
- `chore` - Other changes that don't modify src or test files
- `revert` - Reverts a previous commit

### Examples

```
feat: add redis support
fix(sso): correct keycloak redirect URL
chore: sync with uds package template
docs: update deployment instructions
```

### Local Validation

Run commitlint locally:
```bash
echo "your commit message" | npx commitlint
```

The configuration is in `commitlint.config.js`.