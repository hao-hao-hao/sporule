---
title: "Update Big Data Cluster Cluster in Docker"
author: "Sporule"
date: "2020-10-01"
categories: "big data"
tags: "hadoop,hive,spark,airflow"
coverImage: "https://miro.medium.com/max/2760/1*kPKoXmHBDmGthbah-0549A.png"
---

After few months of using the [cluster as development environment](release-hadoop-cluster-in-docker), I have made a big upgrade to finetune the performance.

This docker image is for development purpose, you should not use it for production without updating the configuration. I have modified some images and added some new features. 
You may find more information on [Sporule Blog](https://www.sporule.com) .

This project is in github : [sporule/big-data-cluster](https://github.com/sporule/big-data-cluster).
You can also find it from docker hub: [sporule/big-data-cluster](https://hub.docker.com/repository/docker/sporule/big-data-cluster/general).

## Changes

### 02/10/2020

- Upgraded to Debian 10
- Upgraded to OpenJDK 11
- Upgraded to Python 3.7.3
- Upgraded to Hadoop 3.3.0
- Upgraded to Hive 3.1.2
- Upgrade to Spark 3.0.1

### 01/10/2020

- Replaced Jupyter Lab with Jupyter Hub, you can login by using the linux credential in hadoop.env.

### 30/09/2020

- Updated the configuration file to tune the performance
- Added two environment variables relate to users in hadoop.env. You can use that to create users in dev-node with root and SSH login permission.
- Move Airflow to Master with landing-folder shared in dev nodes.
- Changed the default ports

### 12/08/2020

- Added Apache Livy with default port 8998 to dev-node
- Reduce the dev-node amount from 4 to 2

### 04/08/2020

- Upgraded Spark to 2.4.6 as the old version raised build error due to the repo issue
- Added NIFI in default port 8081
- Moved Airflow port to 8082

### 02/07/2020

- Changed Spark version to 2.4.5 as the old version raised build error due to the repo issue.
- Changed the hadoop environment setting and cluster setting to align with machine with 32GB RAM.
- Added Jupyter Lab with PySpark Support in dev nodes,you can now enable it by passing environment variable **JUPYTER=1**.  The default port 10110 is mapped to jupyter lab port 8080. The default token is sporule, you can change that in hadoop.env. Run findspark first before creating the spark context, examples below:

```bash
# In the docker-compose

  dev-node01:
    image: sporule/big-data-cluster:dev-node
    mem_limit: 480m
    container_name: dev-node01
    restart: always 
    ports:
      - "10022:22"
      - "10110:8080"
    volumes:
      - dev-node01_root:/root/
    environment:
        - AIRFLOW=0
        - JUPYTER=1
    env_file:
      - ./hadoop.env
    networks:
      - cluster

```

```python

# In the Jupyter Notebook

import findspark
findspark.init()

from pyspark import SparkContext, SparkConf
from pyspark.sql import SparkSession

conf = SparkConf().setAppName('Ingestion')
spark = SparkSession.builder.config(conf=conf).getOrCreate() # Spark session will be created in the kernel after this line

```

## Quick Start Guide

### Clone this Repo

```bash
git clone https://github.com/sporule/big-data-cluster
cd big-data-cluster/
```

### Run the whole cluster

```bash
docker-compose up -d
```

### Run Individual Contaier

You can run individual container by using Docker command, please find more information and tutorial on Docker website. Please remember to pass environment variables to the Docker command. You can find the relevant environment variables in the *docker-compose.yml* file.
