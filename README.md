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

### To test remotely

Copy the remote kubeconfig locally.

```shell
ssh -l 127.0.0.1:6550:127.0.0.1:6550 user@remote-ip -i ~/.ssh/key.pem
```
