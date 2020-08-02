---
title: "Release Hadoop Cluster in Docker"
author: "Sporule"
date: "2020-04-18"
categories: "big data"
tags: "hadoop,hive,spark,airflow"
coverImage: "https://miro.medium.com/max/2760/1*kPKoXmHBDmGthbah-0549A.png"
---


After going through so many erros such as [Spark errors](https://www.sporule.com/items/spark-on-yarn-error-failed-to-send-rpc) and [Hive errors](https://www.sporule.com/items/hive-unable-to-instantiate-metastore-client), finally I managed to get it working.

This is the Hadoop image based on the [BDE's Hadoop Base](https://github.com/big-data-europe/docker-hadoop) and its relevant forks.

You can find the latest documentation on [Big Data Cluster in Git](https://github.com/sporule/big-data-cluster), [Big Data Cluster in Docker Hub](https://hub.docker.com/repository/docker/sporule/big-data-cluster)

## Quick Start

### Run the whole cluster

```bash
docker-compose up -d
```

### Run Individual Contaier

You can run individual container by using Docker command, please find more information and tutorial on Docker website. Please remember to pass environment variables to the Docker command. You can find the relevant environment variables in the *docker-compose.yml* file.


## Containers in Docker-Compose

| Nodes          | Amount |
| -------------- | ------ |
| Master         | 1      |
| Worker         | 2      |
| Hive-metastore | 1      |
| Dev            | 1      |

> You can flexibly change the amount of worker nodes and dev nodes, they will connect with master node automatically

## Configurations

### Hadoop and Hive Basic Configuration 
The configuration parameters can be specified in the **hadoop.env** file or as environmental variables for specific services (e.g. master-node, worker-node etc.):
```
  CORE_CONF_fs_defaultFS=hdfs://master-node:8020
```

CORE_CONF corresponds to core-site.xml. fs_defaultFS=hdfs://master-node:8020 will be transformed into:
```
  <property><name>fs.defaultFS</name><value>hdfs://master-node:8020</value></property>
```
To define dash inside a configuration parameter, use triple underscore, such as YARN_CONF_yarn_log___aggregation___enable=true (yarn-site.xml):
```
  <property><name>yarn.log-aggregation-enable</name><value>true</value></property>
```

The available configurations are:
* /etc/hadoop/core-site.xml CORE_CONF
* /etc/hadoop/hdfs-site.xml HDFS_CONF
* /etc/hadoop/yarn-site.xml YARN_CONF
* /etc/hadoop/httpfs-site.xml HTTPFS_CONF
* /etc/hadoop/kms-site.xml KMS_CONF
* /etc/hadoop/mapred-site.xml  MAPRED_CONF
* /opt/hive/conf/hive-site.xml HIVE_SITE_CONF
  
### Application On or Off Configuration

You can turn on or off some applications by using environment variables, **0** means on and **1** means off. You can update the environment variable in the **hadoop.env** file or inject it while starting the containers (through Docker command or docker-compose.yml). However, it is good to note that **hadoop.env** will have lower priority.
