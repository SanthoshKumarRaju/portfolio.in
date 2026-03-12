/* projects-data.js - concept/project index (page-first) */
window.PDATA = [
  { id:'linux', label:'Linux', icon:'🐧', projects:
    [
    {
    id: 'Linux-History',
    title: 'Linux Theory and Basics',
    conceptTag: 'theory.linux',
    env: 'local',
    status: 'completed',
    summary: 'This project covers the history of Linux, its foundations, the Linux kernel, distributions, and the fundamental architecture of a Linux operating system.',
    purpose: 'The goal is to understand how Linux started, why it became so widely used, and how its ecosystem works across servers, desktops, cloud, and embedded systems.',
    overview: [
      'The origin of Unix and how it influenced the development of Linux.',
      'The history of Linux and the role of Linus Torvalds in creating the Linux kernel.',
      'How the open-source movement contributed to the growth and success of Linux.',
      'Understanding what the Linux kernel is and its responsibilities in an operating system.',
      'How Linux interacts with hardware through drivers and system calls.',
      'The role of the GNU project and why Linux is often referred to as GNU/Linux.',
      'Major milestones in Linux development and how the community contributes to its evolution.',
      'What Linux distributions are and how they package the Linux kernel with software.',
      'Differences between major Linux distributions such as Ubuntu, Debian, Red Hat, Arch, and Fedora.',
      'The difference between community distributions and enterprise Linux distributions.',
      'Where Linux is used today: servers, cloud computing, containers, embedded systems, networking, and mobile devices.',
      'The basic architecture of a Linux system including kernel space and user space.',
      'Core components of a Linux system: kernel, shell, utilities, libraries, and system services.',
      'Understanding the Linux filesystem hierarchy and the purpose of major directories.',
      'How Linux manages processes, users, permissions, and system resources.'
    ],
    page: '../../projects/linux/linux-theory/index.html'
    },
    {
    id: 'basic-linux-commands',
    title: 'Basic Linux Commands',
    env: 'local',
    conceptTag: 'theory.linux',
    status: 'completed',
    summary: 'Core Linux command-line operations on an Ubuntu VM covering navigation, filesystem structure, essential commands, permissions, process monitoring, package management, networking basics, storage management, and service control.',
    purpose: 'Build a strong command-line foundation so learners can confidently operate Linux systems for daily administration, troubleshooting, and DevOps workflows.',
    overview: [
      'Set up Ubuntu 22.04 using VirtualBox, VMware, or WSL2 to create a safe local Linux practice environment.',
      'Learn basic terminal navigation commands like pwd, ls, cd, tree, and how to explore directories efficiently.',
      'Work with files and directories using commands such as touch, mkdir, rm, cp, mv, and understand file paths (absolute vs relative).',
      'Read and inspect file content using cat, less, more, head, tail, and follow logs with tail -f.',
      'Search for files and content using find, locate, grep, and understand pattern matching.',
      'Understand file permissions, ownership, and security using chmod, chown, chgrp, and symbolic vs numeric permissions.',
      'Learn how to monitor system processes using ps, top, htop, kill, killall, and understand process IDs.',
      'Understand disk usage and storage management using df, du, lsblk, mount, and basic disk inspection.',
      'Manage software packages using apt, apt update, apt install, apt remove, and apt upgrade.',
      'Learn basic networking commands such as ip, ping, curl, wget, netstat, ss, and checking connectivity.',
      'Use text processing and filtering tools like grep, awk, cut, sort, uniq, and wc for analyzing command output.',
      'Understand command chaining and redirection using pipes (|), output redirection (> , >>), and input redirection (<).',
      'Learn environment variables, PATH, and how Linux executes commands.',
      'Understand basic user management with useradd, passwd, usermod, and groups.',
      'Practice using sudo for privilege escalation and understand root vs normal users.',
      'Develop command-line efficiency using command history, tab completion, aliases, and shortcuts.'
    ],
    page: '../../projects/linux/basic-commands/index.html'
    },
    {
      id: 'linux-filesystem',
      title: 'Linux Filesystem and Directory Structure',
      env: 'local',
      conceptTag: 'theory.linux',
      status: 'not_completed',
      summary:
        'Deep dive into the Linux filesystem hierarchy including directory purposes, file types, links, mounting, and storage structure.',
      purpose:
        'Understand how Linux organizes files and directories and how system components rely on the filesystem layout.',
      overview: [
        'Linux filesystem hierarchy standard (FHS)',
        'Purpose of directories such as /etc, /var, /usr, /bin, /home',
        'Understanding file types in Linux',
        'Hard links vs symbolic links',
        'Mounting and unmounting filesystems',
        'Working with partitions and filesystems',
        'Understanding inode structure'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-permissions-security',
      title: 'Linux Permissions and Security',
      env: 'server',
      conceptTag: 'theory.linux',
      status: 'not_completed',
      summary:
        'Understanding Linux security fundamentals including permissions, access control, and secure system configuration.',
      purpose:
        'Learn how Linux protects files and resources using permission models and security practices.',
      overview: [
        'User, group, and others permission model',
        'Numeric and symbolic permissions',
        'Special permissions (SUID, SGID, Sticky bit)',
        'File ownership management',
        'Understanding ACLs',
        'Security best practices for Linux servers'
      ],
      page: '../../projects/maintenance-page.html'
    },
    { 
      id:'user-management', 
      title:'User Management', 
      env:'server', 
      conceptTag: 'theory.linux',
      status:'not_completed',
      summary:'Linux user and group administration for secure multi-user server operations.',
      purpose:'Implement safe access control patterns using user accounts, sudo delegation and SSH key-based authentication.',
      overview:[
        'Create and manage service users and permission boundaries.',
        'Apply least-privilege access with groups and sudo roles.',
        'Configure SSH key auth and secure home-directory permissions.',
        'Audit account setup for production readiness.'
      ],
      page: '../../projects/maintenance-page.html' 
    },
    {
      id: 'linux-process-management',
      title: 'Linux Process and Resource Management',
      env: 'server',
      conceptTag: 'theory.linux',
      status: 'not_completed',
      summary:
        'Learn how Linux manages processes and system resources.',
      purpose:
        'Understand how to monitor and control running applications and system services.',
      overview: [
        'Understanding processes and process IDs',
        'Foreground vs background processes',
        'Monitoring processes using ps, top, htop',
        'Killing and controlling processes',
        'Process priorities and nice values',
        'Resource monitoring tools'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-networking',
      title: 'Linux Networking Fundamentals',
      env: 'server',
      conceptTag: 'theory.linux',
      status: 'not_completed',
      summary:
        'Understanding networking configuration and troubleshooting in Linux systems.',
      purpose:
        'Learn how Linux systems communicate over networks and how to diagnose connectivity issues.',
      overview: [
        'Understanding network interfaces',
        'IP addressing and routing',
        'Using ip command for network configuration',
        'Network troubleshooting using ping, traceroute, curl',
        'Checking open ports using ss and netstat',
        'DNS resolution and troubleshooting'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-storage-management',
      title: 'Linux Storage and Disk Management',
      env: 'server',
      conceptTag: 'theory.linux',
      status: 'not_completed',
      summary:
        'Managing disks, partitions, and storage devices in Linux.',
      purpose:
        'Learn how Linux manages storage devices and filesystems.',
      overview: [
        'Understanding disk partitions',
        'Using fdisk and lsblk',
        'Creating filesystems',
        'Mounting and unmounting disks',
        'Disk usage monitoring',
        'Introduction to LVM'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-system-services',
      title: 'Linux Services and Systemd',
      env: 'server',
      conceptTag: 'theory.linux',
      status: 'not_completed',
      summary:
        'Managing Linux services and understanding how systemd controls system processes.',
      purpose:
        'Learn how services start, stop, and run automatically in Linux.',
      overview: [
        'Introduction to systemd',
        'Understanding service units',
        'Managing services using systemctl',
        'Enabling and disabling services',
        'Checking service logs',
        'Creating custom systemd services'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-logs-troubleshooting',
      title: 'Linux Logs and Troubleshooting',
      env: 'server',
      conceptTag: 'theory.linux',
      status: 'not_completed',
      summary:
        'Understanding system logs and troubleshooting techniques in Linux.',
      purpose:
        'Learn how to diagnose and resolve system issues using logs and monitoring tools.',
      overview: [
        'Understanding Linux log files',
        'System logs in /var/log',
        'Using journalctl for systemd logs',
        'Analyzing logs using grep',
        'Debugging service failures',
        'Troubleshooting system issues'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
    id: 'login-banner-design',
    title: 'SSH Login Banner Design',
    env: 'local',
    conceptTag: 'project.linux',
    status: 'completed',
    summary: 'Design and implementation of a customizable SSH login banner for Linux systems that displays structured system information, security notices, and environment details when users connect to a server.',
    purpose: 'The purpose of this project is to enhance security awareness, improve system visibility for administrators, and create a professional login experience for users accessing Linux servers via SSH.',
    overview: [
      'Project Overview – Introduction to SSH login banners and their role in improving system usability, visibility, and security awareness when users access a Linux system.',
      'Problem Statement – Default SSH login messages provide very limited information. Administrators often need quick system insights such as uptime, system load, or disk status immediately after login.',
      'Why SSH Login Banners Matter – SSH banners help communicate security policies, system ownership, and monitoring notices while also providing useful operational information to administrators.',
      'Security and Compliance Considerations – Many organizations require login banners to display legal warnings that inform users that the system is monitored and restricted to authorized access only.',
      'Types of SSH Login Banners – Explanation of pre-login banners and post-login banners, including when each should be used and how they serve different purposes in system administration.',
      'Pre-Login Banner Implementation – Using SSH configuration with files such as /etc/issue.net to display warnings before authentication.',
      'Post-Login Banner (MOTD) Implementation – Using /etc/motd and /etc/update-motd.d scripts to display dynamic information after successful authentication.',
      'Dynamic Banner Generation – Creating scripts that dynamically collect and display system information such as CPU usage, memory usage, disk space, system uptime, and logged-in users.',
      'Banner Design Principles – Best practices for creating effective login banners including clarity, minimalism, structured formatting, and avoiding exposure of sensitive system information.',
      'ASCII Banner Design – Using ASCII art and formatting techniques to create visually structured headers and branded login banners.',
      'System Information Integration – Using Linux commands such as uptime, free, df, hostname, and who to dynamically generate real-time system insights.',
      'Cross-Distribution Compatibility – Designing scripts that work across multiple Linux distributions such as Ubuntu, Debian, CentOS, and RHEL.',
      'Automation and Maintainability – Organizing banner scripts in a modular way so that administrators can easily maintain and extend the banner functionality.',
      'User Experience Considerations – Designing login banners that provide useful information quickly without overwhelming users with excessive output.',
      'Future Enhancements – Possibility to integrate container information, Kubernetes node status, service health indicators, and automation deployment tools.',
      'Learning Outcomes – Demonstrates practical skills in Linux system administration, SSH configuration, shell scripting, and system monitoring integration.'
    ],
    page: '../../projects/linux/SSH-login-banner-design/index.html'
    }
    ]
  },

  { id: 'Shell', label: 'Shell', icon: '💻', projects:
  [
    {
      id: 'shell-scripting',
      title: 'Shell Scripting Fundamentals',
      env: 'local',
      conceptTag: 'theory.shell',
      status: 'not_completed',
      summary:
        'Introduction to Shell Scripting and its importance in Linux system administration and DevOps automation. This project explains how shell scripts work and how they are used to automate repetitive tasks in servers and development environments.',
      purpose:
        'The goal of this project is to understand the basics of shell scripting, how scripts interact with the operating system, and how they can be used to automate system administration, deployment tasks, and server monitoring.',
      overview: [
        'What is a shell and what is shell scripting',
        'Why shell scripting is important in Linux environments',
        'Different types of shells (Bash, Sh, Zsh, Ksh)',
        'Basic shell script structure and execution',
        'Variables and environment variables in shell scripts',
        'User input handling in shell scripts',
        'Conditional statements (if, else, case)',
        'Loops in shell scripting (for, while, until)',
        'Functions in shell scripts',
        'Working with files and directories using shell scripts',
        'Process management using shell scripts',
        'Automation of system administration tasks',
        'Writing scripts to fetch VM or server details',
        'Using shell scripts for DevOps automation',
        'Best practices for writing production-ready shell scripts'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'aws-ec2-instance-details-script',
      title: 'AWS EC2 Instance Details using Shell Script',
      env: 'aws',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project demonstrates how to use shell scripting with the AWS CLI to retrieve information about EC2 instances in an AWS account. The script fetches instance details such as instance ID, instance name, instance type, public IP address, private IP address, availability zone, and current running status.',
      purpose:
        'The goal of this project is to learn how shell scripts can interact with AWS services using the AWS CLI. By the end of this project, you will be able to automate cloud infrastructure inspection and generate reports about EC2 instances in your AWS account.',
      overview: [
        'Introduction to AWS CLI and its role in automation',
        'Setting up AWS CLI credentials and configuration',
        'Understanding EC2 instance metadata and attributes',
        'Using AWS CLI to describe EC2 instances',
        'Writing shell scripts to execute AWS CLI commands',
        'Parsing AWS CLI output using query and filters',
        'Retrieving instance ID, instance name, and instance type',
        'Fetching public IP and private IP addresses',
        'Checking EC2 instance state (running, stopped, terminated)',
        'Formatting output for better readability',
        'Handling multiple instances in a script',
        'Using loops in shell scripts to process instance data',
        'Exporting EC2 details to files or logs',
        'Using shell scripts for cloud infrastructure monitoring',
        'Best practices for automation scripts interacting with AWS'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'aws-ec2-start-stop-script',
      title: 'AWS EC2 Start and Stop Automation Script',
      env: 'aws',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project focuses on creating a shell script that can automatically start or stop EC2 instances in an AWS account using AWS CLI. It helps reduce infrastructure costs by stopping unused instances during non-working hours.',
      purpose:
        'The goal of this project is to automate EC2 instance management using shell scripting and AWS CLI. This script can be integrated with cron jobs to automatically control infrastructure usage.',
      overview: [
        'Understanding AWS EC2 lifecycle states',
        'Using AWS CLI to start EC2 instances',
        'Using AWS CLI to stop EC2 instances',
        'Filtering instances using tags',
        'Writing reusable shell functions',
        'Using cron jobs for scheduling automation',
        'Logging script execution results',
        'Handling errors in shell scripts'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'aws-ec2-inventory-report',
      title: 'AWS EC2 Inventory Report Generator',
      env: 'aws',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project creates a shell script that collects all EC2 instance details from an AWS account and generates a structured inventory report for auditing and infrastructure management.',
      purpose:
        'The goal of this project is to automate cloud inventory tracking and generate reports that show instance configurations and current status.',
      overview: [
        'Fetching EC2 instance metadata',
        'Extracting instance tags',
        'Generating structured output',
        'Saving EC2 details to CSV files',
        'Generating infrastructure inventory reports',
        'Using loops to process multiple instances',
        'Formatting script output'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'server-disk-monitoring',
      title: 'Server Disk Usage Monitoring Script',
      env: 'local',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project involves writing a shell script that monitors disk usage on Linux servers and sends alerts when disk usage exceeds a defined threshold.',
      purpose:
        'The goal is to automate system monitoring and prevent server outages caused by disk space exhaustion.',
      overview: [
        'Understanding disk usage in Linux',
        'Using df command for disk monitoring',
        'Parsing command output',
        'Setting disk usage thresholds',
        'Generating alerts when thresholds are exceeded',
        'Automating monitoring using cron jobs'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-log-analyzer',
      title: 'Linux Log File Analyzer',
      env: 'local',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project creates a shell script that analyzes server log files and extracts important information such as errors, warnings, and unusual activity.',
      purpose:
        'The goal is to automate log analysis to quickly detect system issues and troubleshoot server problems.',
      overview: [
        'Understanding Linux log files',
        'Using grep to search logs',
        'Filtering error messages',
        'Counting log occurrences',
        'Generating log reports',
        'Automating log monitoring'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'docker-container-status-script',
      title: 'Docker Container Status Monitoring Script',
      env: 'docker',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project involves writing a shell script that checks the status of Docker containers running on a server and reports their health and running status.',
      purpose:
        'The goal is to automate container monitoring and ensure services running inside containers are operational.',
      overview: [
        'Understanding Docker containers',
        'Using docker ps command',
        'Extracting container status information',
        'Checking stopped containers',
        'Generating container health reports',
        'Automating container monitoring'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-system-health-check',
      title: 'Linux System Health Check Automation',
      env: 'local',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project creates a shell script that performs a full system health check including CPU usage, memory usage, disk usage, and running processes.',
      purpose:
        'The goal is to build a reusable automation script that can quickly diagnose server health issues.',
      overview: [
        'Checking CPU usage',
        'Monitoring memory usage',
        'Checking disk usage',
        'Listing top processes',
        'Checking running services',
        'Generating system health reports'
      ],
      page: '../../projects/maintenance-page.html'
    },
    {
      id: 'linux-backup-automation',
      title: 'Linux Backup Automation Script',
      env: 'local',
      conceptTag: 'project.shell',
      status: 'not_completed',
      summary:
        'This project focuses on creating a shell script that automatically backs up important directories and files to a backup location.',
      purpose:
        'The goal is to automate data backup processes to prevent data loss.',
      overview: [
        'Understanding file backup strategies',
        'Using tar command for archiving',
        'Compressing backup files',
        'Creating timestamped backups',
        'Automating backups with cron jobs',
        'Maintaining backup rotation'
      ],
      page: '../../projects/maintenance-page.html'
    },
  ]
  },

  { id:'networking', label:'Networking', icon:'🌐', projects:
    [
    {
      id:'networking-fundamentals',
      title:'Networking Fundamentals',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Introduction to computer networking, its purpose, and how devices communicate across networks.',
      purpose:'Understand the basic principles of networking including devices, communication methods, and network types used in modern systems.',
      overview:[
        'What is a computer network',
        'Types of networks (LAN, WAN, MAN, PAN)',
        'Network devices such as routers, switches, and firewalls',
        'Network interface cards (NIC)',
        'Basic data transmission concepts',
        'Packets, frames, and segments',
        'How computers communicate in networks'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'osi-model',
      title:'OSI Model',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding the OSI model which explains how data moves across networks through layered communication.',
      purpose:'Learn how networking is structured into layers and how each layer performs a specific role in communication.',
      overview:[
        'Introduction to the OSI model',
        'Seven layers of the OSI model',
        'Application layer responsibilities',
        'Presentation layer and data formatting',
        'Session layer connection management',
        'Transport layer communication (TCP/UDP)',
        'Network layer routing and IP addressing',
        'Data link layer MAC communication',
        'Physical layer and hardware transmission'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'tcp-ip-model',
      title:'TCP/IP Model',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding the TCP/IP networking model used by the internet.',
      purpose:'Learn how the TCP/IP model enables communication between devices across the internet.',
      overview:[
        'Introduction to TCP/IP architecture',
        'Application layer protocols',
        'Transport layer communication',
        'Internet layer routing',
        'Network interface layer',
        'TCP vs UDP communication',
        'How TCP ensures reliable delivery',
        'Use cases of UDP'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ip-addressing',
      title:'IP Addressing',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding how devices are uniquely identified on a network using IP addresses.',
      purpose:'Learn how IPv4 and IPv6 addresses work and how they are assigned in networks.',
      overview:[
        'What is an IP address',
        'IPv4 addressing format',
        'IPv6 addressing format',
        'Public vs private IP addresses',
        'Static vs dynamic IP assignment',
        'Loopback addresses',
        'Understanding IP classes'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'subnetting-cidr',
      title:'Subnetting and CIDR',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding how networks are divided into smaller segments using subnetting.',
      purpose:'Learn how subnetting improves network organization, scalability, and security.',
      overview:[
        'What is subnetting',
        'Subnet masks explained',
        'CIDR notation',
        'Network and host portions',
        'Calculating subnet ranges',
        'Benefits of subnetting',
        'Subnetting in cloud networks'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'dns-system',
      title:'Domain Name System (DNS)',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding how DNS converts domain names into IP addresses.',
      purpose:'Learn how DNS works and why it is essential for internet communication.',
      overview:[
        'What is DNS',
        'DNS resolution process',
        'DNS servers and hierarchy',
        'Common DNS record types',
        'DNS caching',
        'DNS troubleshooting',
        'Using dig and nslookup commands'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'network-ports-protocols',
      title:'Network Ports and Protocols',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding network ports and protocols used by applications.',
      purpose:'Learn how services communicate over specific ports and protocols.',
      overview:[
        'What are network ports',
        'Well known ports',
        'Transport protocols',
        'HTTP and HTTPS protocols',
        'SSH protocol',
        'FTP protocol',
        'SMTP email protocol'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'network-nat',
      title:'Network Address Translation (NAT)',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding NAT and how private networks access the internet.',
      purpose:'Learn how routers translate private IP addresses into public IP addresses.',
      overview:[
        'What is NAT',
        'Private IP addressing',
        'Public IP addressing',
        'Source NAT',
        'Destination NAT',
        'Port address translation',
        'NAT usage in cloud environments'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'network-routing',
      title:'Network Routing',
      env:'local',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding how routers determine the best path for network traffic.',
      purpose:'Learn how routing directs packets between networks.',
      overview:[
        'What is routing',
        'Routing tables',
        'Static routing',
        'Dynamic routing',
        'Routing protocols',
        'OSPF and BGP basics',
        'Internet routing'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'network-firewalls',
      title:'Network Firewalls',
      env:'server',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding how firewalls control and filter network traffic.',
      purpose:'Learn how firewalls protect systems from unauthorized access.',
      overview:[
        'What is a firewall',
        'Network firewall vs host firewall',
        'Firewall rules',
        'Packet filtering',
        'Stateful inspection',
        'Linux firewall tools',
        'Cloud firewall concepts'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'network-load-balancing',
      title:'Load Balancing',
      env:'cloud',
      conceptTag: 'theory.network',
      status:'not_completed',
      summary:'Understanding how load balancers distribute traffic across servers.',
      purpose:'Learn how load balancing improves application availability and scalability.',
      overview:[
        'What is load balancing',
        'Layer 4 vs layer 7 load balancing',
        'Round robin load balancing',
        'Least connection algorithm',
        'Health checks',
        'Reverse proxy',
        'Cloud load balancers'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'linux-networking-tools',
      title:'Linux Networking Tools',
      env:'local',
      conceptTag: 'project.network',
      status:'not_completed',
      summary:'Hands-on networking commands used by Linux administrators.',
      purpose:'Learn how to diagnose and inspect network behavior on Linux systems.',
      overview:[
        'Using ip command',
        'Using ping command',
        'Using traceroute command',
        'Using netstat and ss',
        'Using curl and wget',
        'DNS lookup using dig',
        'Capturing packets using tcpdump'
      ],
      page:'../../projects/maintenance-page.html'
    }
    ]
  },


  { id:'jenkins', label:'CI/CD', icon:'⚙️', projects:
  [

    {
      id:'cicd-fundamentals',
      title:'CI/CD Fundamentals',
      env:'local',
      conceptTag: 'theory.cicd',
      status:'not_completed',
      summary:'Introduction to Continuous Integration and Continuous Deployment and how automation pipelines improve modern software delivery.',
      purpose:'Understand the core principles of DevOps automation pipelines and why CI/CD is essential for modern software development.',
      overview:[
        'Introduction to DevOps and automation pipelines',
        'Traditional software delivery vs CI/CD workflow',
        'What is Continuous Integration (CI)',
        'What is Continuous Delivery (CD)',
        'What is Continuous Deployment',
        'Benefits of CI/CD pipelines',
        'Overview of CI/CD pipeline stages',
        'Version control integration in CI/CD',
        'Build automation concepts',
        'Deployment automation fundamentals'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'jenkins-architecture',
      title:'Jenkins Architecture and Components',
      env:'server',
      conceptTag: 'theory.jenkins',
      status:'not_completed',
      summary:'Understanding the architecture and core components of Jenkins automation server.',
      purpose:'Learn how Jenkins orchestrates CI/CD workflows and manages build agents.',
      overview:[
        'What is Jenkins',
        'Jenkins master and agent architecture',
        'Jenkins controller responsibilities',
        'Jenkins worker nodes',
        'Distributed builds in Jenkins',
        'Jenkins plugin ecosystem',
        'Jenkins job types',
        'Jenkins web interface',
        'Jenkins security model'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'jenkins-installation',
      title:'Jenkins Installation and Initial Setup',
      env:'local',
      conceptTag: 'project.jenkins',
      status:'not_completed',
      summary:'Setting up Jenkins server and configuring initial plugins and users.',
      purpose:'Learn how to deploy Jenkins locally or on a server environment.',
      overview:[
        'Installing Jenkins using Docker',
        'Installing Jenkins on Linux server',
        'Initial Jenkins configuration',
        'Installing Jenkins plugins',
        'Creating admin users',
        'Configuring Jenkins security',
        'Managing Jenkins credentials'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'jenkins-jobs',
      title:'Jenkins Jobs and Build Automation',
      env:'local',
      conceptTag: 'theory.jenkins',
      status:'not_completed',
      summary:'Understanding how Jenkins jobs automate application builds.',
      purpose:'Learn how Jenkins executes automated tasks through jobs.',
      overview:[
        'Types of Jenkins jobs',
        'Freestyle projects',
        'Parameterized builds',
        'Build triggers',
        'Build logs and results',
        'Managing build artifacts',
        'Job scheduling using cron'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'pipeline-as-code',
      title:'Pipeline as Code (Jenkinsfile)',
      env:'local',
      conceptTag: 'theory.jenkins',
      status:'not_completed',
      summary:'Using Jenkinsfile to define CI/CD pipelines as code.',
      purpose:'Learn how to manage CI/CD pipelines using version-controlled pipeline scripts.',
      overview:[
        'Introduction to Pipeline as Code',
        'Jenkinsfile structure',
        'Declarative pipelines',
        'Scripted pipelines',
        'Pipeline stages',
        'Pipeline steps',
        'Environment variables in pipelines',
        'Pipeline error handling'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'deployment-automation',
      title:'Automated Deployment Pipelines',
      env:'server',
      conceptTag: 'project.jenkins',
      status:'not_completed',
      summary:'Automating application deployment using CI/CD pipelines.',
      purpose:'Learn how pipelines deliver applications to servers or clusters.',
      overview:[
        'Deployment strategies',
        'Rolling deployments',
        'Blue-green deployments',
        'Canary deployments',
        'Automated server deployments',
        'Infrastructure deployment automation'
      ],
      page:'../../projects/maintenance-page.html'
    }

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
//       meta:[{k:'Where',v:'Server'},{k:'Trigger',v:'GitLab Push'},{k:'Status',v:'âœ“ Done',g:true}] },

    ]
  },

  { id:'aws', label:'Cloud', icon:'☁️', projects:
  [

    {
      id:'cloud-computing-fundamentals',
      title:'Cloud Computing Fundamentals',
      env:'cloud',
      conceptTag : 'cloud.fundamentals',
      status:'not_completed',
      summary:'Introduction to cloud computing concepts including infrastructure models, deployment models, scalability, and modern cloud architecture.',
      purpose:'Understand how cloud platforms provide scalable infrastructure and how businesses replace traditional data centers with cloud services.',
      overview:[
        'What is cloud computing and why organizations use cloud platforms',
        'Traditional on-premise infrastructure vs cloud infrastructure',
        'Cloud service models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS)',
        'Cloud deployment models: Public cloud, Private cloud, Hybrid cloud, Multi-cloud',
        'Advantages of cloud computing such as scalability, elasticity, high availability, and cost optimization',
        'Cloud pricing models including pay-as-you-go and reserved capacity',
        'Overview of major cloud providers: AWS, Microsoft Azure, Google Cloud',
        'Cloud-native application architectures'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-global-infrastructure',
      title:'AWS Global Infrastructure',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Understanding AWS global infrastructure including regions, availability zones, and edge locations.',
      purpose:'Learn how AWS builds highly available cloud infrastructure across the world.',
      overview:[
        'What is AWS global infrastructure',
        'AWS regions and geographical distribution',
        'Availability Zones and fault isolation',
        'Edge locations and CDN infrastructure',
        'AWS data center design principles',
        'Choosing the right AWS region',
        'High availability architecture design using multiple availability zones'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-iam',
      title:'AWS Identity and Access Management',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Managing user access and security permissions using AWS IAM.',
      purpose:'Learn how AWS controls access to resources securely using users, roles, and policies.',
      overview:[
        'Introduction to AWS IAM',
        'IAM users and groups',
        'IAM roles and role assumption',
        'IAM policies and permission models',
        'Principle of least privilege',
        'Multi-factor authentication',
        'Access keys and programmatic access',
        'IAM best practices for security'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-ec2',
      title:'AWS EC2 Compute Services',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Deploy and manage virtual machines using Amazon EC2.',
      purpose:'Understand how cloud servers are created, configured, and scaled in AWS.',
      overview:[
        'Introduction to EC2 virtual servers',
        'Choosing EC2 instance types',
        'Amazon Machine Images (AMI)',
        'Launching EC2 instances',
        'Connecting to EC2 using SSH',
        'Security groups and firewall rules',
        'Elastic IP addresses',
        'User data scripts for automated setup'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-ec2',
      title:'AWS EC2 Compute Services',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Deploy and manage virtual machines using Amazon EC2.',
      purpose:'Understand how cloud servers are created, configured, and scaled in AWS.',
      overview:[
        'Introduction to EC2 virtual servers',
        'Choosing EC2 instance types',
        'Amazon Machine Images (AMI)',
        'Launching EC2 instances',
        'Connecting to EC2 using SSH',
        'Security groups and firewall rules',
        'Elastic IP addresses',
        'User data scripts for automated setup'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-storage',
      title:'AWS Storage Services',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Understanding AWS storage services used for object, block, and file storage.',
      purpose:'Learn how AWS manages persistent data storage in cloud environments.',
      overview:[
        'Amazon S3 object storage',
        'S3 buckets and object management',
        'S3 versioning and lifecycle rules',
        'Amazon EBS block storage for EC2',
        'Amazon EFS file storage for shared file systems',
        'Storage classes and cost optimization',
        'Data durability and availability in AWS storage'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-load-balancing',
      title:'AWS Load Balancing and Auto Scaling',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Automatically distribute traffic and scale infrastructure based on demand.',
      purpose:'Understand how AWS ensures application availability and scalability.',
      overview:[
        'Elastic Load Balancer overview',
        'Application Load Balancer vs Network Load Balancer',
        'Target groups and health checks',
        'Auto scaling groups',
        'Scaling policies and triggers',
        'High availability architecture patterns'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-load-balancing',
      title:'AWS Load Balancing and Auto Scaling',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Automatically distribute traffic and scale infrastructure based on demand.',
      purpose:'Understand how AWS ensures application availability and scalability.',
      overview:[
        'Elastic Load Balancer overview',
        'Application Load Balancer vs Network Load Balancer',
        'Target groups and health checks',
        'Auto scaling groups',
        'Scaling policies and triggers',
        'High availability architecture patterns'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-monitoring',
      title:'AWS Monitoring and Logging',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Monitor infrastructure and applications using AWS observability tools.',
      purpose:'Understand how AWS provides visibility into system performance and logs.',
      overview:[
        'Amazon CloudWatch metrics',
        'CloudWatch logs',
        'CloudWatch alarms',
        'AWS CloudTrail auditing',
        'Monitoring infrastructure performance',
        'Alerting and incident management'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-monitoring',
      title:'AWS Monitoring and Logging',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Monitor infrastructure and applications using AWS observability tools.',
      purpose:'Understand how AWS provides visibility into system performance and logs.',
      overview:[
        'Amazon CloudWatch metrics',
        'CloudWatch logs',
        'CloudWatch alarms',
        'AWS CloudTrail auditing',
        'Monitoring infrastructure performance',
        'Alerting and incident management'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-containers',
      title:'Container Services in AWS',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      status:'not_completed',
      summary:'Run containerized applications using AWS container services.',
      purpose:'Learn how AWS supports containerized workloads and orchestration.',
      overview:[
        'Amazon Elastic Container Registry (ECR)',
        'Amazon Elastic Container Service (ECS)',
        'AWS Fargate serverless containers',
        'Container orchestration concepts',
        'Managing container deployments'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'aws-eks',
      title:'Kubernetes on AWS (EKS)',
      env:'aws',
      conceptTag: 'cloud.aws.core',
      Provider: 'aws',
      status:'not_completed',
      summary:'Deploy Kubernetes clusters using AWS Elastic Kubernetes Service.',
      purpose:'Understand how AWS provides managed Kubernetes clusters for container orchestration.',
      overview:[
        'Introduction to Kubernetes',
        'Amazon EKS architecture',
        'Cluster creation and node groups',
        'Deploying container workloads',
        'Service exposure using load balancers',
        'Kubernetes scaling and monitoring'
      ],
      page:'../../projects/maintenance-page.html'
    }
  ]
  },

  { id:'docker', label:'Containerization ', icon:'🐳', projects:
  [

    {
      id:'containerization-fundamentals',
      title:'Containerization Fundamentals',
      env:'local',
      conceptTag: 'container.theory',
      status:'not_completed',
      summary:'Introduction to containerization and how it differs from traditional virtualization.',
      purpose:'Understand the motivation behind containers and why they are widely used in DevOps and cloud environments.',
      overview:[
        'What is containerization',
        'History of container technologies',
        'Virtual machines vs containers',
        'Benefits of containers',
        'Isolation and portability',
        'Use cases in microservices and DevOps'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'docker-containers',
      title:'Docker Containers',
      env:'local',
      conceptTag: 'container.theory',
      status:'not_completed',
      summary:'Understanding how Docker containers run applications.',
      purpose:'Learn how containers are created, managed, and monitored.',
      overview:[
        'What is a container',
        'Running containers',
        'Container lifecycle',
        'Starting and stopping containers',
        'Inspecting containers',
        'Container logs and debugging'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'docker-fundamentals',
      title:'Docker Fundamentals',
      env:'local',
      conceptTag: 'docker.theory',
      status:'not_completed',
      summary:'Introduction to Docker platform and its components.',
      purpose:'Learn the basic architecture and components of Docker.',
      overview:[
        'What is Docker',
        'Docker architecture overview',
        'Docker daemon and Docker client',
        'Docker registry',
        'Docker images and containers',
        'Docker workflow'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'docker-installation',
      title:'Docker Installation and Setup',
      env:'local',
      conceptTag: 'docker.project',
      status:'not_completed',
      summary:'Installing Docker engine and configuring the Docker environment.',
      purpose:'Learn how to install Docker on Linux systems and verify the installation.',
      overview:[
        'Installing Docker on Linux',
        'Docker installation using package manager',
        'Docker daemon configuration',
        'Running the first container',
        'Docker version and environment verification'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'docker-images',
      title:'Docker Images',
      env:'local',
      conceptTag: 'docker.theory',
      status:'not_completed',
      summary:'Understanding Docker images and how they are used to create containers.',
      purpose:'Learn how Docker images work and how they are stored and managed.',
      overview:[
        'What is a Docker image',
        'Image layers and layered filesystem',
        'Pulling images from Docker Hub',
        'Listing Docker images',
        'Removing images',
        'Image versioning and tags'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'dockerfile-image-build',
      title:'Dockerfile and Image Building',
      env:'local',
      conceptTag: 'docker.theory',
      status:'not_completed',
      summary:'Creating custom Docker images using Dockerfile.',
      purpose:'Learn how to package applications inside Docker images.',
      overview:[
        'What is a Dockerfile',
        'Dockerfile instructions',
        'Building Docker images',
        'Using COPY and ADD instructions',
        'Using RUN and CMD instructions',
        'Optimizing Dockerfiles'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'docker-networking',
      title:'Docker Networking',
      env:'local',
      conceptTag: 'docker.theory',
      status:'not_completed',
      summary:'Understanding networking between containers.',
      purpose:'Learn how containers communicate with each other and external networks.',
      overview:[
        'Docker network types',
        'Bridge networks',
        'Host networks',
        'Overlay networks',
        'Container communication',
        'Exposing ports and port mapping'
      ],

      page:'../../projects/maintenance-page.html'
    },
    {
      id:'docker-storage',
      title:'Docker Volumes and Storage',
      env:'local',
      conceptTag: 'docker.theory',
      status:'not_completed',
      summary:'Managing persistent storage for Docker containers.',
      purpose:'Learn how to store data outside containers using Docker volumes.',
      overview:[
        'Docker storage concepts',
        'Docker volumes',
        'Bind mounts',
        'Persistent container storage',
        'Volume management',
        'Data sharing between containers'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'docker-security',
      title:'Docker Security Best Practices',
      env:'server',
      conceptTag: 'docker.theory',
      status:'not_completed',
      summary:'Understanding security practices for containerized applications.',
      purpose:'Learn how to secure Docker containers and images.',
      overview:[
        'Container security risks',
        'Running containers as non-root',
        'Image vulnerability scanning',
        'Secrets management',
        'Secure Docker daemon configuration',
        'Network isolation'
      ],
      page:'../../projects/maintenance-page.html'
    },
  ]
  },

  { id:'registry', label:'Registry', icon:'📦', projects:
  [
    {
      id:'registry-fundamentals',
      title:'Container Registry Fundamentals',
      env:'local',
      conceptTag: 'registry.theory',
      status:'not_completed',
      summary:'Introduction to container registries and how they store and distribute container images.',
      purpose:'Understand the role of container registries in containerized environments and DevOps pipelines.',
      overview:[
        'What is a container registry',
        'Difference between container images and registries',
        'Public vs private container registries',
        'How Docker images are stored in registries',
        'Image repositories and tags',
        'Registry architecture overview'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'open-source-container-registries',
      title:'Open Source Container Registries',
      env:'cloud',
      conceptTag: 'registry.theory',
      status:'not_completed',
      summary:'Using free and open-source container registries to store and distribute container images.',
      purpose:'Learn how developers use public and self-hosted registries for container image storage.',
      overview:[
        'Docker Hub (Free public repositories)',
        'GitHub Container Registry',
        'GitLab Container Registry',
        'Quay.io',
        'Harbor (Self-hosted open-source registry)',
        'Authentication with public registries',
        'Pulling and pushing container images'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'cloud-container-registries',
      title:'Cloud Container Registries',
      env:'cloud',
      conceptTag: 'registry.theory',
      status:'not_completed',
      summary:'Using managed container registries provided by cloud platforms.',
      purpose:'Learn how cloud providers manage container image storage.',
      overview:[
        'AWS Elastic Container Registry (ECR)',
        'Azure Container Registry',
        'Google Artifact Registry',
        'Authentication with cloud registries',
        'Deploying containers from cloud registries'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'dockerhub-registry',
      title:'Docker Hub Registry',
      env:'cloud',
      conceptTag: 'dockerhub',
      status:'not_completed',
      summary:'Using Docker Hub as a public container registry.',
      purpose:'Learn how to store and distribute container images using Docker Hub.',
      overview:[
        'What is Docker Hub',
        'Creating Docker Hub account',
        'Image repositories',
        'Public vs private repositories',
        'Tagging container images',
        'Pushing images to Docker Hub',
        'Pulling images from Docker Hub'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'private-docker-registry',
      title:'Private Docker Registry Setup',
      env:'local',
      conceptTag: 'dockerhub',
      status:'not_completed',
      summary:'Deploying a private container registry using Docker registry image.',
      purpose:'Learn how to run a private container registry for internal image management.',
      overview:[
        'Introduction to private container registries',
        'Running Docker registry container',
        'Configuring registry storage',
        'Pushing images to private registry',
        'Pulling images from private registry',
        'Managing local registry repositories'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'harbor-registry',
      title:'Harbor Enterprise Container Registry',
      env:'server',
      conceptTag: 'harbor',
      status:'not_completed',
      summary:'Setting up Harbor as an enterprise container registry with advanced security and management features.',
      purpose:'Learn how Harbor provides enterprise-grade container registry features.',
      overview:[
        'Introduction to Harbor registry',
        'Harbor architecture',
        'Installing Harbor using Docker Compose',
        'Harbor projects and repositories',
        'User access management',
        'Harbor UI and administration'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'registry-image-versioning',
      title:'Container Image Tagging and Versioning',
      env:'local',
      conceptTag: 'harbor',
      status:'not_completed',
      summary:'Managing container image versions using tags.',
      purpose:'Learn how tagging helps manage image versions in registries.',
      overview:[
        'Image tagging strategies',
        'Semantic versioning',
        'Latest tag vs version tags',
        'Environment-specific tags',
        'Managing multiple image versions'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'registry-authentication',
      title:'Registry Authentication and Access Control',
      env:'server',
      conceptTag: 'harbor',
      status:'not_completed',
      summary:'Managing secure access to container registries.',
      purpose:'Learn how registries enforce authentication and authorization.',
      overview:[
        'Registry login and authentication',
        'Access tokens and credentials',
        'Role-based access control',
        'Managing users and permissions',
        'Secure registry access'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'registry-storage-management',
      title:'Registry Storage and Image Management',
      env:'server',
      conceptTag: 'harbor',
      status:'not_completed',
      summary:'Managing registry storage and image lifecycle.',
      purpose:'Learn how registries manage image storage and cleanup.',
      overview:[
        'Registry storage backends',
        'Image layers and storage structure',
        'Garbage collection',
        'Deleting images and repositories',
        'Registry storage optimization'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'registry-security-scanning',
      title:'Container Image Security and Scanning',
      env:'server',
      conceptTag: 'harbor',
      status:'not_completed',
      summary:'Scanning container images for vulnerabilities.',
      purpose:'Learn how registries integrate security scanning tools.',
      overview:[
        'Container image vulnerabilities',
        'Image scanning tools',
        'Harbor vulnerability scanning',
        'Security policies',
        'Preventing insecure images'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'registry-replication',
      title:'Registry Replication and Synchronization',
      env:'server',
      conceptTag: 'harbor',
      status:'not_completed',
      summary:'Replicating container images across multiple registries.',
      purpose:'Learn how registries synchronize images across environments.',
      overview:[
        'Registry replication concepts',
        'Multi-region registry replication',
        'Harbor replication policies',
        'Synchronizing container images',
        'High availability registry setups'
      ],
      page:'../../projects/maintenance-page.html'
    }
  ]
  },


  { id:'swarm', label:'Docker Swarm', icon:'🐳🐝', projects:
  [
    {
      id:'swarm-fundamentals',
      title:'Docker Swarm Fundamentals',
      env:'local',
      conceptTag: 'swarm.theory',
      status:'not_completed',
      summary:'Introduction to Docker Swarm container orchestration and how it manages clustered Docker environments.',
      purpose:'Understand how Docker Swarm enables container orchestration, high availability, and distributed application deployment.',
      overview:[
        'What is container orchestration',
        'Introduction to Docker Swarm',
        'Difference between standalone Docker and Docker Swarm',
        'Swarm architecture overview',
        'Manager nodes and worker nodes',
        'How Swarm schedules containers across nodes',
        'High availability and fault tolerance concepts'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-services',
      title:'Docker Swarm Services',
      env:'local',
      conceptTag: 'swarm.theory',
      status:'not_completed',
      summary:'Deploy applications as services in Docker Swarm.',
      purpose:'Understand how services manage container deployments in a swarm cluster.',
      overview:[
        'What is a Docker Swarm service',
        'Service vs container',
        'Service tasks and scheduling',
        'Replicated services',
        'Global services',
        'Managing service lifecycle',
        'Inspecting running services'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-service-scaling',
      title:'Docker Swarm Service Scaling',
      env:'server',
      conceptTag: 'swarm.theory',
      status:'not_completed',
      summary:'Scale Docker services across multiple nodes.',
      purpose:'Learn how Docker Swarm distributes containers across cluster nodes.',
      overview:[
        'Scaling services horizontally',
        'Replicas and container distribution',
        'Load balancing across replicas',
        'Scaling services dynamically',
        'Swarm service scheduling',
        'Resource management during scaling'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-networking',
      title:'Docker Swarm Networking',
      env:'server',
      conceptTag: 'swarm.theory',
      status:'not_completed',
      summary:'Understand networking in Docker Swarm clusters.',
      purpose:'Learn how containers communicate across nodes using overlay networks.',
      overview:[
        'Swarm networking architecture',
        'Overlay networks',
        'Ingress network',
        'Container communication across nodes',
        'Service discovery in swarm',
        'Internal load balancing'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-stack-deployment',
      title:'Docker Stack Deployment',
      env:'server',
      conceptTag: 'swarm.theory',
      status:'not_completed',
      summary:'Deploy multi-container applications using Docker stacks.',
      purpose:'Learn how to manage complex applications in swarm clusters.',
      overview:[
        'Introduction to Docker stacks',
        'Docker stack vs docker compose',
        'Creating docker-stack.yml',
        'Deploying stacks in swarm',
        'Managing stack services',
        'Removing stack deployments'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-rolling-updates',
      title:'Docker Swarm Rolling Updates',
      env:'server',
      conceptTag: 'swarm.theory',
      status:'not_completed',
      summary:'Update running services without downtime.',
      purpose:'Understand how Docker Swarm performs zero-downtime updates.',
      overview:[
        'Rolling update strategy',
        'Updating service images',
        'Controlling update parallelism',
        'Monitoring update progress',
        'Rollback strategies',
        'Zero downtime deployments'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-secrets',
      title:'Docker Swarm Secrets Management',
      env:'server',
      conceptTag: 'swarm.theory',
      status:'not_completed',
      summary:'Securely manage sensitive data in Docker Swarm.',
      purpose:'Learn how Docker Swarm protects passwords and API keys.',
      overview:[
        'Introduction to Docker secrets',
        'Storing sensitive data in swarm',
        'Accessing secrets inside containers',
        'Managing secrets lifecycle',
        'Secret encryption in swarm'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-cluster-init',
      title:'Docker Swarm Cluster Initialization',
      env:'local',
      conceptTag: 'swarm.project',
      status:'not_completed',
      summary:'Initialize and manage a Docker Swarm cluster.',
      purpose:'Learn how to create a Swarm cluster and manage nodes within the cluster.',
      overview:[
        'Initializing a Docker Swarm cluster',
        'Understanding swarm manager node',
        'Worker nodes and joining cluster',
        'Swarm join tokens',
        'Promoting and demoting nodes',
        'Viewing cluster status',
        'Managing swarm nodes'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-monitoring',
      title:'Docker Swarm Monitoring and Logging',
      env:'server',
      conceptTag: 'swarm.project',
      status:'not_completed',
      summary:'Monitor swarm clusters using monitoring tools.',
      purpose:'Understand how to observe container health and cluster performance.',
      overview:[
        'Monitoring swarm clusters',
        'Prometheus metrics collection',
        'Grafana dashboards',
        'Centralized logging',
        'Container performance monitoring'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'swarm-high-availability',
      title:'Docker Swarm High Availability',
      env:'cluster',
      conceptTag: 'swarm.project',
      status:'not_completed',
      summary:'Design highly available Docker Swarm clusters.',
      purpose:'Learn how to build resilient swarm clusters for production workloads.',
      overview:[
        'Swarm high availability architecture',
        'Multiple manager nodes',
        'Leader election and raft consensus',
        'Node failure handling',
        'Cluster recovery strategies'
      ],
      page:'../../projects/maintenance-page.html'
    }
  ]},

  { id:'kubernetes', label:'Kubernetes', icon:'☸️', projects:
  [
    {
      id:'kubernetes-fundamentals',
      title:'Kubernetes Fundamentals',
      env:'local',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Introduction to Kubernetes container orchestration platform and how it manages containerized applications.',
      purpose:'Understand the core principles of Kubernetes and why it is used to manage containerized workloads at scale.',
      overview:[
        'What is container orchestration',
        'Introduction to Kubernetes',
        'Difference between Docker Swarm and Kubernetes',
        'Why Kubernetes is used in modern DevOps',
        'High availability and scalability in Kubernetes',
        'Basic Kubernetes architecture overview'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-architecture',
      title:'Kubernetes Architecture',
      env:'local',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Understanding the internal architecture and components of Kubernetes clusters.',
      purpose:'Learn how Kubernetes control plane and worker nodes work together to manage applications.',
      overview:[
        'Kubernetes control plane components',
        'API server responsibilities',
        'Scheduler and controller manager',
        'etcd distributed key-value store',
        'Worker node components',
        'Kubelet and kube-proxy',
        'Container runtime interface'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-pods',
      title:'Kubernetes Pods',
      env:'cluster',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Understanding Kubernetes pods which are the smallest deployable units in Kubernetes.',
      purpose:'Learn how containers are grouped and managed inside pods.',
      overview:[
        'What is a Kubernetes pod',
        'Pod lifecycle',
        'Single container vs multi-container pods',
        'Pod networking model',
        'Creating pods using YAML manifests',
        'Inspecting running pods'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-deployments',
      title:'Kubernetes Deployments',
      env:'cluster',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Deploy and manage applications in Kubernetes using deployments.',
      purpose:'Understand how deployments manage pod replicas and application updates.',
      overview:[
        'What is a deployment',
        'ReplicaSets and scaling',
        'Declarative application deployment',
        'Deployment strategies',
        'Rolling updates',
        'Rollback mechanisms'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-services',
      title:'Kubernetes Services',
      env:'cluster',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Expose applications running in Kubernetes clusters using services.',
      purpose:'Learn how Kubernetes provides networking and service discovery for pods.',
      overview:[
        'ClusterIP services',
        'NodePort services',
        'LoadBalancer services',
        'Service discovery',
        'Internal load balancing',
        'Accessing applications inside clusters'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-networking',
      title:'Kubernetes Networking',
      env:'cluster',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Understand how networking works between pods, services, and nodes.',
      purpose:'Learn how Kubernetes networking enables communication across containers.',
      overview:[
        'Pod-to-pod communication',
        'Cluster networking models',
        'Container Network Interface (CNI)',
        'Popular CNI plugins like Calico and Flannel',
        'Network policies',
        'Service communication'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-storage',
      title:'Kubernetes Storage Management',
      env:'cluster',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Managing persistent storage for Kubernetes workloads.',
      purpose:'Learn how Kubernetes provides persistent data storage for containers.',
      overview:[
        'Persistent Volumes',
        'Persistent Volume Claims',
        'Storage classes',
        'Dynamic volume provisioning',
        'Stateful applications storage'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-configmaps-secrets',
      title:'Kubernetes ConfigMaps and Secrets',
      env:'cluster',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Manage configuration and sensitive information for Kubernetes applications.',
      purpose:'Understand how applications securely access configuration and credentials.',
      overview:[
        'Introduction to ConfigMaps',
        'Application configuration management',
        'Kubernetes secrets',
        'Secure environment variables',
        'Secret encryption'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-ingress',
      title:'Kubernetes Ingress Controller',
      env:'cluster',
      conceptTag: 'k8s.theory',
      status:'not_completed',
      summary:'Expose applications using HTTP routing and load balancing.',
      purpose:'Learn how ingress controllers manage external access to services.',
      overview:[
        'What is Kubernetes ingress',
        'Ingress controllers',
        'Nginx ingress controller',
        'HTTP routing rules',
        'TLS and SSL termination'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-cluster-setup',
      title:'Kubernetes Cluster Setup',
      env:'local',
      conceptTag: 'k8s.project',
      status:'not_completed',
      summary:'Setting up Kubernetes clusters using local tools or production environments.',
      purpose:'Learn how Kubernetes clusters are created and configured.',
      overview:[
        'Minikube cluster setup',
        'Kind (Kubernetes in Docker)',
        'Installing kubectl CLI',
        'Cluster initialization using kubeadm',
        'Understanding kubeconfig file',
        'Verifying cluster health'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-monitoring',
      title:'Kubernetes Monitoring and Observability',
      env:'cluster',
      conceptTag: 'k8s.project',
      status:'not_completed',
      summary:'Monitor Kubernetes clusters using observability tools.',
      purpose:'Understand how to monitor cluster health and application performance.',
      overview:[
        'Prometheus monitoring',
        'Grafana dashboards',
        'Kubernetes metrics server',
        'Cluster performance monitoring',
        'Alerting and incident detection'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kubernetes-high-availability',
      title:'Kubernetes High Availability',
      env:'cluster',
      conceptTag: 'k8s.project',
      status:'not_completed',
      summary:'Design highly available Kubernetes clusters for production workloads.',
      purpose:'Understand how Kubernetes ensures resilience and fault tolerance.',
      overview:[
        'Multi-node Kubernetes clusters',
        'Control plane redundancy',
        'Node failure handling',
        'Cluster recovery strategies',
        'Production cluster design'
      ],
      page:'../../projects/maintenance-page.html'
    }
  ]
  },

  { id:'iac', label:'Infrastructure as Code', icon:'🏗️', projects:
  [
    {
      id:'iac-fundamentals',
      title:'Infrastructure as Code Fundamentals',
      env:'cloud',
      conceptTag: 'iac.theory',
      status:'not_completed',
      summary:'Introduction to Infrastructure as Code (IaC) and how infrastructure can be provisioned using code instead of manual configuration.',
      purpose:'Understand how Infrastructure as Code automates cloud infrastructure provisioning and enables version-controlled infrastructure management.',
      overview:[
        'What is Infrastructure as Code',
        'Traditional infrastructure management vs IaC',
        'Benefits of Infrastructure as Code',
        'Declarative vs Imperative infrastructure models',
        'Infrastructure automation concepts',
        'Version controlling infrastructure',
        'Introduction to common IaC tools'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'iac-tools',
      title:'Infrastructure as Code Tools',
      env:'cloud',
      conceptTag: 'iac.theory',
      status:'not_completed',
      summary:'Overview of tools used to implement Infrastructure as Code across cloud platforms.',
      purpose:'Understand the ecosystem of tools used to automate infrastructure provisioning.',
      overview:[
        'Overview of Infrastructure as Code tools',
        'Terraform and OpenTofu',
        'AWS CloudFormation',
        'Pulumi',
        'Ansible vs Terraform differences',
        'Configuration management vs infrastructure provisioning'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'terraform-hcl',
      title:'Terraform Configuration Language (HCL)',
      env:'cloud',
      conceptTag: 'terraform.theory',
      status:'not_completed',
      summary:'Understanding HashiCorp Configuration Language used by Terraform.',
      purpose:'Learn how infrastructure resources are defined using Terraform configuration files.',
      overview:[
        'Introduction to HCL syntax',
        'Terraform blocks',
        'Resource definitions',
        'Provider configuration',
        'Input variables',
        'Output values'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'terraform-providers',
      title:'Terraform Providers and Resources',
      env:'cloud',
      conceptTag: 'terraform.theory',
      status:'not_completed',
      summary:'Using Terraform providers to interact with cloud platforms.',
      purpose:'Understand how Terraform connects with infrastructure providers.',
      overview:[
        'Terraform providers overview',
        'AWS provider configuration',
        'Azure provider configuration',
        'Resource blocks',
        'Creating infrastructure resources',
        'Managing provider authentication'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'terraform-state',
      title:'Terraform State Management',
      env:'cloud',
      conceptTag: 'terraform.theory',
      status:'not_completed',
      summary:'Understanding Terraform state files and how they track infrastructure.',
      purpose:'Learn how Terraform manages infrastructure state and ensures consistency.',
      overview:[
        'What is Terraform state',
        'Terraform state file structure',
        'State locking mechanisms',
        'Remote state backends',
        'State storage best practices'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'terraform-modules',
      title:'Terraform Modules',
      env:'cloud',
      conceptTag: 'terraform.theory',
      status:'not_completed',
      summary:'Organize Terraform configurations using reusable modules.',
      purpose:'Learn how to build reusable infrastructure components.',
      overview:[
        'What are Terraform modules',
        'Module structure',
        'Reusable infrastructure components',
        'Using public modules',
        'Creating custom modules'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'terraform-workspaces',
      title:'Terraform Workspaces',
      env:'cloud',
      conceptTag: 'terraform.theory',
      status:'not_completed',
      summary:'Manage multiple infrastructure environments using Terraform workspaces.',
      purpose:'Learn how to manage environments such as development, staging, and production.',
      overview:[
        'Terraform workspaces',
        'Managing multiple environments',
        'Workspace isolation',
        'Environment specific configurations'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'terraform-security',
      title:'Terraform Security and Secrets',
      env:'cloud',
      conceptTag: 'terraform.theory',
      status:'not_completed',
      summary:'Secure infrastructure provisioning using Terraform best practices.',
      purpose:'Understand how to protect infrastructure credentials and secrets.',
      overview:[
        'Managing secrets in Terraform',
        'Sensitive variables',
        'Secure backend storage',
        'IAM permissions for Terraform',
        'Security best practices'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'opentofu-fundamentals',
      title:'OpenTofu Fundamentals',
      env:'cloud',
      conceptTag: 'opentofu.theory',
      status:'not_completed',
      summary:'Introduction to OpenTofu as an open-source alternative to Terraform.',
      purpose:'Understand how OpenTofu continues the Terraform open-source ecosystem.',
      overview:[
        'What is OpenTofu',
        'OpenTofu history and ecosystem',
        'Differences between Terraform and OpenTofu',
        'OpenTofu configuration compatibility',
        'OpenTofu architecture'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'terraform-setup',
      title:'Terraform Installation and Setup',
      env:'local',
      conceptTag: 'iac.project',
      status:'not_completed',
      summary:'Install and configure Terraform for infrastructure provisioning.',
      purpose:'Learn how to prepare Terraform environments for development and deployment.',
      overview:[
        'Installing Terraform CLI',
        'Terraform CLI commands',
        'Terraform project structure',
        'Terraform initialization',
        'Terraform plan and apply workflow',
        'Terraform configuration files'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'opentofu-setup',
      title:'OpenTofu Installation and Setup',
      env:'local',
      conceptTag: 'iac.project',
      status:'not_completed',
      summary:'Install and configure OpenTofu for infrastructure provisioning.',
      purpose:'Learn how to prepare OpenTofu environments for development and deployment.',
      overview:[
        'Installing OpenTofu CLI',
        'OpenTofu CLI commands',
        'OpenTofu project structure',
        'OpenTofu initialization',
        'OpenTofu plan and apply workflow',
        'OpenTofu configuration files'
      ],
      page:'../../projects/maintenance-page.html'
    }
  ]
  },

  { id:'ansible', label:'Configuration Management', icon:'🔧', projects:
  [
    {
      id:'configuration-overview',
      title:'Configuration Overview',
      env:'concept',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Introduction to configuration concepts in software systems, infrastructure, and applications.',
      purpose:'Understand what configuration means in computing systems and why managing configuration properly is important for stable and scalable environments.',
      overview:[
        'What is configuration in software and systems',
        'Types of configuration in infrastructure and applications',
        'Where configuration is stored',
        'Manual configuration vs automated configuration',
        'Configuration in modern DevOps environments',
        'Common problems caused by unmanaged configuration',
        'Importance of standard configuration practices'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'configuration-as-code',
      title:'Configuration as Code',
      env:'concept',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Managing system configuration using code instead of manual setup.',
      purpose:'Learn how configuration can be version controlled and automated.',
      overview:[
        'Manual configuration problems',
        'Storing configuration in code',
        'Version controlled configuration',
        'Automation using configuration files',
        'Repeatable infrastructure setup'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'configuration-drift',
      title:'Configuration Drift',
      env:'concept',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Understanding configuration drift and its impact.',
      purpose:'Learn why servers become inconsistent and how automation solves it.',
      overview:[
        'What is configuration drift',
        'Causes of configuration drift',
        'Manual configuration issues',
        'Detecting drift',
        'Preventing drift with automation'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'desired-state-configuration',
      title:'Desired State Configuration',
      env:'concept',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Defining the desired state of infrastructure using code.',
      purpose:'Understand how configuration tools enforce a defined system state.',
      overview:[
        'Desired state vs current state',
        'Declarative configuration',
        'State enforcement',
        'Self-healing infrastructure'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'idempotency-concept',
      title:'Idempotency Concept',
      env:'concept',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Understanding idempotent operations in configuration management.',
      purpose:'Learn how automation tools safely apply configurations repeatedly.',
      overview:[
        'Definition of idempotency',
        'Why idempotency matters',
        'Idempotent automation tasks',
        'Avoiding duplicate configuration changes'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'agent-vs-agentless-tools',
      title:'Agent vs Agentless Configuration Management',
      env:'concept',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Understanding different architecture models used by configuration tools.',
      purpose:'Compare agent-based and agentless automation approaches.',
      overview:[
        'Agent based architecture',
        'Agentless architecture',
        'Security considerations',
        'Performance comparison',
        'Tool examples'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'configuration-management-tools-overview',
      title:'Configuration Management Tools Overview',
      env:'concept',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Overview of major configuration management tools.',
      purpose:'Understand the ecosystem of automation tools used in DevOps.',
      overview:[
        'Ansible overview',
        'Puppet overview',
        'Chef overview',
        'SaltStack overview',
        'Comparison of tools'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'configuration-management-fundamentals',
      title:'Configuration Management Fundamentals',
      env:'server',
      conceptTag: 'config.theory',
      status:'not_completed',
      summary:'Introduction to configuration management and automation tools used in DevOps environments.',
      purpose:'Understand why configuration management tools are required to automate server configuration and maintain infrastructure consistency.',
      overview:[
        'What is configuration management',
        'Infrastructure automation concepts',
        'Configuration drift problem',
        'Benefits of configuration management tools',
        'Overview of popular tools like Ansible, Puppet, Chef, SaltStack',
        'Agent vs agentless configuration management',
        'Why Ansible is widely used in DevOps'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-fundamentals',
      title:'Ansible Fundamentals',
      env:'local',
      status:'not_completed',
      conceptTag: 'ansible.theory',
      summary:'Introduction to Ansible automation platform and its core components.',
      purpose:'Understand how Ansible automates server configuration and application deployment.',
      overview:[
        'What is Ansible',
        'Agentless architecture of Ansible',
        'How Ansible works over SSH',
        'Ansible control node',
        'Managed nodes',
        'Ansible modules',
        'Ansible inventory'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-architecture',
      title:'Ansible Architecture',
      env:'concept',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Core architecture components of Ansible.',
      purpose:'Understand how Ansible communicates with managed nodes.',
      overview:[
        'Control node',
        'Managed nodes',
        'Inventory',
        'Modules',
        'Playbooks'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-inventory',
      title:'Ansible Inventory',
      env:'concept',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Understanding inventory management in Ansible.',
      purpose:'Learn how servers are organized and managed.',
      overview:[
        'Static inventory',
        'Dynamic inventory',
        'Grouping hosts',
        'Host variables'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-playbooks',
      title:'Ansible Playbooks',
      env:'server',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Automate infrastructure configuration using Ansible playbooks.',
      purpose:'Learn how to define automation tasks using YAML playbooks.',
      overview:[
        'Introduction to Ansible playbooks',
        'YAML syntax basics',
        'Playbook structure',
        'Defining tasks in playbooks',
        'Running playbooks',
        'Idempotent operations in Ansible'
      ],

      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-modules',
      title:'Ansible Modules',
      env:'server',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Use Ansible modules to automate system configuration tasks.',
      purpose:'Understand how modules execute tasks on managed hosts.',
      overview:[
        'What are Ansible modules',
        'Common modules for system management',
        'Package management modules',
        'File and directory modules',
        'Service management modules',
        'Command and shell modules'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-roles',
      title:'Ansible Roles',
      env:'server',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Organize automation tasks using Ansible roles.',
      purpose:'Learn how to structure complex automation projects.',
      overview:[
        'Role directory structure',
        'Tasks, handlers, templates and variables',
        'Reusable automation roles',
        'Role dependencies',
        'Using roles in playbooks'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-variables',
      title:'Ansible Variables',
      env:'concept',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Managing configuration variables in automation.',
      purpose:'Learn how to create flexible automation workflows.',
      overview:[
        'Variable types',
        'Variable precedence',
        'Group variables',
        'Host variables'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-templates',
      title:'Ansible Templates',
      env:'concept',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Dynamic configuration file generation.',
      purpose:'Learn how templates customize configurations.',
      overview:[
        'Jinja2 templates',
        'Dynamic variables',
        'Generating configuration files'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-handlers',
      title:'Ansible Handlers',
      env:'concept',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Handlers triggered after configuration changes.',
      purpose:'Automate service restarts or reloads.',
      overview:[
        'What are handlers',
        'Triggering handlers',
        'Service restart patterns'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-vault',
      title:'Ansible Vault and Secrets Management',
      env:'server',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Secure sensitive information using Ansible Vault.',
      purpose:'Learn how to encrypt sensitive configuration data.',
      overview:[
        'Introduction to Ansible Vault',
        'Encrypting variables',
        'Managing secrets securely',
        'Decrypting vault files',
        'Best practices for secrets management'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-galaxy',
      title:'Ansible Galaxy',
      env:'server',
      conceptTag: 'ansible.theory',
      status:'not_completed',
      summary:'Use Ansible Galaxy to download and share reusable automation roles.',
      purpose:'Understand how the Ansible ecosystem provides reusable automation components.',
      overview:[
        'Introduction to Ansible Galaxy',
        'Installing community roles',
        'Creating custom roles',
        'Publishing roles to Galaxy'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-installation',
      title:'Ansible Installation and Setup',
      env:'local',
      conceptTag: 'ansible.project',
      status:'not_completed',
      summary:'Install and configure Ansible control node and connect to managed servers.',
      purpose:'Learn how to prepare an environment for running Ansible automation.',
      overview:[
        'Installing Ansible on Linux',
        'Configuring SSH access to servers',
        'Setting up passwordless SSH authentication',
        'Creating Ansible inventory file',
        'Testing connectivity with ansible ping module'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-cloud-automation',
      title:'Ansible Cloud Automation',
      env:'cloud',
      conceptTag: 'ansible.project',
      status:'not_completed',
      summary:'Automate cloud infrastructure using Ansible.',
      purpose:'Learn how Ansible provisions infrastructure in cloud platforms.',
      overview:[
        'Automating AWS infrastructure',
        'Managing EC2 instances with Ansible',
        'Cloud modules for infrastructure automation',
        'Dynamic inventory for cloud environments'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'ansible-cicd',
      title:'Ansible CI/CD Integration',
      env:'server',
      conceptTag: 'ansible.project',
      status:'not_completed',
      summary:'Integrate Ansible automation with CI/CD pipelines.',
      purpose:'Learn how configuration management integrates with deployment automation.',
      overview:[
        'Using Ansible in CI/CD pipelines',
        'Automating deployments with Ansible',
        'Jenkins and Ansible integration',
        'Infrastructure provisioning in pipelines'
      ],
      page:'../../projects/maintenance-page.html'
    }
  ] 
  },

  { id:'observability', label:'Observability', icon:'📊', projects:
  [ 

    {
      id:'observability-fundamentals',
      title:'Observability Fundamentals',
      env:'server',
      conceptTag: 'obser.theory',
      status:'not_completed',
      summary:'Introduction to observability concepts used to understand the behavior and performance of distributed systems.',
      purpose:'Understand how observability helps engineers detect issues, troubleshoot failures, and improve reliability in modern cloud-native systems.',
      overview:[
        'What is observability in modern software systems',
        'Difference between monitoring and observability',
        'Why observability is important for microservices and distributed systems',
        'The three pillars of observability: metrics, logs, and traces',
        'How telemetry data helps engineers understand system behavior',
        'Observability in DevOps and Site Reliability Engineering (SRE)',
        'Key challenges of monitoring distributed cloud systems'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'observability-architecture',
      title:'Observability Architecture',
      env:'server',
      conceptTag: 'obser.theory',
      status:'not_completed',
      summary:'Understanding how observability systems are designed to collect, process, and visualize telemetry data.',
      purpose:'Learn how monitoring systems gather data from infrastructure and applications.',
      overview:[
        'Telemetry data collection pipelines',
        'Metrics collection architecture',
        'Log aggregation systems',
        'Distributed tracing architecture',
        'Time-series databases',
        'Data visualization platforms',
        'Alerting and incident response systems'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'metrics-monitoring',
      title:'Metrics Monitoring Concepts',
      env:'server',
      conceptTag: 'obser.theory',
      status:'not_completed',
      summary:'Understanding how system and application metrics are collected and analyzed.',
      purpose:'Learn how metrics provide insights into infrastructure performance and resource usage.',
      overview:[
        'What are metrics',
        'System metrics vs application metrics',
        'CPU, memory, disk, and network metrics',
        'Time-series data and monitoring databases',
        'Performance indicators and SLIs',
        'Service Level Objectives (SLOs)'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'log-management',
      title:'Log Management Concepts',
      env:'server',
      conceptTag: 'obser.theory',
      status:'not_completed',
      summary:'Understanding how logs help engineers troubleshoot systems and track events.',
      purpose:'Learn how centralized log aggregation systems work.',
      overview:[
        'What are logs',
        'Application logs vs system logs',
        'Structured logging',
        'Log aggregation pipelines',
        'Centralized logging platforms',
        'Searching and analyzing logs'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'distributed-tracing',
      title:'Distributed Tracing',
      env:'server',
      conceptTag: 'obser.theory',
      status:'not_completed',
      summary:'Track requests across distributed microservices systems.',
      purpose:'Understand how tracing identifies performance bottlenecks across services.',
      overview:[
        'What is distributed tracing',
        'Tracing microservice requests',
        'Trace spans and trace context',
        'Root cause analysis using traces',
        'Understanding request latency'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'elk-fundamentals',
      title:'ELK Stack Fundamentals',
      env:'server',
      conceptTag: 'elk.theory',
      status:'not_completed',
      summary:'Introduction to ELK stack for centralized log management.',
      purpose:'Learn how Elasticsearch, Logstash, and Kibana process and visualize log data.',
      overview:[
        'What is ELK stack',
        'Components of ELK stack',
        'Elasticsearch search engine',
        'Logstash data processing pipeline',
        'Kibana visualization dashboards',
        'Centralized logging architecture'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'elasticsearch-storage',
      title:'Elasticsearch Log Storage',
      env:'server',
      conceptTag: 'elk.theory',
      status:'not_completed',
      summary:'Store and search logs using Elasticsearch.',
      purpose:'Understand how Elasticsearch indexes and searches large volumes of log data.',
      overview:[
        'Introduction to Elasticsearch',
        'Indexes and shards',
        'Log indexing architecture',
        'Searching log data',
        'Scaling Elasticsearch clusters'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'logstash-pipeline',
      title:'Logstash Log Processing',
      env:'server',
      conceptTag: 'elk.theory',
      status:'not_completed',
      summary:'Collect and transform logs using Logstash.',
      purpose:'Learn how Logstash processes logs before storing them.',
      overview:[
        'Logstash pipeline architecture',
        'Inputs, filters, and outputs',
        'Parsing log formats',
        'Transforming log data',
        'Sending logs to Elasticsearch'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'kibana-visualization',
      title:'Kibana Log Visualization',
      env:'server',
      conceptTag: 'elk.theory',
      status:'not_completed',
      summary:'Visualize logs and system events using Kibana dashboards.',
      purpose:'Learn how Kibana helps analyze system behavior through dashboards.',
      overview:[
        'Introduction to Kibana',
        'Building log dashboards',
        'Searching and filtering logs',
        'Creating visualizations',
        'Monitoring infrastructure logs'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'prometheus-monitoring',
      title:'Prometheus Monitoring System',
      env:'server',
      conceptTag: 'grafana.theory',
      status:'not_completed',
      summary:'Collect infrastructure and application metrics using Prometheus.',
      purpose:'Understand how Prometheus powers modern monitoring systems.',
      overview:[
        'Prometheus architecture',
        'Metrics scraping model',
        'Prometheus exporters',
        'Prometheus time-series database',
        'PromQL query language',
        'Alert rules and monitoring'
      ],
      page:'../../projects/maintenance-page.html'
    },
    {
      id:'grafana-dashboards',
      title:'Grafana Monitoring Dashboards',
      env:'server',
      conceptTag: 'grafana.theory',
      status:'not_completed',
      summary:'Visualize metrics using Grafana dashboards.',
      purpose:'Learn how Grafana helps engineers build monitoring dashboards.',
      overview:[
        'Introduction to Grafana',
        'Connecting Grafana with Prometheus',
        'Dashboard creation',
        'Visualization panels',
        'Alerting systems'
      ],
      page:'../../projects/maintenance-page.html'
    }
  ] 
  }
];

// Rebuild Cloud concept in place (keeps original ordering) with Fundamentals + AWS + Azure sections.
// note: structural normalization is now done in pages/projects/projects.js

// Optional section mapping for concepts (used by projects.js).
// This keeps group definitions close to the data while allowing the renderer to build sections.
window.PDATA_SECTION_MAP = {
  linux: {
    force: true,
    sections: [
      { id: 'fundamentals', label: 'Linux Fundamentals', field: 'conceptTag', value: 'theory.linux' },
      { id: 'projects', label: 'Projects', field: 'conceptTag', value: 'project.linux' }
    ]
  },
  Shell: {
    force: true,
    sections: [
      { id: 'fundamentals', label: 'Shell Fundamentals', field: 'conceptTag', value: 'theory.shell' },
      { id: 'projects', label: 'Projects', field: 'conceptTag', value: 'project.shell' }
    ]
  },
  networking: {
    force: true,
    sections: [
      { id: 'fundamentals', label: 'Network Fundamentals', field: 'conceptTag', value: 'theory.network' },
      { id: 'projects', label: 'Projects', field: 'conceptTag', value: 'project.network' }
    ]
  },
  jenkins: {
    force: true,
    sections: [
      { id: 'fundamentals', label: 'CI/CD Fundamentals', field: 'conceptTag', value: 'theory.cicd' },
      { id: 'fundamentals', label: 'Jenkins Fundamentals', field: 'conceptTag', value: 'theory.jenkins' },
      { id: 'projects', label: 'Jenkins Projects', field: 'conceptTag', value: 'project.jenkins' }
    ]
  },
  aws: { /* concept id in data is 'aws' (Cloud - AWS) */
    force: true,
    sections: [
      { id: 'fundamentals', label: 'Cloud Fundamentals', field: 'conceptTag', value: 'cloud.fundamentals' },
      { id: 'aws', label: 'AWS', field: 'conceptTag', value: 'cloud.aws.core' },
      // { id: 'azure', label: 'Azure', field: 'conceptTag', value: 'cloud.azure.core' }
    ]
  },
  docker: {
    force: true,
    sections: [
      { id: 'Containerization ', label: 'Containerization - fundamentals', field: 'conceptTag', value: 'container.theory' },
      { id: 'docker-projects', label: 'Docker Fundamentals', field: 'conceptTag', value: 'docker.theory' },
      { id: 'docker-projects', label: 'Docker Projects', field: 'conceptTag', value: 'docker.project' }
    ]
  },
  registry: {
    force: true,
    sections: [
      { id: 'Registry', label: 'Registry - fundamentals', field: 'conceptTag', value: 'registry.theory' },
      { id: 'docker-registry', label: 'Docker Hub', field: 'conceptTag', value: 'dockerhub' },
      { id: 'harbor-registry', label: 'Harbor', field: 'conceptTag', value: 'harbor' }
    ]
  },
  swarm: {
    force: true,
    sections: [
      { id: 'Registry', label: 'Fundamentals', field: 'conceptTag', value: 'swarm.theory' },
      { id: 'docker-registry', label: 'projects', field: 'conceptTag', value: 'swarm.project' }
    ]
  },
  kubernetes: {
    force: true,
    sections: [
      { id: 'Kubernetes', label: 'Fundamentals', field: 'conceptTag', value: 'k8s.theory' },
      { id: 'Kubernetes-projects', label: 'projects', field: 'conceptTag', value: 'k8s.project' }
    ]
  },
  iac: {
    force: true,
    sections: [
      { id: 'IAC', label: 'IAC Fundamentals', field: 'conceptTag', value: 'iac.theory' },
      { id: 'Terraform', label: 'Terraform Fundamentals', field: 'conceptTag', value: 'terraform.theory' },
      { id: 'Opentofy', label: 'OpenTofu Fundamentals', field: 'conceptTag', value: 'opentofu.theory' },
      { id: 'IAC-projects', label: 'Projects', field: 'conceptTag', value: 'iac.project' }
    ]
  },
  ansible: {
    force: true,
    sections: [
      { id: 'Configuration', label: 'Configuration Fundamentals', field: 'conceptTag', value: 'config.theory' },
      { id: 'Ansible', label: 'Ansible Fundamentals', field: 'conceptTag', value: 'ansible.theory' },
      { id: 'Ansible-projects', label: 'Projects', field: 'conceptTag', value: 'ansible.theory' }
    ]
  },
  observability: {
    force: true,
    sections: [
      { id: 'observability', label: 'Observability Fundamentals', field: 'conceptTag', value: 'obser.theory' },
      { id: 'ELK', label: 'ELK Fundamentals', field: 'conceptTag', value: 'elk.theory' },
      { id: 'Grafana', label: 'Grafana Fundamentals', field: 'conceptTag', value: 'grafana.theory' },
      // { id: 'Projects', label: 'Projects', field: 'conceptTag', value: 'obser.project' },
    ]
  }
  
};


