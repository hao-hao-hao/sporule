---
title: "Set Up Hortonworks Data Platform In Azure"
author: "Sporule"
date: ""
categories: "coding"
tags: "hadoop"
coverimage: ""
---

## Preparation

### ​Maximum Open Files Requirements

> The recommended maximum number of open [**file descriptors**](https://en.wikipedia.org/wiki/File_descriptor) is 10000, or more. To check the current value set for the maximum number of open file descriptors, execute the following shell commands on each host:

```bash
ulimit -Sn

ulimit -Hn

If the output is not greater than 10000, run the following command to set it to a suitable default:

ulimit -n 10000
```

It does not work for me as I got the error message:

```bash
-bash: ulimit: open files: cannot modify limit: Operation not permitted
```

If your account is "accountA", the solution is (I am using **CentOS 7**):

- modify  /etc/systemd/system.conf and  /etc/systemd/user.conf, update

```bash
DefaultLimitNOFILE=10000
```

- modify  /etc/security/limits.conf, add following lines at the end

```bash
accountA hard nofile 10000
accountA soft nofile 10000
```

you can also use * to enable this for all accounts

```bash
* hard nofile 10000
* soft nofile 10000
```

if you are using root account, you need to explicity say root

```bash
root hard nofile 10000
root soft nofile 10000
```

Credit to [mkasberg](https://superuser.com/users/164984/mkasberg)

### ​Set Up SSH Between Nodes

Copy and paste the private key to master:

>.ssh/id_rsa


### Disable Firewall

> systemctl disable firewalld

> service firewalld stop

### ​Disable SELinux and PackageKit and check the umask Value

set SELINUX=disabled in /etc/selinux/config

Permanently changing the umask for all interactive users:

sudo vim  /etc/profile

change umask to 022

### Install MySQL

```bash

yum install mysql-connector-java*

yum localinstall \

https://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm

yum install mysql-community-server

systemctl start mysqld.service

Obtain the randomly generated MySQL root password.

grep 'A temporary password is generated for root@localhost' \
/var/log/mysqld.log |tail -1
Reset the MySQL root password. Enter the following command. You are prompted for the password you obtained in the previous step. MySQL then asks you to change the password.

/usr/bin/mysql_secure_installation

!Q2w3e4r

```

### Install Open JDK

> yum install java-1.7.0-openjdk


### Ambari setup

