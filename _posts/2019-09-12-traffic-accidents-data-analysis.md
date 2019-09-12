---
layout: post
title: "Traffic Accidents Data Analysis"
subtitle: "An analysis of Porto Alegre's traffic accidents data."
use_bokeh: true
---

Traffic accidents are a problem worldwide. According to the [World Health Organization](https://www.who.int/), at the end of 2018, traffic accidents were the major cause of death among young people aged 5-29 years. In the Americas, according to the [Pan American Health Organization](https://www.paho.org/), the numbers are as alarming as the worldwide ones, being the second major cause of deaths among the population of the same age group, only being lower than the number of homicide deaths. 

Given that problem and the idea of performing data analysis, I decided to look for some data about traffic accidents of my hometown: [Porto Alegre](https://en.wikipedia.org/wiki/Porto_Alegre). The dataset I found was hosted in the Porto Alegre's open data portal, which can be accessed [here](http://datapoa.com.br/). The records are from the years of 2000 to 2016.

To be able to have insights about the data, I created some data visualizations to be able to discuss about some possible interpretations of the obtained results. If you want to know how I manipulated the data and made these visualizations, go to [this](#technical-details) section.

## Accidents by year
{% include posts/traffic-accidents-data-analysis/accidents-by-year.js %}

Let's start with the number of accidents by each year. It's interesting to note that, in the year of 2010, there's a spike on the number of accidents, althought there is not much to assume about the possible causes of that spike. After that, a decrease in the number of accidents can be noted too. 

Considering these patterns, other indicators could be analysed to find possible correlations with these statistics, like the variation on the quantity of fuel sold, the variation on the number of registred vehicles in the city or even data about traffic safety campaigns that were conducted in the period, althought this one may be more difficult to obtain and analyse.    

## Fatal accidents by year
{% include posts/traffic-accidents-data-analysis/fatal-accidents-by-year.js %}

Proceeding, after analysing the graph of the number of fatal accidents in the period, we can clearly see that the pattern found earlier in the graph of the total number of accidents doesn't repeat in here. In fact, the spikes in this graph occur in years that the total number of accidents are lower than the other ones. Thus, not much can be obtained throught this result without a further analysis with other informations.

## Accidents with injured people by year
{% include posts/traffic-accidents-data-analysis/accidents-with-injured-by-year.js %}

The chart on the number accidents with injured people have shown to be a more significant step, since the patterns of growth of the obtained graph were similar to the patterns on the graph of the total number of accidents by year, with spikes on the same regions. This could indicate a possible correlation between the total number of accidents, and the accidents with injured people.

Given this, I decided to analyse the number of accidents in a more granular way, considering time slots and the days of the week that the accidents occured.

## Accidents by time slot in each year
{% include posts/traffic-accidents-data-analysis/accidents-by-hour-each-year.js %}

In this result, the most interesting detail that is shown in the most of the years is the fact that the number of accidents in each time slot exhibit a similar pattern, having spikes at 7 a.m. and 6 p.m., possibly due the increase of the traffic in these time slots, with people going to their jobs, and returning to their homes, respectively.

## Accidents by day of the week
{% include posts/traffic-accidents-data-analysis/accidents-by-day-of-the-week.js %}

In this chart, we can see that the number of accidents is greater during the work days. This seems to make sense, since there is a greater number of vehicles transiting in these days than during the weekend. Considering that, the propability of the occurance of an accident is greater.

After I have found this pattern, which considers all the accidents in the period, I decided to analyse the accidents that had fatal victims with the objective of finding some other interesting pattern. The result is shown next. 

## Fatal accidents by day of the week
{% include posts/traffic-accidents-data-analysis/fatal-accidents-by-day-of-the-week.js %}

Surprisingly, we can note that, even if the number of accidents was greater during the workdays, the number of fatal accidents have shown to be more frequent during the fridays and the weekends. 

This pattern seems to be caused by the fact that people are less cautious about traffic laws during this period. Furthermore, entertainment events tend to happen in this period, thus, problems like drinking and driving, for example, also tend to rise, which could be an important factor for the increase on the number of fatal accidents.

## Accidents with injured people by day of the week (2016)
{% include posts/traffic-accidents-data-analysis/accidents-by-time-each-day.js %} 

Given the increased number of fatal accidents in fridays and weekends, I decided to choose a year and analyse the number of accidents with injured people, considering the days of the week and the time that they occured. 

The results were, again, very interesting. In the weekend, the density on the number of dots, which represent each accident, are greater than the other days. This could be related to problems I have mentioned in the previous section. More precisely, the occurence of the accidents seems to be more uniformly distributed than in the work days, with an increased number of accidents the later night and the early morning.

## Possible future works

A **geographical information analysis** could be an useful analysis to do. The detection of regions in the city in which accidents are more frequent could be an important information for preventing the ocurrence of new ones. Since the dataset I used already provide latitude and longitude information for each accident, this future analysis could be done without too much effort. 

Another possible future work could be done by performing a **cross analysis with other datasets**, like datasets that have informations about the caractheristics of people that were involved in the accidents. This could be useful for detecting profiles of the people that were involved in these accidents, obtaining information that could be used in targeted campains for the prevention of the occurence of traffic accidents.

## Technical details

For making this analysis possible, I coded a set of scripts in [Python](https://en.wikipedia.org/wiki/Python_%28programming_language%29) for retriving, manipulating and visualizing the data. All of this can be found in [this repo](https://github.com/{{ site.author.github }}/traffic-accidents-analysis/).

### Data retriving
    
All the data was retrived from the open data portal from Porto Alegre. I used the [ckan](https://ckan.org/) API to retrieve data from each year, thus being easier to automatically download all the data that was analysed.  

### Data manipulation
    
After retriving the data, that was stored in CSV files, I read and manipulated them using the [Pandas](https://pandas.pydata.org/) package, that was very useful for obtaining the data that was used to plot the charts of the analysis.

### Data visualization

For the data visulization, I used the [Bokeh](https://bokeh.pydata.org/) package, which can be used for creating very interesting interactive charts. The charts were made with the intention of being seen in mobile devices too, although the obtained user experience may not be so optimal. 

All the charts were exported as Javascript code snippets, which could be easily included in this post.

{% include posts/traffic-accidents-data-analysis/plots_loader_script.js %}

### References

- Status of Road Safety in the Region of the Americas. Washington, D.C.: [Pan American Health Organization](https://www.paho.org/); 2019.
- Global status report on road safety. Geneva, Switzerland: [World Health Organization](https://www.who.int/); 2018.
- Datapoa. Porto Alegre, Brazil: [Prefeitura Municipal de Porto Alegre](https://prefeitura.poa.br); 2019.
