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

### Package Management

The repository uses common UDS tasks imported from `uds-common` v1.16.4:
- `create:package`, `create:test-bundle` - Package creation
- `deploy:test-bundle` - Bundle deployment  
- `setup:k3d-test-cluster` - Test cluster setup
- `lint`, `pull`, `upgrade`, `compliance` - Standard operations

## Architecture

### Package Structure

- **Root `zarf.yaml`** - Main package definition importing from `common/zarf.yaml`
- **`common/zarf.yaml`** - Core component definition with SocketZero Helm chart
- **`bundle/uds-bundle.yaml`** - UDS bundle for testing with dependencies
- **`chart/`** - UDS Package custom resources (SSO, network policies, virtual services)

### Key Components

1. **SocketZero Application** - Deployed via Helm chart from https://github.com/radiusmethod/socketzero-helm.git
2. **UDS Package Resource** - Configures SSO integration and network policies in `chart/templates/uds-package.yaml`
3. **Values Files** - Environment-specific configurations in `values/` directory

### Configuration

- **SSO Integration** - SAML-based authentication configured in UDS Package spec
- **Network Policies** - Ingress/egress rules with Istio gateway exposure on port 1234
- **Service Exposure** - SocketZero service exposed via tenant gateway at `socketzero.{{ domain }}`

## Image Registry

Uses Registry1 Iron Bank image: `registry1.dso.mil/ironbank/radiusmethod/socketzero/receiver:0.5.9`

## Testing Strategy

- **Health Checks** - Kubernetes deployment readiness validation
- **Ingress Testing** - HTTP status verification via curl
- **UI Testing** - Playwright tests running in containerized environment
- **Package Validation** - UDS Package CRD status monitoring

## Variables

Key Zarf variables defined in root `zarf.yaml`:
- `DOMAIN` (default: "uds.dev")
- `EXAMPLE_DB_USERNAME`, `EXAMPLE_DB_ENDPOINT` - Database configuration placeholders