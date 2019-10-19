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