.PHONY: package
package:
	uds zarf package create --confirm

.PHONY: bundle
bundle:
	uds create bundle --confirm

.PHONY: deploy
deploy:
	uds deploy bundle/uds-bundle-socketzero-arm64-dev.tar.zst --confirm --set config="$(cat config.json)"

.PHONY: all
all: package bundle deploy

.DEFAULT_GOAL := help
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  package   - Create the zarf package"
	@echo "  bundle    - Create the UDS bundle"
	@echo "  deploy    - Deploy the bundle"
	@echo "  help      - Show this help message"
