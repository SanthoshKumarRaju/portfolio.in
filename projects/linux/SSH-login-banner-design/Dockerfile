######################################
# This Dockerfile fro the simple echo desig
######################################

# FROM ubuntu:22.04

# ENV DEBIAN_FRONTEND=noninteractive

# RUN apt-get update && \
#     apt-get install -y openssh-server sudo curl && \
#     mkdir /var/run/sshd

# # create user
# RUN useradd -m devuser && \
#     echo "devuser:dev123" | chpasswd && \
#     adduser devuser sudo

# # SSH config
# RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# # Copy login banner
# COPY banner/motd.sh /etc/profile.d/motd.sh
# RUN chmod +x /etc/profile.d/motd.sh

# EXPOSE 22

# CMD ["/usr/sbin/sshd","-D"]


########################################
# This Dockerfile for the all the  design it has most of the  ssh design packages
########################################

FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install required packages
RUN apt-get update && \
    apt-get install -y \
    openssh-server \
    sudo \
    curl \
    figlet \
    toilet \
    neofetch \
    nano \
    ruby \
    && gem install lolcat \
    && mkdir /var/run/sshd

# Create user
RUN useradd -m devuser && \
    echo "devuser:dev123" | chpasswd && \
    adduser devuser sudo

# Enable SSH password authentication
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Remove default Ubuntu MOTD scripts
# RUN chmod -x /etc/update-motd.d/*

# Copy rainbow dashboard script
# COPY banner/99-dashboard /etc/update-motd.d/99-dashboard

# RUN chmod +x /etc/update-motd.d/99-dashboard

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]