# Restaurant Web App --- DevOps CI/CD Project

A production-style DevOps project demonstrating how to build, test,
deploy, configure, monitor, and roll back a React/Vite application using
**Git, GitHub Actions, Ansible, Nginx, and AWS EC2**.

The project was built progressively to understand how a real development
workflow can move code from feature development through development,
staging, and production environments.

------------------------------------------------------------------------

## 1. Project Overview

The application is a React + Vite restaurant web application.

The main DevOps objective was to create an automated deployment system
with:

-   Git branching strategy
-   GitHub Pull Requests
-   Continuous Integration
-   Reusable GitHub Actions workflows
-   Development, staging, and production environments
-   Ansible automation
-   AWS EC2 servers
-   Nginx web server
-   Versioned releases
-   Atomic deployment using a `current` symlink
-   Health checks
-   Automatic rollback after a failed deployment
-   Old-release cleanup
-   Infrastructure configuration through GitHub Actions

------------------------------------------------------------------------

## 2. Technologies Used

### Application

-   React
-   Vite
-   JavaScript
-   npm

### DevOps

-   Git
-   GitHub
-   GitHub Actions
-   Ansible
-   Nginx
-   Linux
-   SSH

### Cloud

-   AWS EC2

### CI/CD

-   GitHub Actions reusable workflows
-   GitHub Environments
-   GitHub Secrets
-   Build artifacts

------------------------------------------------------------------------

## 3. Git Branching Strategy

The repository uses a Git Flow-style branching model.

``` text
main
│
├── release/*
│
├── develop
│   │
│   └── feature/*
│
└── hotfix/*
```

### `main`

Production branch.

Code merged into `main` is considered production-ready and triggers the
production pipeline.

### `develop`

Development/integration branch.

Features are merged into `develop` and automatically deployed to the
Development EC2 environment.

### `feature/*`

Used for individual development tasks.

Example:

``` text
feature/navbar
feature/contact-page
feature/footer
```

Feature branches run CI and are merged into `develop` through Pull
Requests.

### `release/*`

Used to prepare a production release.

Example:

``` text
release/v1.0.0
```

Release branches are deployed to the Staging EC2 environment for final
testing.

### `hotfix/*`

Used for urgent production fixes.

------------------------------------------------------------------------

## 4. CI/CD Flow

The overall workflow is:

``` text
Developer
    │
    ▼
feature/*
    │
    │ Pull Request
    ▼
develop
    │
    ├── Lint
    ├── Test
    ├── Build
    └── Deploy
          │
          ▼
    Development EC2
          │
          ▼
      release/*
          │
          ├── Lint
          ├── Test
          ├── Build
          └── Deploy
                │
                ▼
          Staging EC2
                │
                ▼
              main
                │
                ├── Lint
                ├── Test
                ├── Build
                ├── Security Scan
                └── Deploy
                      │
                      ▼
                Production EC2
```

------------------------------------------------------------------------

# 5. GitHub Actions Architecture

The project avoids duplicating the same build and deployment logic in
every workflow.

Reusable workflows are used instead.

``` text
.github/workflows/
│
├── feature.yml
├── develop.yml
├── release.yml
├── production.yml
├── infrastructure.yml
├── shared-build.yml
└── shared-deploy.yml
```

------------------------------------------------------------------------

## 6. Feature CI

`feature.yml` runs for feature branches:

``` text
feature/**
```

It performs the common build process.

The purpose is to catch problems before a feature is merged into
`develop`.

------------------------------------------------------------------------

## 7. Development Pipeline

`develop.yml` runs when code is pushed to:

``` text
develop
```

Flow:

``` text
develop
   │
   ▼
shared-build.yml
   │
   ├── npm ci
   ├── lint
   ├── test
   └── npm run build
   │
   ▼
Build Artifact
   │
   ▼
shared-deploy.yml
   │
   ▼
Ansible
   │
   ▼
Development EC2
```

------------------------------------------------------------------------

## 8. Staging Pipeline

`release.yml` runs for:

``` text
release/**
```

Example:

``` text
release/v1.0.0
```

The application is built and deployed to the Staging EC2 environment.

This environment is used to test the release before production.

------------------------------------------------------------------------

## 9. Production Pipeline

`production.yml` runs when code reaches:

``` text
main
```

The production pipeline performs:

-   Build
-   Lint
-   Tests
-   Security scan
-   Production deployment

Production deployment uses the production GitHub Environment and its
associated secrets.

------------------------------------------------------------------------

# 10. Reusable Build Workflow

`shared-build.yml` contains the common application build process.

It performs:

``` text
Checkout
   ↓
Setup Node.js
   ↓
npm ci
   ↓
Lint
   ↓
Test
   ↓
npm run build
   ↓
Upload dist/ artifact
```

The build artifact is later consumed by the deployment workflow.

This avoids repeating the same build steps in:

-   Development
-   Staging
-   Production

------------------------------------------------------------------------

# 11. Reusable Deploy Workflow

`shared-deploy.yml` contains the common deployment process.

It:

1.  Checks out the repository
2.  Downloads the build artifact
3.  Installs Ansible
4.  Configures the SSH private key
5.  Verifies SSH connectivity
6.  Runs the appropriate Ansible inventory
7.  Deploys the application to the selected environment

The environment and inventory are passed as inputs.

Example:

``` yaml
with:
  inventory: development.ini
  environment: development
```

The same reusable workflow can therefore deploy to Development, Staging,
or Production.

------------------------------------------------------------------------

# 12. Ansible Architecture

The Ansible project is organized using roles.

``` text
ansible/
│
├── ansible.cfg
│
├── inventory/
│   ├── development.ini
│   ├── staging.ini
│   └── production.ini
│
├── group_vars/
│   ├── development.yml
│   ├── staging.yml
│   └── production.yml
│
├── playbooks/
│   ├── common.yml
│   ├── nginx.yml
│   ├── deploy.yml
│   └── rollback.yml
│
└── roles/
    ├── common/
    ├── nginx/
    ├── deploy/
    └── cleanup/
```

------------------------------------------------------------------------

# 13. Environment-Specific Inventories

Each environment has its own inventory.

### Development

``` text
inventory/development.ini
```

Targets the Development AWS EC2 instance.

### Staging

``` text
inventory/staging.ini
```

Targets the Staging AWS EC2 instance.

### Production

``` text
inventory/production.ini
```

Targets the Production AWS EC2 instance.

The playbooks themselves use:

``` yaml
hosts: all
```

The inventory determines which EC2 server is targeted.

This makes the playbooks reusable.

------------------------------------------------------------------------

# 14. Group Variables

Environment-specific configuration is stored in `group_vars`.

### Development

``` yaml
server_name: dev.restaurant.local
app_name: restaurant-web-app
deploy_path: /var/www/restaurant-web-app
keep_releases: 5
```

### Staging

``` yaml
server_name: staging.restaurant.local
app_name: restaurant-web-app
deploy_path: /var/www/restaurant-web-app
keep_releases: 5
```

### Production

``` yaml
server_name: restaurant.local
app_name: restaurant-web-app
deploy_path: /var/www/restaurant-web-app
keep_releases: 10
```

This prevents environment-specific values from being hardcoded inside
the playbooks.

------------------------------------------------------------------------

# 15. Common Role

The `common` role prepares an EC2 server for the application.

It:

-   Updates the apt package cache
-   Installs required packages
-   Creates the application directory
-   Creates the releases directory
-   Creates the shared directory

Application structure:

``` text
/var/www/restaurant-web-app/
│
├── releases/
├── shared/
└── current -> releases/<release-id>
```

------------------------------------------------------------------------

# 16. Nginx Role

The `nginx` role installs and configures Nginx.

It:

-   Installs Nginx
-   Removes the default Nginx site
-   Creates the application Nginx configuration
-   Enables the site
-   Tests the Nginx configuration
-   Reloads Nginx when configuration changes

Nginx serves the application from:

``` text
/var/www/restaurant-web-app/current
```

For React Router, the configuration uses:

``` nginx
try_files $uri $uri/ /index.html;
```

This allows client-side routes to work correctly.

------------------------------------------------------------------------

# 17. Deployment Role

The `deploy` role performs versioned deployments.

A release receives a unique release ID.

Example:

``` text
20260903121030
```

The application is deployed into:

``` text
/var/www/restaurant-web-app/releases/20260903121030/
```

The structure becomes:

``` text
/var/www/restaurant-web-app/
│
├── releases/
│   ├── 20260903120000/
│   ├── 20260903120500/
│   └── 20260903121030/
│
├── shared/
│
└── current -> releases/20260903121030
```

------------------------------------------------------------------------

# 18. Atomic Deployment

The live application is accessed through:

``` text
current
```

The deployment does not overwrite the existing live release.

Instead:

``` text
New build
   ↓
Create new release directory
   ↓
Copy build files
   ↓
Change current symlink
   ↓
Reload Nginx
```

Example:

``` text
current
   │
   └──> releases/20260903121030
```

This makes switching between releases fast and reliable.

------------------------------------------------------------------------

# 19. Deployment Health Check

After deployment, Ansible checks the application.

The deployment process verifies:

``` text
http://127.0.0.1/
```

and expects:

``` text
HTTP 200
```

The check retries several times before considering the deployment
failed.

------------------------------------------------------------------------

# 20. Automatic Rollback

If the new release fails its health check, the deployment role
automatically switches the `current` symlink back to the previous
release.

Example:

``` text
Before:

current -> releases/100
```

New deployment:

``` text
current -> releases/101
```

If health check fails:

``` text
current -> releases/100
```

The deployment then fails intentionally so GitHub Actions reports the
deployment as unsuccessful.

This provides a basic automated rollback mechanism.

------------------------------------------------------------------------

# 21. Manual Rollback

A separate `rollback.yml` playbook allows a specific release to be
restored.

Example:

``` bash
ansible-playbook \
  -i inventory/production.ini \
  playbooks/rollback.yml \
  -e "release_id=20260903121030"
```

The playbook:

1.  Checks whether the release exists
2.  Changes the `current` symlink
3.  Reloads Nginx

------------------------------------------------------------------------

# 22. Release Cleanup

The `cleanup` role removes old releases.

Development and staging keep:

``` text
5 releases
```

Production keeps:

``` text
10 releases
```

Example:

``` text
releases/
├── latest
├── previous
├── older
├── older
└── older
```

Old releases are removed automatically after deployment.

This prevents the EC2 server's disk from filling up over time.

------------------------------------------------------------------------

# 23. Infrastructure Configuration

The project also includes:

``` text
.github/workflows/infrastructure.yml
```

This workflow is manually triggered using:

``` yaml
workflow_dispatch
```

The user selects:

``` text
development
staging
production
```

The workflow then runs:

``` text
common.yml
   ↓
nginx.yml
```

against the selected EC2 environment.

Example:

``` text
Run workflow
     │
     ▼
Select: development
     │
     ▼
development.ini
     │
     ▼
Development EC2
     │
     ├── common role
     └── nginx role
```

This separates **infrastructure configuration** from normal application
deployment.

------------------------------------------------------------------------

# 24. GitHub Environments and Secrets

The project uses GitHub Environments:

``` text
development
staging
production
```

Each environment contains its own SSH private key:

``` text
SSH_PRIVATE_KEY
```

The idea is:

``` text
development
└── SSH_PRIVATE_KEY → Development EC2

staging
└── SSH_PRIVATE_KEY → Staging EC2

production
└── SSH_PRIVATE_KEY → Production EC2
```

This prevents the same deployment credential from being unnecessarily
shared across all environments.

------------------------------------------------------------------------

# 25. AWS EC2 Architecture

The project uses separate AWS EC2 servers for the environments.

``` text
                    GitHub Actions
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
       Development    Staging    Production
          EC2            EC2          EC2
             │           │           │
             ▼           ▼           ▼
          Nginx        Nginx        Nginx
             │           │           │
             ▼           ▼           ▼
        React App    React App    React App
```

Ansible connects to the EC2 servers through SSH.

------------------------------------------------------------------------

# 26. Manual Ansible Deployment

Before integrating deployment with GitHub Actions, the deployment
process was tested manually.

Build the application:

``` bash
npm ci
npm run build
```

Create a release ID:

``` bash
export RELEASE_ID=$(date +%Y%m%d%H%M%S)
```

Run Ansible:

``` bash
cd ansible

ansible-playbook \
  -i inventory/development.ini \
  playbooks/deploy.yml \
  -e "artifact_path=../dist" \
  -e "release_id=$RELEASE_ID"
```

This confirmed that the Ansible deployment system worked before
connecting it to GitHub Actions.

------------------------------------------------------------------------

# 27. Important DevOps Concepts Learned

This project covered the following concepts:

### Git

-   Branches
-   Feature branches
-   Pull Requests
-   Release branches
-   Production branches
-   Merge workflow
-   Branch-based automation

### GitHub Actions

-   Workflow triggers
-   Jobs
-   Steps
-   `workflow_dispatch`
-   GitHub Environments
-   GitHub Secrets
-   Artifacts
-   Reusable workflows
-   Job dependencies with `needs`

### Ansible

-   Inventory
-   Group variables
-   Playbooks
-   Roles
-   Tasks
-   Handlers
-   Variables
-   Facts
-   Idempotency
-   SSH connection
-   `become`
-   Deployment automation

### Linux

-   SSH
-   File permissions
-   Symbolic links
-   Services
-   Nginx
-   Web server configuration
-   Application directories

### AWS

-   EC2
-   Security Groups
-   SSH access
-   Environment separation

### Deployment

-   Versioned releases
-   Atomic symlink deployment
-   Health checks
-   Automatic rollback
-   Manual rollback
-   Release cleanup

------------------------------------------------------------------------

# 28. Final Architecture

The final project architecture is:

``` text
                         Developer
                             │
                             ▼
                          GitHub
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
        feature/*         develop          release/*
             │               │                │
             ▼               ▼                ▼
          Feature CI     Development CI    Staging CI
                             │                │
                             ▼                ▼
                       Development EC2    Staging EC2
                             │                │
                             └───────┬────────┘
                                     │
                                     ▼
                                    main
                                     │
                                     ▼
                              Production CI
                                     │
                                     ▼
                              Production EC2
```

Deployment layer:

``` text
GitHub Actions
      │
      ▼
Reusable Build
      │
      ▼
Build Artifact
      │
      ▼
Reusable Deploy
      │
      ▼
     SSH
      │
      ▼
   Ansible
      │
      ├── Common
      ├── Nginx
      ├── Deploy
      └── Cleanup
      │
      ▼
   AWS EC2
      │
      ▼
    Nginx
      │
      ▼
 React Application
```

------------------------------------------------------------------------

# 29. What This Project Demonstrates

This project demonstrates a complete automated application delivery
process:

``` text
Code
 ↓
Git
 ↓
Pull Request
 ↓
CI
 ↓
Build
 ↓
Artifact
 ↓
Environment Deployment
 ↓
Ansible
 ↓
AWS EC2
 ↓
Nginx
 ↓
Health Check
 ↓
Success
```

If the deployment fails:

``` text
New Release
    ↓
Health Check
    ↓
FAIL
    ↓
Rollback
    ↓
Previous Release
```

------------------------------------------------------------------------

# 30. Future Improvements

The current project intentionally focuses on GitHub Actions + Ansible +
Nginx + AWS EC2.

Possible future improvements include:

-   Docker containerization
-   Docker Compose
-   Docker image versioning
-   Docker Hub or GitHub Container Registry
-   Container deployment to EC2
-   Ansible + Docker
-   Terraform for AWS infrastructure
-   AWS IAM improvements
-   HTTPS with TLS certificates
-   Proper SSH host-key verification
-   Monitoring and logging
-   Centralized log management
-   Prometheus/Grafana
-   Kubernetes
-   Kubernetes deployments and services
-   Ingress
-   Helm
-   Full Infrastructure as Code

------------------------------------------------------------------------

## 31. Project Status

**Completed successfully.**

The current repository represents the **Ansible-based CI/CD stage** of
the DevOps learning project.

The next stage can be developed in a separate repository focused
specifically on:

``` text
Docker
   ↓
Containerization
   ↓
Container Registry
   ↓
GitHub Actions
   ↓
AWS EC2
```

Keeping the Docker project separate allows each repository to
demonstrate a distinct DevOps skill set.
