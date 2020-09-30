---
title: "Update Big Data Cluster Cluster in Docker"
author: "Sporule"
date: "2020-10-01"
categories: "big data"
tags: "hadoop,hive,spark,airflow"
coverImage: "https://miro.medium.com/max/2760/1*kPKoXmHBDmGthbah-0549A.png"
---

After few months of using the cluster as development environment, I have made some updates to finetune the performance.

# Big Data Cluster

This is the Hadoop image based on the [BDE's Hadoop Base](https://github.com/big-data-europe/docker-hadoop) and its relevant forks.

This docker image is for development purpose, you should not use it for production without updating the configuration. I have modified some images and added some new features. 
You may find more information on [Sporule Blog](https://www.sporule.com) .

## Changes

## 30/09/2020

- Updated the configuration file to tune the performance
- Added two environment variables relate to users in hadoop.env. You can use that to create users in dev-node with root and SSH login permission.
- Move Airflow to Master with landing-folder shared in dev nodes.
- Changed the default ports

## 12/08/2020

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