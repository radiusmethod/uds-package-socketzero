# SocketZero UDS Package

### To build the zarf + UDS bundle run

```
uds zarf package create
uds create bundle --confirm
```

### To deploy the UDS package.

SocketZero ships we a free trial license up to 5 concurrent connections.  If you'd like to use SocketZero beyond this, please contact support@radiusmethod.com, to discuss increased license terms.

```shell
uds deploy bundle/uds-bundle-socketzero-arm64-0.0.1.tar.zst --confirm --set socketzero_license_org="<license-organization>" --set socketzero_license_key="<license-key>" --set socketzero_config="$(cat config.json | base64)" --set redis_password="<redis-password>"
```

### Configuration File Sample

This sample config.json will allow you to connect to the internal redis database that is used by SocketZero.  

```
{
    "authz": false,
    "cookie": "__Host-uds-package-socketzero-authservice-session-id-cookie",
    "redisHost": "socketzero-redis-bb-master.socketzero.svc.cluster.local:6379",
    "redisPassword": "",
    "tunnels": [
        {
            "hostname": "redis.uds.dev",
            "listenPort": 6379,
            "targetPort": 6379,
            "targetHost": "socketzero-redis-bb-master.socketzero.svc.cluster.local",
            "transport": "tcp",
            "friendlyName": "Redis",
            "iconUrl": "",
            "action": "command",
            "roles": ["redis"],
            "details":["redis-cli -h redis.uds.dev"]
        }
    ]
}
```