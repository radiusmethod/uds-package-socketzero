# SocketZero UDS Package

### To build the zarf + UDS bundle run

```
uds zarf package create
uds create bundle --confirm
```

### To deploy the UDS package.

```shell
uds deploy bundle/uds-bundle-socketzero-arm64-0.0.1.tar.zst --confirm --set socketzero_license_org="<license-organization>" --set socketzero_license_key="<license-key>" --set socketzero_config="$(cat config.json | base64)"
```
