---
title: 'Docker Image - exec user process caused "exec format error"'
author: "Sporule"
date: "2020-04-26"
categories: "docker"
tags: "docker,bash,error,shebang"
---

## The Problem

I built a linux [dev box docker image](https://github.com/hao-hao-hao/dev-box) with some necessary run time environments such as go and python, but it didn't run and raised the error message **exec user process caused "exec format error"**.

## The Cause

I spent more than an hour to find the solution as nothing looks wrong for me. I have tried different docker image build options but no luck.
At the end, I was removing differnt parts of the Dockerfile to identify the problem.

Finally I discovered the error message disappeared after I passing commands directly rather than using the **run.sh** in the DockerFile. 

So the problem is actually from the **run.sh** file, and I forgot to put the [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)).

## The Solution

Put the bash shebang at the beginning of the file and the problem is resolved, so simple.

> Old "run.sh":
> 
```bash
# Start SSH
service ssh restart && bash

tail -f /dev/null
```

> New "run.sh":

```bash

#!/bin/bash

# Start SSH
service ssh restart && bash

tail -f /dev/null

```
