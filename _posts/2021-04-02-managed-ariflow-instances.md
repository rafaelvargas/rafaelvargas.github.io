---
layout: post
title: "Managed Airflow Instances"
subtitle: "Are they really worth it?"
tags: data-engineering
---

I've been reading about the managed Airflow instances solutions that some cloud service providers sell. Google, with its [Google Cloud Composer](https://cloud.google.com/composer/docs/concepts/overview) and Amazon, with its [Amazon Managed Workflows](https://aws.amazon.com/managed-workflows-for-apache-airflow/), are some of the examples. At first glance, they seem to look similar: both provide the benefits of not generating concerns about the maintenance of the infrastruture that runs the Airflow instances. But, are they really worth it?


## A brief explanation on Airflow

Let's start by explaining briefly what [Airflow](https://airflow.apache.org/) is: an open-source platform written in Python to schedule and monitor workflows. It has a scheduler, that spawns jobs locally or in distributed workers, using [Celery](https://docs.celeryproject.org/en/stable/) or [Kubernetes](https://kubernetes.io/), for example, to run tasks periodically. It also has a web server module, that basically provides an user interface to manage and monitor the workflows.

Its paradigm, that defines the worflows as code, by abstracting them using [DAGs](https://en.wikipedia.org/wiki/Directed_acyclic_graph), seems to be the most valuable characteristic from it. With this, we can properly track the modifications during the development of the workflows, and also be able to work simultaneuosly with other people on a worflow. Both of this tasks are difficult when using other solutions, specially the ones that provide an user interface for defining the worflows (see [SSIS](https://docs.microsoft.com/en-us/sql/integration-services/sql-server-integration-services), for example). Still, there are companies who have a different point of view on this topic, preferring the UI centric approches, and there are, indeed, good reasons for thinking this is a good alternative for some use cases (see [uWorc](https://eng.uber.com/no-code-workflow-orchestrator/), from Uber).

Well, fact is, since its first introduction, in 2014, by [Airbnb](https://airbnb.io/), it gained a lot of popularity across the data teams in companies.


## Managed Airflow instances advantages

As said earlier, an Airflow instance can be deployed in different ways. You could have it on an on-premise server (or cluster), depending on what are your necessities, or on cloud, using, again, just one server, or multiple nodes. Both options, though, imply that you have to maintain the infrastructure underlying it --- with different levels of management requirements, of course. That's where the managed instances comes in.

The managed instances, sold by the cloud providers, supply the benefit of not generating concerns about the management of the infrastructure to run the instances. The statement itself seems kind of attractive, because it would imply that the companies wouldn't have costs with [DevOps](https://en.wikipedia.org/wiki/DevOps). The managed instances also provide good [CI/CD](https://en.wikipedia.org/wiki/CI/CD) capabilities, which is great.

You can also easily scale your environment [horizontally](https://en.wikipedia.org/wiki/Scalability#Horizontal_(scale_out)_and_vertical_scaling_(scale_up)). The Amazon solution even provides an auto-scaling feature. The provisioning and management of the database that stores the metadata generated by the workflows is also done automatically.

## Managed Airflow instances disadvantages

The idea of focusing on business problems by using the managed instances is interesting. The idea, however, has some drawbacks, from my point of view. 

### Customization

Let's suppose you want to install a specific [ODBC](https://en.wikipedia.org/wiki/Open_Database_Connectivity) driver to connect with a database that is maintained by your company, to extract the data that is stored in it. You probally won't be able to do it, because you won't have control of the servers that are running the instances. 

Another possible limitation is that, if you want to write custom Airflow components, like a custom authentication backend, for example, you won't be able to do it as well.

### Cost

One of the most important aspects of the choice of using or not using these type of solutions is related to their cost. Let's analyse some price estimates, made at the moment this post is being written, for Amazon:

#### Amazon Managed Workflows

Considering a small size environment at the region US East (N. Virginia):

Specifications: 

- Scheduler: 1 vCPU
- Worker: 1 vCPU
- Web Server: 0.5 vCPU

Prices:

- Environment: 0.49 USD per hour
- Worker price: 0.055 USD
- Metadata storage: 0.10 USD per GB-Month

Supposing 9 additional workers are used for one hour a day, and 5GB of metadata being generated per month, we would have:

- Environment charge: 31 days * 24h * 0.49 USD = 364.56 USD
- Workers charge: 31 days * 1h * 0.055 USD * 9 workers = 15.34 USD
- Metadata storage: 5GB * 0.10 USD = 0.5 USD

**Total**: 380.40 USD


The source can be found in [here](https://aws.amazon.com/managed-workflows-for-apache-airflow/pricing/
). 
#### AWS EC2 Instances - Reservation Plan

As an alternative, considering the offered EC2 virtual machines at the region US East (N. Virginia):

Instance type: t3.large

Specifications:

- Operating system: Linux
- CPUs: 2 vCPUs
- Memory: 8GB
- EBS volume: 10GB (General Purpose SSD - gp2)


Cost estimates, supposing five of this type of instances and an one year reservation plan, we would have: 

ECS: (365 days * 24h * 0.0522 USD * 5 instances) / 12 months = 190.53 USD
EBS (Storage): 10 GB x 0.10 USD = 1.00 USD

**Total**: 191.53 USD


#### AWS EC2 Instances - On Demand

<u> Main instance (for the web server and the scheduler) </u>

Instance type: t3.large

Specifications:

- Operating system: Linux
- CPUs: 2 vCPUs
- Memory: 8GB

Charge: 31 days * 24h * 0.0832 USD = 60.74 USD

<u> Workers </u>

With the same specifications as the main one, using 5 workers, on demand, we would have:

Charge: 31 days * 1h * 0.0832 USD * 5 workers = 12.89 USD

Note that, in this case, the instance would need to be spinned up by the user, programmatically.

<u> Elastic Block Storage </u>

Charge: 10 GB x 0.10 USD = 1.00 USD


**Total**: 74.63 USD


The source can be found in [here](https://calculator.aws/#/createCalculator/EC2). 


## Final considerations

There's no right or wrong answers when choosing between the two alternative, but the drawbacks need to be considered. If your company or your team don't have the expertise (or time) to do the DevOps work, the managed instances could be the best choice, even if you would have to pay more. But if you not see the management of the underlying structures as a drawback, I would consider using virtual instances like the ones from [EC2](https://en.wikipedia.org/wiki/Amazon_Elastic_Compute_Cloud), for example.

