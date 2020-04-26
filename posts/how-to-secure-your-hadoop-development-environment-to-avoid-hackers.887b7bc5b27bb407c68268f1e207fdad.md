---
title: "How to secure your Hadoop Development Environment to avoid hackers"
author: "Sporule"
date: "2020-05-03"
categories: "big data"
tags: "hadoop,hive,spark,airflow,hacker,ddos"
coverImage: "https://i.imgur.com/3htUxaT.png"
---

## The Issue

As you probably remember, I built a Hadoop development environment as docker image with most of default settings, including default ports and credentials. The post is here [Release Hadoop Cluster In Docker](https://www.sporule.com/items/release-hadoop-cluster-in-docker).

As it is a development environment, especially is a docker environment, so I paid no attention to secure the environment. Recently, I noticed unusual jobs were submitted into my cluster (yarn) every minute. For example:

![hadoop-attack](https://i.imgur.com/mGtPFLz.png)

By looking into the logs, it looks like the "weird" jobs are trying to use wget to download some sort of malware to control my nodes. Potentially for bitcoin mining, DDOS attack or something else.


## Diagnose


- I checked my docker build files, all files and applications are from the official sources. **It is unlikely they will have malware inside my cluster**.
- I turned off all the ports from the cluster, no further unusual jobs were detected. **It means the jobs were submitted from outside (internet)**.
- I turned on the 8088 ports from the resources manager node (yarn), the unusual jobs reappeared immediately. Then I turned off 8088 ports but open all other ports, the unusual jobs disappeared. **It means the jobs were submitted to the  resources manager port 8088.**
- I have turned on all the ports but changed the domain name, the unusual jobs reappeared after few hours. **It means the attach was using some kind of scanning mechanism rather than targeting my machine intentionally.**

## Solution

As we are using the cluster as development environment, so we don't really want to spend much time on configuring the environment. Below there are two solutions that can help you quickly solve the issues.

 - Changing the default ports to something else. As the attack is a scanning attack, it is unlikely the hacker will try all the ports of the machine due to the cost.
 - Remove wget or curl software from your cluster. As the attack is running a bash script, they need to use wget, curl or other software to down the malware.
 - Don't expose the cluster to internet if it is not necessary

Obviously this won't defend all attacks in all scenarios, but it should be able to defend the scanning attacks.