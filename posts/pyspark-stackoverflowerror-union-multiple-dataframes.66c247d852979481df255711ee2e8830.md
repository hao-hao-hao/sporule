---
title: "PySpark StackOverFlowError - Union Multiple Dataframes "
author: "Sporule"
date: "2020/11/13"
categories: "Big Data"
tags: "spark, hadoop, yarn, pyspark,StackOverflowError,java"
coverImage: "https://www.scnsoft.com/blog-pictures/business-intelligence/big-data-quality-01_1.png"
---


## Problem

I was generating some test data from existing dataset by using pyspark. The approach I used was:

1. Loading existing data to a dataframe
2. Do some random data manupulation, such as changing timestamp to random timestamp.
3. Repeat the 2nd process 1000 times
4. Use Union to join the dataframes together

This is the code:

```python

source_df = spark.sql("select * from test.master")
dfs = []
for x in range(0,1000):
  dfs.append(source_df.withColumn("timestamp",F.current_timestamp()-F.expr('INTERVAL '+str(random.randrange(1,800000))+' MINUTES')))

df = reduce(DataFrame.union, dfs)
df.write.mode('append').format("parquet").partitionBy("reporting_date").option("path", outputUri).save()

```

As a result, I received the Java StackOverflowError below:


```bash

Traceback (most recent call last):
  File "/tmp/3513e285873245068570fabb8e0e2898/generate-data.py", line 187, in <module>
    df.write.mode('append').format("parquet").partitionBy("reporting_date").option("path", outputUri).save()
  File "/usr/lib/spark/python/lib/pyspark.zip/pyspark/sql/readwriter.py", line 737, in save
  File "/usr/lib/spark/python/lib/py4j-0.10.7-src.zip/py4j/java_gateway.py", line 1257, in __call__
  File "/usr/lib/spark/python/lib/pyspark.zip/pyspark/sql/utils.py", line 63, in deco
  File "/usr/lib/spark/python/lib/py4j-0.10.7-src.zip/py4j/protocol.py", line 328, in get_return_value
py4j.protocol.Py4JJavaError: An error occurred while calling o8683.save.
: java.lang.StackOverflowError
	at scala.collection.Iterator$$anon$11.hasNext(Iterator.scala:488)
	at scala.collection.Iterator$$anon$11.hasNext(Iterator.scala:489)
	at scala.collection.Iterator$$anon$11.hasNext(Iterator.scala:489)
	at scala.collection.Iterator$$anon$11.hasNext(Iterator.scala:489)
	at scala.collection.Iterator$$anon$11.hasNext(Iterator.scala:489)

```

## Solution

This error message is a very old school error message as I haven't seen it for long long time, so the first feeling for me is that is my "childhood" !
I went into the pyspark execution plan to understand what happened by using df.explain(), it prints out all the unions operations are nested with each other.
The operation of going to each level of the unions is probably the wrong approach, I was expecting spark can handle this automatically but spark didn't.
The solution is straightforward, we can use RDD to make all the unions to the same level.

The Solution:

```python

source_df = spark.sql("select * from test.master")
dfs = []
for x in range(0,1000):
  dfs.append(source_df.withColumn("timestamp",F.current_timestamp()-F.expr('INTERVAL '+str(random.randrange(1,800000))+' MINUTES')))

df = spark.sparkContext.union([df.rdd for df in dfs]).toDF() # Union the RDDs then convert back to df
df.write.mode('append').format("parquet").partitionBy("reporting_date").option("path", outputUri).save()

```
