# Jenkins CI/CD – Node.js Full Stack App

This repository is a **learning-focused CI/CD project** built to understand how modern DevOps pipelines work using **Jenkins, Docker, and Cloud infrastructure**.

The goal is not to build a complex MERN app, but to **practice real-world CI/CD concepts end to end**.

---

## What this project does

* Builds **frontend (Vite)** and **backend (Node.js)** in parallel
* Runs automated tests for both
* Builds a Docker image after successful tests
* Pushes the image to a private Docker Hub repository
* Deploys the container to an AWS EC2 instance using SSH

All of this is orchestrated through a **Jenkins Declarative Pipeline**.

---

## Tech stack

* **Frontend**: Vite + JavaScript
* **Backend**: Node.js 
* **CI/CD**: Jenkins
* **Containerization**: Docker
* **Cloud**: AWS EC2
* **Version Control**: GitHub

---

## CI/CD pipeline overview

1. **Build & Test**

   * Frontend and backend build and test run in parallel

2. **Docker Image**

   * Image is built only if tests pass
   * Image is pushed to Docker Hub

3. **Deployment**

   * Jenkins connects to EC2 via SSH
   * Pulls latest image
   * Stops old container (if any)
   * Runs the new container

---

## Why this project

This project was created to:

* Learn Jenkins pipelines deeply
* Understand CI vs CD clearly
* Practice Docker-based deployments
* Work with real cloud infrastructure
* Debug real-world DevOps issues (permissions, networking, SSH, CORS, etc.)

---

## Note

* Infrastructure is **created and destroyed as needed** to avoid cloud charges
* Built while learning DevOps and cloud engineering



