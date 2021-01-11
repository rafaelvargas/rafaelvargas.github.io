---
layout: post
title: "Managed Airflow Instances"
subtitle: "Are they really worth it?"
---

I've been reading about the managed Airflow instances solutions that some cloud service providers sell. Google, with its [Google Cloud Composer](https://cloud.google.com/composer/docs/concepts/overview) and Amazon, with its [Amazon Managed Workflows](https://aws.amazon.com/managed-workflows-for-apache-airflow/), are some of the examples. At first glance, they seem to look similar: both provide the benefits of not generating concerns about the management of the infrastruture that runs the Airflow instances. But, are they really worth it?


## A brief explanation on Airflow

Let's start by explaining briefly what Airflow is: it's an open-source platform written in Python to schedule and monitor workflows. It has a scheduler, that spawns jobs locally or in distributed workers, using [Celery](https://docs.celeryproject.org/en/stable/) or [Kubernetes](https://kubernetes.io/), for example, to run tasks periodically. It also has a web server module, that basically provides an user interface to manage and monitor the workflows.

Its paradigm, that defines the worflows as code, by abstracting it using [DAGs](https://en.wikipedia.org/wiki/Directed_acyclic_graph), seems to be the most valuable characteristic from it. With this, we can track modifications during the development of the workflows properlly, and also be able to work in with a team, for example, on a worflow. Both of this tasks are difficult when using other platforms, specially the ones that provide an user interface for defining the worflows (see [SSIS](https://docs.microsoft.com/en-us/sql/integration-services/sql-server-integration-services), for example). Still, there are companies who have a different point of view on that (see [uWorc](https://eng.uber.com/no-code-workflow-orchestrator/), from Uber). Well, fact is, since its first introduction, in 2014, by [Airbnb](https://airbnb.io/), it gained a lot of popularity across the data teams in companies.


## Managed Airflow instances advantages

As said earlier, an Airflow instance can be deployed in different ways. You could have it on an on-premise server (or cluster), depending on what are your necessities, or on cloud, using, again, just one server, or multiple nodes. Both options, though, imply that you have to maintain the infrastructure underlying it. That's where the managed instances comes in.

The managed instances sold by the cloud providers supply the benefit of not generating concerns about the management of the infrastructure to run the instances. The statement itself seems kind of attractive, because it would imply that the company wouldn't have much costs with [DevOps](https://en.wikipedia.org/wiki/DevOps).

The managed instances also provide good [CI/CD](https://en.wikipedia.org/wiki/CI/CD) capabilities.