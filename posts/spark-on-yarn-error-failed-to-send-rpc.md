---
title: "Spark On Yarn Error - Faild to send RPC "
author: "Sporule"
date: "2020/04/05"
categories: "Big Data"
tags: "spark, hadoop, yarn, docker"
coverImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/1920px-Apache_Spark_logo.svg.png"
---


## Problem

I am new to the big data world, and I am trying to build a Hadoop cluster by using docker. The spark shell did not work with the error message below:


```bash

Failed to send RPC 4858956348523471318 to /10.20.42.194:54288: java.nio.channels.ClosedChannelException

cluster.YarnSchedulerBackend$YarnSchedulerEndpoint: Sending RequestExecutors(0,0,Map()) to AM was unsuccessful

```

## Diagnose

The problem looks like it can't connect to the ip address, so I start with testing the connection between spark to the ip address.
The ping went through without problems.

Then I look at yarn to see if I can find any logs there, I discovered the error messages below:

```bash

Application application_1586040841405_0002 failed 2 times due to AM Container for appattempt_1586040841405_0002_000002 exited with exitCode: -103
Failing this attempt.Diagnostics: [2020-04-04 22:56:04.466]Container [pid=648,containerID=container_e08_1586040841405_0002_02_000001] is running 71436800B beyond the 'VIRTUAL' memory limit. Current usage: 260.6 MB of 1 GB physical memory used; 2.2 GB of 2.1 GB virtual memory used. Killing container.
Dump of the process-tree for container_e08_1586040841405_0002_02_000001 :
|- PID PPID PGRPID SESSID CMD_NAME USER_MODE_TIME(MILLIS) SYSTEM_TIME(MILLIS) VMEM_USAGE(BYTES) RSSMEM_USAGE(PAGES) FULL_CMD_LINE
|- 657 648 648 648 (java) 598 146 2305732608 66012 /usr/lib/jvm/java-8-openjdk-amd64//bin/java -server -Xmx512m -Djava.io.tmpdir=/tmp/hadoop-root/nm-local-dir/usercache/root/appcache/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001/tmp -Dspark.yarn.app.container.log.dir=/opt/hadoop-3.1.1/logs/userlogs/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001 org.apache.spark.deploy.yarn.ExecutorLauncher --arg a7dc3af52bc9:37231 --properties-file /tmp/hadoop-root/nm-local-dir/usercache/root/appcache/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001/__spark_conf__/__spark_conf__.properties
|- 648 646 648 648 (bash) 0 0 20561920 698 /bin/bash -c /usr/lib/jvm/java-8-openjdk-amd64//bin/java -server -Xmx512m -Djava.io.tmpdir=/tmp/hadoop-root/nm-local-dir/usercache/root/appcache/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001/tmp -Dspark.yarn.app.container.log.dir=/opt/hadoop-3.1.1/logs/userlogs/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001 org.apache.spark.deploy.yarn.ExecutorLauncher --arg 'a7dc3af52bc9:37231' --properties-file /tmp/hadoop-root/nm-local-dir/usercache/root/appcache/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001/__spark_conf__/__spark_conf__.properties 1> /opt/hadoop-3.1.1/logs/userlogs/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001/stdout 2> /opt/hadoop-3.1.1/logs/userlogs/application_1586040841405_0002/container_e08_1586040841405_0002_02_000001/stderr
[2020-04-04 22:56:04.519]Container killed on request. Exit code is 143
[2020-04-04 22:56:04.549]Container exited with a non-zero exit code 143.
For more detailed output, check the application tracking page: http://historyserver:8188/applicationhistory/app/application_1586040841405_0002 Then click on links to logs of each attempt.
. Failing the application.

```

It looks obvious that the beyond virtual memory error message, as I don't have much knowledge about this so I googled it and found two posts from stackoverflow, and the solution is obvious:

```bash

https://stackoverflow.com/questions/54780656/spark-on-yarn-failed-to-send-rpc-and-slave-lost


https://stackoverflow.com/questions/43262836/apache-spark-running-spark-shell-on-yarn-error

```

## Solution

The container was killed because the usage of memory exceeds the virtual memory and physical memory threshold. The solution is to change the ratio.
The ratio is in yarn-site.xml configuration file, the name is yarn.nodemanager.vmem-pmem-ratio. The default value is 2.1 so we just need to change it to higher.
What is the side affect of increasing this ratio? I didn't spend time to research but I guess the cluster will have resources allocation problems in the future. I will update this post if that is the case.
