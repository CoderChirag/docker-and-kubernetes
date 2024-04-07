## Kubernetes Object: HorizontalPodAutoscaler (HPA)

- HorizontalPodAutoscaler (HPA) helps you automatically scale workloads horizontally.​
  <br/>
- It is implemented as a Kubernetes API Resources and a Controller​
  <br/>
- It periodically adjusts the number of replicas in a workload to match observed resource utilization such as CPU or memory usage.
  <br/>
- For running:
  ```bash
  minikube addon enable metrics-server
  kubectl apply -f ./templates
  ```
  <br/>
- For Deleting: `kubectl delete -f ./templates`
