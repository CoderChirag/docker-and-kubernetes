## Single pod Kube Deployment Setup

### Pre-requisites:

- You should have a running kubernetes cluster. (Minikube or Cloud)

## Setup:

- cd into the folder: `cd kube-single-pod-deployment`
- Create Pod: `kubectl apply -f pod.yaml`
- Create NodePort Service: `kubectl apply -f service.yaml`
- Visit the Node IP of your cluster with the NodePort specified in the YAML file (`31515` in my case): `http://<cluster-ip>:31515`

**Note:**

- For minikube on Mac platform (if using vm environment instead of docker desktop), first start minikube with `minikube start --network=socket_vmnet` and then run: `minikube service <service-name> --url`. Then visit the provided url while keeping that terminal window open.
