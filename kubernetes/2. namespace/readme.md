## Kubernetes Objects: Namespace

- Namespaces provide a mechanism for isolating groups of resources within a single cluster.​
  <br/>
- Most of the Kubernetes Objects are Inside any 1 namespace, and cannot directly communicate with other Objects outside the Namespace. ​
  <br/>
- For Running:
  ```bash
  kubectl apply -f ./templates/namespace.yaml
  kubectl apply -f ./templates
  ```
  <br/>
- For Deleting (namespace & pod both): `kubectl delete -f ./templates`
