---
title: "Deploy Hadoop Cluster Through Docker"
author: "Sporule"
date: ""
categories: ""
tags: ""
coverImage:""
---

## Components

| Components       | Version | Included |
| ---------------- | ------- | -------- |
| Apache Accumulo  | 1.7.0   |          |
| Apache Atlas     | 1.1.0   |          |
| Apache Calcite   | 1.16.0  |          |
| Apache DataFu    | 1.3.0   |          |
| Apache Druid     | 0.12.1  |          |
| Apache Hadoop    | 3.1.1   | Y        |
| Apache HBase     | 2.0.2   |          |
| Apache Hive      | 3.1.0   | Y        |
| Apache Kafka     | 2.0.0   |          |
| Apache Knox      | 1.0.0   |          |
| Apache Livy      | 0.5.0   |          |
| Apache Oozie     | 4.3.1   |          |
| Apache Phoenix   | 5.0.0   |          |
| Apache Pig       | 0.16.0  |          |
| Apache Ranger    | 1.2.0   |          |
| Apache Spark     | 2.3.2   |          |
| Apache Sqoop     | 1.4.7   |          |
| Apache Storm     | 1.2.1   |          |
| Apache TEZ       | 0.9.1   |          |
| Apache Zeppelin  | 0.8.0   |          |
| Apache ZooKeeper | 3.4.6   |          |

## Containers

| Nodes                  | Amount |
| ---------------------- | ------ |
| Name Node              | 1      |
| Resources Manager Node | 1      |
| History Node           | 1      |
| Data Node              | 2      |
| Node Manager           | 2      |

## Tools Installation

### Docker

[The Official Guide](https://docs.docker.com/install/linux/docker-ce/debian/#install-using-the-convenience-script)

``` bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

<output truncated>
```

### Docker Compose

[The Official Guide](https://docs.docker.com/compose/install/#install-compose-on-linux-systems)

``` bash
sudo apt install curl
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Git

``` bash
sudo apt install git
```

## Setup Hadoop

Get latest docker codes for Hadoop from [Big Data Europe - Hadoop](https://github.com/big-data-europe/docker-hadoop)

``` bash
git clone https://github.com/big-data-europe/docker-hadoop
```

Follow the guide in the github page to spin up the hadoop cluster, it will spin up Hadoop with nodes by using **docker-compose.yml** file

``` bash
docker-compose up
```

``` bash
# daemon mode
docker-compose up -d
```

