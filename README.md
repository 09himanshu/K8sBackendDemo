# Node.js CRUD App with Docker & Kubernetes

A simple Node.js app using Fastify and MongoDB, containerized with Docker, and deployed locally using Kubernetes.

## 🔧 Tech Stack
- **Fastify** – Web framework for Node.js
- **MongoDB** – NoSQL database
- **Docker** – For containerizing the application
- **Kubernetes** – For container orchestration
- **YAML** – Configuration files for Kubernetes

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/09himanshu/K8sBackendDemo.git
cd K8sBackendDemo
npm install
```

### ⚙️ Setup Environment Variables

Create a .env file in the root directory:

```
url=<db_url> # env file content
db_name=<db_name> # env file content
```
Example

```
url=mongodb://mongo:27017
db_name=sampledb
```

### Docker Instructions
**Build the Docker Image**

```bash
docker build -t sample_app .
```

**Run the Container Locally**
```bash
docker run -d --name sample_app -p 5000:5000 sample_app
```

### ☸️ Kubernetes Deployment
Make sure your local Kubernetes cluster is running (e.g., Minikube, k3s, etc.)
**Deploy the App**

```bash
kubectl apply -f deployment.yml
kubectl apply -f service.yml
```

**Check Kubernetes Resources**

```bash
kubectl get pods
kubectl get deployments
kubectl get svc
```

### 🌐 Access the App
**1.Get the NodePort assigned to your service:**
```bash
kubectl get svc
```

Example
```
sample-service   NodePort   10.96.0.1   <none>   5000:30001/TCP   10m
```

**2.Find your system’s IP address:**
```bash
ip addr | grep inet
```

Example ```bash 192.168,1.10```

**3.Open the app in your browser:**
```bash
http://192.168.1.9:30001
```
---
Let me know if you want me to tailor this further — for example, if your MongoDB is **not running in Kubernetes**.


