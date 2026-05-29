# 🚀 DevOps Mastery Project — TaskFlow

## What You Will Build

A full-stack **Task Manager web app** called **TaskFlow**, designed specifically to teach you every concept needed for an industry-level DevOps role.


---

## What the App Does (Keep It Simple — Focus on DevOps)

- Users can create, read, update, delete tasks 
- Frontend: Next.js (Node.js server — the important DevOps case)
- Backend: Express.js REST API
- Database: PostgreSQL

The DevOps infrastructure.

---

## Architecture Overview

```
                        ┌─────────────────────────────────────────┐
                        │              AWS Cloud (EKS)             │
                        │                                          │
  User Browser          │   ┌──────────┐      ┌──────────────┐    │
      │                 │   │  Ingress  │      │  Next.js     │    │
      │  HTTPS          │   │  (nginx)  │─────▶│  Frontend    │    │
      └────────────────▶│   └──────────┘      │  Pod(s)      │    │
                        │                     └──────┬───────┘    │
                        │                            │ REST API    │
                        │                     ┌──────▼───────┐    │
                        │                     │  Express.js  │    │
                        │                     │  Backend     │    │
                        │                     │  Pod(s)      │    │
                        │                     └──────┬───────┘    │
                        │                            │             │
                        │                     ┌──────▼───────┐    │
                        │                     │  PostgreSQL   │    │
                        │                     │  (AWS RDS)    │    │
                        │                     └──────────────┘    │
                        └─────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │                    CI/CD Pipeline (GitHub Actions)               │
  │                                                                  │
  │  Code Push → Tests → Docker Build → Push to ECR → Deploy to EKS │
  └─────────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────────┐
  │              Monitoring Stack (in Kubernetes)                    │
  │                                                                  │
  │         Prometheus (metrics) → Grafana (dashboards)             │
  └─────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | Next.js 14 | Node.js server — real DevOps deployment challenge |
| Backend | Express.js | Simple REST API |
| Database | PostgreSQL | Industry standard relational DB |
| Container | Docker | Package everything identically |
| Local Dev | Docker Compose | Run all services locally with one command |
| CI/CD | GitHub Actions | Most common in industry today |
| Orchestration | Kubernetes (K8s) | Industry standard for production |
| Cloud | AWS (EKS, RDS, ECR) | Most in-demand cloud platform |
| IaC | Terraform | Provision all infra as code |
| Monitoring | Prometheus + Grafana | Industry standard observability |

---

## Project Folder Structure

```
taskflow/
│
├── frontend/                    # Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Home page (task list)
│   │   │   └── layout.tsx
│   │   └── components/
│   │       └── TaskList.tsx
│   ├── Dockerfile               # Multi-stage Docker build
│   ├── .dockerignore
│   ├── next.config.js
│   └── package.json
│
├── backend/                     # Express.js REST API
│   ├── src/
│   │   ├── index.js             # Entry point
│   │   ├── routes/
│   │   │   └── tasks.js         # Task CRUD routes
│   │   └── db/
│   │       └── index.js         # PostgreSQL connection
│   ├── Dockerfile               # Multi-stage Docker build
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml           # Local development — all services
│
├── kubernetes/                  # All K8s manifests
│   ├── namespace.yaml
│   ├── frontend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml             # Auto-scaling
│   ├── backend/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── hpa.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   └── ingress.yaml
│
├── terraform/                   # AWS infrastructure as code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── vpc.tf
│   ├── eks.tf
│   └── rds.tf
│
├── monitoring/                  # Prometheus + Grafana
│   ├── prometheus-config.yaml
│   └── grafana-dashboard.json
│
└── .github/
    └── workflows/
        └── deploy.yml           # GitHub Actions CI/CD pipeline
```

---

## Phases

Follow these in order. 

| Phase | File | Topics Covered |
|---|---|---|
| 0 | `CODESPACES-SETUP.md` | **Start here** — open repo in Codespaces, install tools, zero Mac space |
| 1 | `PHASE-1-app-setup.md` | Build Next.js frontend + Express backend + PostgreSQL |
| 2 | `PHASE-2-docker.md` | Dockerfiles, multi-stage builds, docker-compose |
| 3 | `PHASE-3-cicd.md` | GitHub Actions — test, build, push, deploy |
| 4 | `PHASE-4-kubernetes.md` | K8s deployments, services, ingress, HPA, secrets |
| 5 | `PHASE-5-terraform-aws.md` | Terraform — provision EKS, RDS, VPC, ECR on AWS |
| 6 | `PHASE-6-monitoring.md` | Prometheus metrics, Grafana dashboards, alerting |

---


> **This project runs entirely in GitHub Codespaces.**


| Tool | Status in Codespaces |
|---|---|
| Node.js v18 | Pre-installed |
| Docker | Pre-installed (built-in) |
| Git | Pre-installed |
| kubectl | Auto-installed via devcontainer |
| Terraform | Auto-installed via devcontainer |
| AWS CLI | Auto-installed via devcontainer |
| minikube | Auto-installed via devcontainer |

Open this repo in Codespaces,
using the `.devcontainer/devcontainer.json` config file.

---

## Environment Setup (Codespaces)

| Phase | |
|---|---|---|
| Phase 1 — App | Codespaces terminal | 0 MB |
| Phase 2 — Docker | Codespaces (Docker built-in) | 0 MB |
| Phase 3 — CI/CD | GitHub Actions (GitHub's cloud) | 0 MB |
| Phase 4 — Kubernetes | Codespaces + minikube | 0 MB |
| Phase 5 — Terraform/AWS | Codespaces terminal + AWS | 0 MB |
| Phase 6 — Monitoring | Codespaces + port forwarding | 0 MB |

---

## Start Here

**Step 1 →** Read `CODESPACES-SETUP.md` — set up your environment (10 minutes, one time only)

**Step 2 →** Open `PHASE-1-app-setup.md` and follow it step by step
# taskflow

## Monitoring Dashboard

![Grafana Dashboard](https://github.com/user-attachments/assets/232cc893-9609-44e7-bd74-625a1ed84fc7)

![Application Metrics](https://github.com/user-attachments/assets/fd227514-9953-4b00-8360-bf42f2a1841f)

![Infrastructure Metrics](https://github.com/user-attachments/assets/5ea4b503-af1b-4c63-a76d-b5300f7ce9b2)
