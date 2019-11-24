---
title: "Set Up Hortonworks Data Platform In Azure"
author: "Sporule"
date: ""
categories: "code"
tags: "hadoop"
coverimage: ""
---

## Preparation


### Open POrt 8080


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

Use Root Accounts 

> sudo su

in master:
mkdir /root/.ssh;  chmod 700 /root/.ssh;

also add new file id_rsa, and paste the private key to the /root/.ssh

chmod 600 /root/.ssh/id_rsa

in slaves:
cp -R /home/sporule/.ssh /root/;  chmod 700 /root/.ssh;  chmod 600 /root/.ssh/authorized_keys


### ​Disable SELinux and PackageKit and check the umask Value

set SELINUX=disabled in /etc/selinux/config

Permanently changing the umask for all interactive users:

change umask to 022


### Install Open JDK 1.8

> yum install java-1.8.0-openjdk-devel

### Enable NTP
yum install -y ntp
systemctl enable ntpd

### hostname setup on every node

get host name


hostname -f
master.3xnxh3rxoieefdkcqfgjoegn3e.zx.internal.cloudapp.net
master2.3xnxh3rxoieefdkcqfgjoegn3e.zx.internal.cloudapp.net
slave1.3xnxh3rxoieefdkcqfgjoegn3e.zx.internal.cloudapp.net

-----------------

datahub-master.uksouth.cloudapp.azure.com
datahub-slave1.uksouth.cloudapp.azure.com



hostname slave1.3xnxh3rxoieefdkcqfgjoegn3e.zx.internal.cloudapp.net

vim /etc/hosts
1.2.3.4 <fully.qualified.domain.name>

vim /etc/sysconfig/network

NETWORKING=yes
HOSTNAME=<fully.qualified.domain.name>

### Ambari setup in master

prepare ambari repo

https://docs.cloudera.com/HDPDocuments/Ambari-2.7.3.0/bk_ambari-installation/content/download_the_ambari_repo_lnx7.html

wget -nv http://public-repo-1.hortonworks.com/ambari/centos7/2.x/updates/2.7.3.0/ambari.repo -O /etc/yum.repos.d/ambari.repo

> yum install ambari-server


manually set up jdk

> ambari-server setup -j /usr/lib/jvm/java-1.8.0-openjdk

https://docs.cloudera.com/HDPDocuments/Ambari-2.7.3.0/bk_ambari-installation/content/set_up_the_ambari_server.html



### Install MySQL

https://docs.cloudera.com/HDPDocuments/Ambari-2.7.3.0/bk_ambari-installation/content/install-mysql.html


```bash

yum install mysql-connector-java* 
sudo ambari-server setup --jdbc-db=mysql --jdbc-driver=/usr/share/java/mysql-connector-java.jar


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

## Config for Ranger and OZZIE

https://docs.cloudera.com/HDPDocuments/Ambari-2.7.3.0/bk_ambari-installation/content/configuring_mysql_for_ranger.html

https://mapr.com/docs/60/Oozie/MySQLDataStoreforOozie.html


CREATE USER 'rangerdba'@'localhost' IDENTIFIED BY 'edmung9Z!';

GRANT ALL PRIVILEGES ON *.* TO 'rangerdba'@'localhost';

CREATE USER 'rangerdba'@'%' IDENTIFIED BY 'edmung9Z!';

GRANT ALL PRIVILEGES ON *.* TO 'rangerdba'@'%';

GRANT ALL PRIVILEGES ON *.* TO 'rangerdba'@'localhost' WITH GRANT OPTION;

GRANT ALL PRIVILEGES ON *.* TO 'rangerdba'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;


### Start Ambari


ambari-server start

### enable all ports
8080, 8440, 8441


### Installation

http://sporule-master.uksouth.cloudapp.azure.com:8080/#/installer/step3

Detail Logs

/var/log/ambari-agent/ambari-agent.log


### Update Zookeeper Config on all nodes

zookeeper Cannot assign requested address bind failed

/etc/zookeeper/conf/zoo.cfg

server.1 to 0.0.0.0




