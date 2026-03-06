/* projects-data.js - concept/project index (page-first) */
window.PDATA = [
  { id:'linux', label:'Linux', icon:'🐧', projects:[
    {
    id: 'basic-linux-commands',
    title: 'Basic Linux Commands',
    env: 'local',
    status: 'in_progress',
    summary: 'Core Linux command-line operations on an Ubuntu VM covering navigation, filesystem structure, essential commands, permissions, process monitoring, package management, networking basics, storage management, and service control.',
    purpose: 'Build a strong command-line foundation so learners can confidently operate Linux systems for daily administration, troubleshooting, and DevOps workflows.',
    overview: [
      'Set up Ubuntu 22.04 using VirtualBox, VMware, or WSL2 to create a safe local Linux practice environment.',
      'Understand the Linux filesystem hierarchy and the purpose of important directories such as /, /home, /etc, /var, /usr, /bin, /sbin, /tmp, and /opt.',
      'Learn basic terminal navigation commands like pwd, ls, cd, tree, and how to explore directories efficiently.',
      'Work with files and directories using commands such as touch, mkdir, rm, cp, mv, and understand file paths (absolute vs relative).',
      'Read and inspect file content using cat, less, more, head, tail, and follow logs with tail -f.',
      'Search for files and content using find, locate, grep, and understand pattern matching.',
      'Understand file permissions, ownership, and security using chmod, chown, chgrp, and symbolic vs numeric permissions.',
      'Learn how to monitor system processes using ps, top, htop, kill, killall, and understand process IDs.',
      'Understand disk usage and storage management using df, du, lsblk, mount, and basic disk inspection.',
      'Manage software packages using apt, apt update, apt install, apt remove, and apt upgrade.',
      'Understand system services and background processes using systemctl, service, and check logs using journalctl.',
      'Learn basic networking commands such as ip, ping, curl, wget, netstat, ss, and checking connectivity.',
      'Use text processing and filtering tools like grep, awk, cut, sort, uniq, and wc for analyzing command output.',
      'Understand command chaining and redirection using pipes (|), output redirection (> , >>), and input redirection (<).',
      'Learn environment variables, PATH, and how Linux executes commands.',
      'Understand basic user management with useradd, passwd, usermod, and groups.',
      'Practice using sudo for privilege escalation and understand root vs normal users.',
      'Learn how to view system logs and troubleshoot issues using journalctl, dmesg, and log files in /var/log.',
      'Develop command-line efficiency using command history, tab completion, aliases, and shortcuts.'
    ],
    page: '../../projects/linux/basic-commands/index.html'
    }

    // { id:'shell-scripting', title:'Shell Scripting', env:'local', status:'in_progress',
    //   summary:'Bash automation scripts for repeatable sysadmin tasks including backups, cleanup routines and scheduled jobs.',
    //   purpose:'Reduce manual effort and errors by converting routine Linux operations into reusable scripts.',
    //   overview:[
    //     'Create practical Bash scripts for backup and log handling workflows.',
    //     'Use permissions and execution flags correctly for script safety.',
    //     'Schedule jobs with cron for regular automation.',
    //     'Build habits for production-friendly script structure.'
    //   ],
    //   page:'../../projects/linux/shell-scripting/index.html' },

    // { id:'user-management', title:'User Management', env:'server', status:'not_completed',
    //   summary:'Linux user and group administration for secure multi-user server operations.',
    //   purpose:'Implement safe access control patterns using user accounts, sudo delegation and SSH key-based authentication.',
    //   overview:[
    //     'Create and manage service users and permission boundaries.',
    //     'Apply least-privilege access with groups and sudo roles.',
    //     'Configure SSH key auth and secure home-directory permissions.',
    //     'Audit account setup for production readiness.'
    //   ],
    //   page:'../../projects/linux/user-management/index.html' }
  ]}
];
//   { id:'jenkins', label:'Jenkins', icon:'ðŸ”§', projects:[
//     { id:'single-node-localhost', title:'Single Node Localhost', env:'local',
//       page:'../../projects/jenkins/single-node-localhost/index.html',
//       desc:'Jenkins installed via Docker Compose on localhost. Configured admin user, installed key plugins (Git, Docker Pipeline, Blue Ocean) and ran the first freestyle build job.',
//       steps:['Ensure Docker is installed and running','Create docker-compose.yml as shown below','Run <strong>docker compose up -d</strong>','Open <strong>http://localhost:8080</strong>','Get init password: <strong>docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword</strong>','Install suggested plugins and create admin user'],
//       code:{ fname:'docker-compose.yml', lang:'yaml', body:`<span class="kw">version</span>: <span class="str">'3.8'</span>
// <span class="kw">services</span>:
//   <span class="vr">jenkins</span>:
//     <span class="kw">image</span>: jenkins/jenkins:lts-jdk17
//     <span class="kw">container_name</span>: jenkins
//     <span class="kw">restart</span>: unless-stopped
//     <span class="kw">ports</span>:
//       - <span class="str">"8080:8080"</span>
//       - <span class="str">"50000:50000"</span>
//     <span class="kw">volumes</span>:
//       - jenkins_home:/var/jenkins_home
//       - /var/run/docker.sock:/var/run/docker.sock
// <span class="kw">volumes</span>:
//   jenkins_home:` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Port',v:':8080'},{k:'Image',v:'LTS JDK17'},{k:'Status',v:'âœ“ Done',g:true}] },

//     { id:'declarative-pipeline', title:'Declarative Pipeline', env:'local',
//       page:'../../projects/jenkins/declarative-pipeline/index.html',
//       desc:'Full declarative Jenkinsfile pipeline with stages: Checkout â†’ Build â†’ Test â†’ Docker Build â†’ Push â†’ Deploy with Blue Ocean dashboard.',
//       steps:['Create a <strong>Jenkinsfile</strong> in the root of your Git repo','Define stages as shown below','Jenkins: New Item â†’ Pipeline â†’ Pipeline from SCM','Point to your repo and Jenkinsfile path','Trigger a build and watch Blue Ocean'],
//       code:{ fname:'Jenkinsfile', lang:'groovy', body:`<span class="kw">pipeline</span> {
//   <span class="kw">agent</span> any
//   <span class="kw">environment</span> {
//     IMAGE = <span class="str">"myapp:\${BUILD_NUMBER}"</span>
//   }
//   <span class="kw">stages</span> {
//     <span class="kw">stage</span>(<span class="str">'Checkout'</span>) { <span class="kw">steps</span> { checkout scm } }
//     <span class="kw">stage</span>(<span class="str">'Build'</span>)    { <span class="kw">steps</span> { sh <span class="str">'npm ci'</span> } }
//     <span class="kw">stage</span>(<span class="str">'Test'</span>)     { <span class="kw">steps</span> { sh <span class="str">'npm test'</span> } }
//     <span class="kw">stage</span>(<span class="str">'Docker'</span>)   {
//       <span class="kw">steps</span> { sh <span class="str">"docker build -t \${IMAGE} ."</span> }
//     }
//     <span class="kw">stage</span>(<span class="str">'Deploy'</span>) {
//       <span class="kw">steps</span> {
//         sh <span class="str">"docker service update --image \${IMAGE} app_web"</span>
//       }
//     }
//   }
// }` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Trigger',v:'Git push'},{k:'Stages',v:'5'},{k:'Status',v:'âœ“ Done',g:true}] },

//     { id:'gitlab-webhook', title:'GitLab Webhook', env:'server',
//       page:'../../projects/jenkins/gitlab-webhook/index.html',
//       desc:'Jenkins triggered automatically via GitLab webhook on every push or MR. Configured Jenkins GitLab plugin, auth tokens and branch-specific pipeline rules.',
//       steps:['Install GitLab Plugin in Jenkins â†’ Manage Plugins','Create an API token in Jenkins for GitLab auth','GitLab: Settings â†’ Webhooks â†’ Add Jenkins URL','Set trigger events: Push + Merge Requests','Test the webhook and verify the build fires'],
//       code:{ fname:'webhook-test.sh', lang:'bash', body:`<span class="cm"># Jenkins URL to set in GitLab Webhook:</span>
// <span class="cm"># http://jenkins.domain.com/project/MY-JOB</span>

// <span class="cm"># Test webhook manually with curl:</span>
// JENKINS_URL=<span class="str">"http://jenkins:8080"</span>
// JENKINS_USER=<span class="str">"gitlab-trigger"</span>
// JENKINS_TOKEN=<span class="str">"your-api-token"</span>

// <span class="kw">curl</span> -X POST <span class="str">"\${JENKINS_URL}/job/my-pipeline/build"</span> \\
//   --user <span class="str">"\${JENKINS_USER}:\${JENKINS_TOKEN}"</span>` },
//       meta:[{k:'Where',v:'Server'},{k:'Trigger',v:'GitLab Push'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'docker', label:'Docker', icon:'ðŸ³', projects:[
//     { id:'sample-compose-app', title:'Sample Compose App', env:'local',
//       page:'../../projects/docker/sample-compose-app/index.html',
//       desc:'Full-stack multi-container app: React frontend + Node.js API + PostgreSQL + Nginx. Demonstrates healthchecks, depends_on ordering, named volumes and env injection.',
//       steps:['Clone repo and cd into project directory','Copy <strong>.env.example</strong> to <strong>.env</strong> and fill values','Run <strong>docker compose up --build -d</strong>','Frontend: http://localhost:3000  Â· API: http://localhost:4000/api','Logs: <strong>docker compose logs -f api</strong>'],
//       code:{ fname:'docker-compose.yml', lang:'yaml', body:`<span class="kw">version</span>: <span class="str">'3.8'</span>
// <span class="kw">services</span>:
//   <span class="vr">db</span>:
//     <span class="kw">image</span>: postgres:15-alpine
//     <span class="kw">environment</span>:
//       POSTGRES_DB: <span class="str">"\${DB_NAME}"</span>
//       POSTGRES_USER: <span class="str">"\${DB_USER}"</span>
//       POSTGRES_PASSWORD: <span class="str">"\${DB_PASS}"</span>
//     <span class="kw">volumes</span>: [pg_data:/var/lib/postgresql/data]
//     <span class="kw">healthcheck</span>:
//       test: [<span class="str">"CMD-SHELL"</span>, <span class="str">"pg_isready -U \${DB_USER}"</span>]
//   <span class="vr">api</span>:
//     <span class="kw">build</span>: ./api
//     <span class="kw">depends_on</span>: {db: {condition: service_healthy}}
//     <span class="kw">ports</span>: [<span class="str">"4000:4000"</span>]
//   <span class="vr">frontend</span>:
//     <span class="kw">build</span>: ./frontend
//     <span class="kw">ports</span>: [<span class="str">"3000:80"</span>]
// <span class="kw">volumes</span>: {pg_data:}` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Stack',v:'React+Node+PG'},{k:'Status',v:'âœ“ Done',g:true}] },

//     { id:'dockerfile-best-practices', title:'Dockerfile Best Practices', env:'local',
//       page:'../../projects/docker/dockerfile-best-practices/index.html',
//       desc:'Multi-stage Dockerfile for a Node.js app using builder pattern â€” build stage installs devDeps, production stage copies only dist. Final image under 120 MB.',
//       steps:['Write multi-stage Dockerfile as shown below','Build: <strong>docker build -t myapp:latest .</strong>','Inspect layers: <strong>docker history myapp:latest</strong>','Check final size: <strong>docker images myapp</strong>'],
//       code:{ fname:'Dockerfile', lang:'bash', body:`<span class="cm"># â”€â”€ Stage 1: Build â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€</span>
// <span class="kw">FROM</span> node:<span class="num">20</span>-alpine <span class="kw">AS</span> builder
// <span class="kw">WORKDIR</span> /app
// <span class="kw">COPY</span> package*.json ./
// <span class="kw">RUN</span> npm ci
// <span class="kw">COPY</span> . .
// <span class="kw">RUN</span> npm run build

// <span class="cm"># â”€â”€ Stage 2: Production â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€</span>
// <span class="kw">FROM</span> node:<span class="num">20</span>-alpine
// <span class="kw">WORKDIR</span> /app
// <span class="kw">COPY</span> --from=builder /app/dist ./dist
// <span class="kw">COPY</span> package*.json ./
// <span class="kw">RUN</span> npm ci --only=production
// <span class="kw">EXPOSE</span> <span class="num">3000</span>
// <span class="kw">CMD</span> [<span class="str">"node"</span>, <span class="str">"dist/server.js"</span>]` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Final Size',v:'~118 MB'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'aws', label:'AWS', icon:'â˜ï¸', projects:[
//     { id:'s3-static-website', title:'S3 Static Website', env:'free',
//       page:'../../projects/aws/s3-static-website/index.html',
//       desc:'Static portfolio hosted on S3 with public bucket policy, versioning, lifecycle rules, CloudFront CDN for global caching and HTTPS â€” entirely within AWS free tier.',
//       steps:['Create S3 bucket matching your domain name','Enable Static Website Hosting in bucket Properties','Add public GetObject bucket policy','Upload: <strong>aws s3 sync ./dist s3://my-bucket/ --delete</strong>','Create CloudFront distribution pointing to S3 endpoint','Set error page to index.html for SPA routing','Create Route 53 A-record alias â†’ CloudFront'],
//       code:{ fname:'deploy.sh', lang:'bash', body:`<span class="kw">aws</span> s3 mb s3://my-site --region ap-south-1

// <span class="kw">aws</span> s3 website s3://my-site/ \\
//   --index-document index.html \\
//   --error-document index.html

// <span class="kw">aws</span> s3 sync ./dist s3://my-site/ \\
//   --delete \\
//   --cache-control <span class="str">"max-age=31536000"</span>

// <span class="cm"># Invalidate CloudFront after each deploy</span>
// <span class="kw">aws</span> cloudfront create-invalidation \\
//   --distribution-id EXXXXXXXXXXXXX \\
//   --paths <span class="str">"/*"</span>` },
//       meta:[{k:'Services',v:'S3+CloudFront+R53'},{k:'Cost',v:'~$0 free tier'},{k:'Region',v:'ap-south-1'},{k:'Status',v:'âœ“ Done',g:true}] },

//     { id:'ec2-setup', title:'EC2 Setup', env:'free',
//       page:'../../projects/aws/ec2-setup/index.html',
//       desc:'Launched and configured a t2.micro EC2 instance â€” Security Groups, Elastic IP, SSH key pair, user-data bootstrap and IAM instance profile for S3 access.',
//       steps:['Launch EC2 t2.micro from AWS Console (Ubuntu 22.04 AMI)','Create Security Group: allow SSH (22), HTTP (80), HTTPS (443)','Allocate and attach an Elastic IP','SSH in: <strong>ssh -i key.pem ubuntu@&lt;elastic-ip&gt;</strong>','Run user-data bootstrap to install Docker and Nginx'],
//       code:{ fname:'user-data.sh', lang:'bash', body:`<span class="cm">#!/bin/bash</span>
// <span class="kw">apt</span> update -y &amp;&amp; apt upgrade -y
// <span class="kw">curl</span> -fsSL https://get.docker.com | sh
// <span class="kw">usermod</span> -aG docker ubuntu
// <span class="kw">systemctl</span> enable --now docker
// <span class="kw">apt</span> install -y nginx awscli
// <span class="kw">systemctl</span> enable --now nginx
// echo <span class="str">"Bootstrap complete"</span> &gt; /tmp/done` },
//       meta:[{k:'Instance',v:'t2.micro'},{k:'OS',v:'Ubuntu 22.04'},{k:'Region',v:'ap-south-1'},{k:'Status',v:'âœ“ Done',g:true}] },

//     { id:'vpc-architecture', title:'VPC Architecture', env:'server',
//       page:'../../projects/aws/vpc-architecture/index.html',
//       desc:'Custom multi-tier VPC: public subnets for ALB and NAT Gateway, private subnets for application servers and RDS. Bastion host for secure SSH access to private instances.',
//       steps:['Create VPC: CIDR 10.0.0.0/16','Create 2 public subnets (10.0.1.0/24, 10.0.2.0/24) across AZs','Create 2 private subnets (10.0.10.0/24, 10.0.11.0/24)','Create Internet Gateway and attach to VPC','Create NAT Gateway in public subnet with Elastic IP','Set route tables: publicâ†’IGW, privateâ†’NAT GW','Configure Security Groups for each tier (web/app/db)'],
//       code:{ fname:'vpc-plan.sh', lang:'bash', body:`<span class="cm"># VPC CIDR Layout</span>
// VPC:             <span class="num">10.0.0.0/16</span>

// <span class="cm"># Public subnets (ALB + NAT GW)</span>
// pub-south-1a:    <span class="num">10.0.1.0/24</span>
// pub-south-1b:    <span class="num">10.0.2.0/24</span>

// <span class="cm"># Private subnets (App + RDS)</span>
// prv-south-1a:    <span class="num">10.0.10.0/24</span>
// prv-south-1b:    <span class="num">10.0.11.0/24</span>

// <span class="cm"># Route tables</span>
// Public RT  â†’ igw-xxxxxxxx
// Private RT â†’ nat-xxxxxxxx` },
//       meta:[{k:'CIDR',v:'10.0.0.0/16'},{k:'AZs',v:'ap-south-1a/b'},{k:'Subnets',v:'4'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'swarm', label:'Docker Swarm', icon:'ðŸŒŠ', projects:[
//     { id:'single-node-swarm', title:'Single Node Swarm', env:'local',
//       page:'../../projects/swarm/single-node-swarm/index.html',
//       desc:'Initialised Docker Swarm on a single machine. Deployed the full monitoring stack (Grafana, Prometheus, Alertmanager) as Swarm services with placement constraints and rolling update policy.',
//       steps:['Initialise swarm: <strong>docker swarm init</strong>','Create overlay network: docker network create --driver overlay mon-net','Write docker-stack.yml for monitoring','Deploy: <strong>docker stack deploy -c docker-stack.yml monitoring</strong>','Verify: <strong>docker service ls</strong>'],
//       code:{ fname:'docker-stack.yml', lang:'yaml', body:`<span class="kw">version</span>: <span class="str">'3.8'</span>
// <span class="kw">services</span>:
//   <span class="vr">prometheus</span>:
//     <span class="kw">image</span>: prom/prometheus:latest
//     <span class="kw">ports</span>: [<span class="str">"9090:9090"</span>]
//     <span class="kw">deploy</span>:
//       <span class="kw">replicas</span>: <span class="num">1</span>
//       <span class="kw">update_config</span>: {parallelism: <span class="num">1</span>, delay: <span class="str">"10s"</span>}
//   <span class="vr">grafana</span>:
//     <span class="kw">image</span>: grafana/grafana:latest
//     <span class="kw">ports</span>: [<span class="str">"3000:3000"</span>]
//     <span class="kw">deploy</span>: {replicas: <span class="num">1</span>}
// <span class="kw">networks</span>:
//   <span class="vr">mon-net</span>: {driver: overlay}` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Mode',v:'Swarm Manager'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'kubernetes', label:'Kubernetes', icon:'âš™ï¸', projects:[
//     { id:'minikube-setup', title:'Minikube Setup', env:'local',
//       page:'../../projects/kubernetes/minikube-setup/index.html',
//       desc:'Local Kubernetes cluster with Minikube. Deployed a multi-container app using Deployments, Services, ConfigMaps and Secrets. Used Ingress controller for routing.',
//       steps:['Install Minikube: curl -LO minikube release URL then install','Start: <strong>minikube start --driver=docker --cpus=2 --memory=4096</strong>','Enable ingress: <strong>minikube addons enable ingress</strong>','Apply manifests: <strong>kubectl apply -f k8s/</strong>','Access: <strong>minikube service app-service</strong>'],
//       code:{ fname:'deployment.yaml', lang:'yaml', body:`<span class="kw">apiVersion</span>: apps/v1
// <span class="kw">kind</span>: Deployment
// <span class="kw">metadata</span>: {name: myapp}
// <span class="kw">spec</span>:
//   <span class="kw">replicas</span>: <span class="num">3</span>
//   <span class="kw">selector</span>: {matchLabels: {app: myapp}}
//   <span class="kw">template</span>:
//     <span class="kw">metadata</span>: {labels: {app: myapp}}
//     <span class="kw">spec</span>:
//       <span class="kw">containers</span>:
//       - <span class="kw">name</span>: myapp
//         <span class="kw">image</span>: myapp:latest
//         <span class="kw">ports</span>: [{containerPort: <span class="num">3000</span>}]
//         <span class="kw">resources</span>:
//           <span class="kw">limits</span>: {cpu: <span class="str">"500m"</span>, memory: <span class="str">"256Mi"</span>}` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Driver',v:'Docker'},{k:'K8s',v:'v1.28'},{k:'Status',v:'âœ“ Done',g:true}] },

//     { id:'pod-deployment', title:'Pod Deployments', env:'local',
//       page:'../../projects/kubernetes/pod-deployment/index.html',
//       desc:'Hands-on with Kubernetes primitives â€” rolling updates, rollbacks, HorizontalPodAutoscaler and liveness/readiness probes.',
//       steps:['Create Deployment with 3 replicas and probes','Configure HPA: <strong>kubectl autoscale deployment myapp --min=2 --max=10 --cpu-percent=50</strong>','Rolling update: <strong>kubectl set image deployment/myapp myapp=myapp:v2</strong>','Monitor: <strong>kubectl rollout status deployment/myapp</strong>','Rollback: <strong>kubectl rollout undo deployment/myapp</strong>'],
//       code:{ fname:'hpa.yaml', lang:'yaml', body:`<span class="kw">apiVersion</span>: autoscaling/v2
// <span class="kw">kind</span>: HorizontalPodAutoscaler
// <span class="kw">metadata</span>: {name: myapp-hpa}
// <span class="kw">spec</span>:
//   <span class="kw">scaleTargetRef</span>:
//     <span class="kw">apiVersion</span>: apps/v1
//     <span class="kw">kind</span>: Deployment
//     <span class="kw">name</span>: myapp
//   <span class="kw">minReplicas</span>: <span class="num">2</span>
//   <span class="kw">maxReplicas</span>: <span class="num">10</span>
//   <span class="kw">metrics</span>:
//   - <span class="kw">type</span>: Resource
//     <span class="kw">resource</span>:
//       <span class="kw">name</span>: cpu
//       <span class="kw">target</span>: {type: Utilization, averageUtilization: <span class="num">50</span>}` },
//       meta:[{k:'Where',v:'Minikube'},{k:'HPA',v:'v2'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'elk', label:'ELK Stack', icon:'ðŸ”', projects:[
//     { id:'elk-localhost', title:'ELK on Localhost', env:'local',
//       page:'../../projects/elk/elk-localhost/index.html',
//       desc:'Full ELK Stack via Docker Compose â€” Elasticsearch single-node, Logstash pipeline config, Kibana dashboard. Built from scratch and used in production.',
//       steps:['Set vm.max_map_count: <strong>sudo sysctl -w vm.max_map_count=262144</strong>','Write docker-compose.yml with ES, Logstash, Kibana','Create logstash pipeline for your log format','Start: <strong>docker compose up -d</strong>','Open Kibana at <strong>http://localhost:5601</strong>','Create Index Pattern â†’ Discover â†’ Dashboard'],
//       code:{ fname:'docker-compose.yml', lang:'yaml', body:`<span class="kw">services</span>:
//   <span class="vr">elasticsearch</span>:
//     <span class="kw">image</span>: elasticsearch:8.11.0
//     <span class="kw">environment</span>:
//       - discovery.type=single-node
//       - xpack.security.enabled=<span class="kw">false</span>
//       - ES_JAVA_OPTS=-Xms512m -Xmx512m
//     <span class="kw">ports</span>: [<span class="str">"9200:9200"</span>]
//   <span class="vr">logstash</span>:
//     <span class="kw">image</span>: logstash:8.11.0
//     <span class="kw">volumes</span>: [./pipeline:/usr/share/logstash/pipeline]
//     <span class="kw">ports</span>: [<span class="str">"5044:5044"</span>]
//   <span class="vr">kibana</span>:
//     <span class="kw">image</span>: kibana:8.11.0
//     <span class="kw">ports</span>: [<span class="str">"5601:5601"</span>]
//     <span class="kw">depends_on</span>: [elasticsearch]` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Stack',v:'8.11.0'},{k:'Kibana',v:':5601'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'grafana', label:'Grafana', icon:'ðŸ“Š', projects:[
//     { id:'prometheus-setup', title:'Prometheus + Grafana', env:'local',
//       page:'../../projects/grafana/prometheus-setup/index.html',
//       desc:'Full observability stack: Prometheus scrapes node-exporter metrics, Grafana shows custom dashboards for CPU, memory, disk, network I/O and HTTP request rates.',
//       steps:['Run node-exporter on each host to expose /metrics','Write prometheus.yml with scrape targets','Deploy stack with Docker Compose','Open Grafana at <strong>http://localhost:3000</strong> (admin/admin)','Add Prometheus data source â†’ Import dashboard ID <strong>1860</strong>','Create custom alert rules in Alertmanager'],
//       code:{ fname:'prometheus.yml', lang:'yaml', body:`<span class="kw">global</span>:
//   scrape_interval: <span class="num">15</span>s

// <span class="kw">scrape_configs</span>:
//   - <span class="kw">job_name</span>: <span class="str">'prometheus'</span>
//     <span class="kw">static_configs</span>:
//       - targets: [<span class="str">'localhost:9090'</span>]

//   - <span class="kw">job_name</span>: <span class="str">'node-exporter'</span>
//     <span class="kw">static_configs</span>:
//       - targets: [<span class="str">'node-exporter:9100'</span>]

//   - <span class="kw">job_name</span>: <span class="str">'app'</span>
//     <span class="kw">static_configs</span>:
//       - targets: [<span class="str">'app:3000'</span>]` },
//       meta:[{k:'Where',v:'Localhost'},{k:'Grafana',v:':3000'},{k:'Prom',v:':9090'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'traefik', label:'Traefik', icon:'ðŸ”€', projects:[
//     { id:'ssl-letsencrypt', title:'SSL + Let\'s Encrypt', env:'server',
//       page:'../../projects/traefik/ssl-letsencrypt/index.html',
//       desc:'Traefik as reverse proxy for all Docker services with automatic HTTPS via Let\'s Encrypt ACME. Docker label-based routing â€” no per-service manual config.',
//       steps:['Create acme.json: <strong>touch acme.json &amp;&amp; chmod 600 acme.json</strong>','Write traefik.yml with entrypoints and certificatesResolvers','Add Traefik labels to each service','Point your domain DNS A-record to server IP','Deploy: docker compose up -d â€” Traefik auto-requests SSL certs'],
//       code:{ fname:'docker-compose.yml', lang:'yaml', body:`<span class="kw">services</span>:
//   <span class="vr">traefik</span>:
//     <span class="kw">image</span>: traefik:v3.0
//     <span class="kw">ports</span>: [<span class="str">"80:80"</span>, <span class="str">"443:443"</span>]
//     <span class="kw">volumes</span>:
//       - /var/run/docker.sock:/var/run/docker.sock
//       - ./acme.json:/acme.json
//       - ./traefik.yml:/traefik.yml

//   <span class="vr">myapp</span>:
//     <span class="kw">image</span>: myapp:latest
//     <span class="kw">labels</span>:
//       - traefik.enable=<span class="kw">true</span>
//       - traefik.http.routers.app.rule=Host(<span class="str">\`app.domain.com\`</span>)
//       - traefik.http.routers.app.tls.certresolver=letsencrypt
//       - traefik.http.services.app.loadbalancer.server.port=<span class="num">3000</span>` },
//       meta:[{k:'Where',v:'Server'},{k:'SSL',v:'Let\'s Encrypt'},{k:'Version',v:'v3.0'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'cicd', label:'CI/CD', icon:'ðŸ”„', projects:[
//     { id:'gitlab-pipeline', title:'GitLab CI Pipeline', env:'server',
//       page:'../../projects/cicd/gitlab-pipeline/index.html',
//       desc:'End-to-end GitLab CI/CD pipeline: lint â†’ test â†’ docker build â†’ push to registry â†’ deploy to server via SSH. Manual gate for production with environment tracking.',
//       steps:['Create <strong>.gitlab-ci.yml</strong> in repo root','Set GitLab CI/CD variables: REGISTRY_USER, REGISTRY_PASS, DEPLOY_HOST, DEPLOY_KEY','Push to main branch to trigger pipeline','Review stages in GitLab â†’ CI/CD â†’ Pipelines','Approve manual production deploy gate'],
//       code:{ fname:'.gitlab-ci.yml', lang:'yaml', body:`<span class="kw">stages</span>: [lint, test, build, deploy]

// <span class="kw">variables</span>:
//   IMAGE: <span class="str">"\${CI_REGISTRY_IMAGE}:\${CI_COMMIT_SHORT_SHA}"</span>

// <span class="vr">test</span>:
//   <span class="kw">stage</span>: test
//   <span class="kw">script</span>: [npm ci, npm test]
//   <span class="kw">cache</span>: {paths: [node_modules/]}

// <span class="vr">build</span>:
//   <span class="kw">stage</span>: build
//   <span class="kw">script</span>:
//     - docker build -t $IMAGE .
//     - docker push $IMAGE

// <span class="vr">deploy-prod</span>:
//   <span class="kw">stage</span>: deploy
//   <span class="kw">environment</span>: {name: production}
//   <span class="kw">when</span>: manual
//   <span class="kw">script</span>:
//     - ssh deploy@$DEPLOY_HOST "docker service update --image $IMAGE app_web"` },
//       meta:[{k:'Where',v:'Server'},{k:'Trigger',v:'Git Push'},{k:'Gate',v:'Manual prod'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]},

//   { id:'vpc', label:'VPC & Networking', icon:'ðŸ›¡ï¸', projects:[
//     { id:'basic-vpc', title:'Basic VPC Setup', env:'server',
//       page:'../../projects/vpc/basic-vpc/index.html',
//       desc:'Custom multi-tier AWS VPC from scratch â€” Internet Gateway, route tables, NAT Gateway, Security Groups for web/app/db tiers and Network ACLs for subnet-level security.',
//       steps:['Create VPC with CIDR 10.0.0.0/16','Create public subnets in 2 AZs â€” enable auto-assign public IP','Create private subnets in same AZs','Create and attach Internet Gateway','Allocate Elastic IP â†’ Create NAT Gateway in public subnet','Create route tables: publicâ†’IGW, privateâ†’NAT','Create Security Groups per tier'],
//       code:{ fname:'sg-rules.sh', lang:'bash', body:`<span class="cm"># Web tier SG â€” public facing</span>
// <span class="kw">aws</span> ec2 authorize-security-group-ingress \\
//   --group-id sg-web --protocol tcp \\
//   --port 443 --cidr 0.0.0.0/0

// <span class="cm"># App tier SG â€” from web SG only</span>
// <span class="kw">aws</span> ec2 authorize-security-group-ingress \\
//   --group-id sg-app --protocol tcp \\
//   --port 3000 --source-group sg-web

// <span class="cm"># DB tier SG â€” from app SG only</span>
// <span class="kw">aws</span> ec2 authorize-security-group-ingress \\
//   --group-id sg-db --protocol tcp \\
//   --port 5432 --source-group sg-app` },
//       meta:[{k:'CIDR',v:'10.0.0.0/16'},{k:'Subnets',v:'4 / 2 AZs'},{k:'Status',v:'âœ“ Done',g:true}] }
//   ]}
// ];

