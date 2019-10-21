---
title: "Build an Amazon Alexa Skills in 10 Minutes and Get Free Echo"
author: "Sporule"
date: "2019-10-20"
categories: "code"
tags: "amazon,echo,alexa"
---

## Background

This guide is going to show you how to build an Amazon Alexa Skills in 10 minutes by using python, aws and an information api.

In addition, Amazon is currently running a promotion for giving out Echo for free. In summary:

- Publish your very first, new Alexa skill during the promotion period and earn an Amazon Echo Dot.
- Publish three new Alexa skills during the promotion period, where one of them is used by at least 75 unique users during the promotion period, and earn an Echo Show 5 voucher.
- Add the Alexa Presentation Language to one of your skills (newly published or updated) during the promotion period and reach at least 150 unique users during the promotion period, and you will earn an Amazon Echo Show.

Find more details [here](https://developer.amazon.com/en-GB/alexa/alexa-skills-kit/alexa-developer-skill-promotion)


## What is the final product look like

To see what the final product look like, you will need to download the Alexa app and enable the skill [**Joke Teller**](https://www.amazon.co.uk/dp/B07ZCVCK8F/ref=sr_1_3?keywords=joke+teller&qid=1571692557&s=digital-skills&sr=1-3)

![20191021221611.png](https://i.imgur.com/zt5JIa3.png)

To Test it, simply say:

- 'Alexa, ask joke teller to tell me a joke'
- 'Alexa, ask joke teller to give me something fun'

It will return you a random joke.

## Prerequisite Knowledge

- Good understand on English
- Good knowledge on using a web browser (Chrome, Safari or Firefox)

## Guideline

### Pick an API you want to use

Go through the API list in [this link](https://www.programmableweb.com/category/humor/api), I will suggest to start from a simple api that returns a sequence.
I have picked the [icanhazdadjoke](https://icanhazdadjoke.com/api) api which will randomly return a joke, so my app name will be joke teller.

### Register an Amazon developer account

Click [this link](https://developer.amazon.com/alexa/console/ask) for registration, fill in required information.
You can use your Amazon account to log in.

### Create your first skill

After login to your development account ,go to [this link](https://developer.amazon.com/alexa/console/ask).

You will see something like this, click Create Skill:

![20191021213921.png](https://i.imgur.com/B6dOjzA.png)

Fill in the required information:
- The name of your skill
- Use Custom Model to build the skill
- Use Alexa-Hosted(Python) as backend resources which is free in the AWS

![20191021214205.png](https://i.imgur.com/6GQvQ5f.png)

Now you need to set up your Invocation name, which is the name that will active your skill. The name I used here is "joke teller"

![20191021215011.png](https://i.imgur.com/IzYaZ1K.png)

After setting the Invocation name, we will need to set up the Intent. Add a new intent with a name. I used the name joke. Intent is something that will response the user's query. As we are only building a simple skill, so we only have one intent without any slots. Examples intent:

- Give me some fun
- Make me laugh

![20191021215141.png](https://i.imgur.com/xjre1Ol.png)

After adding few intents, you need to click save model and then build model.

![20191021215637.png](https://i.imgur.com/P06svRf.png)

Congratulations, you are almost there.

Now go to Code section -> Open lambda_function, and copy and paste below code to an empty space, change the "joke" to the name of  your intent:

```python
class jokeIntentHandler(AbstractRequestHandler):
    """Handler for shouldI."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return ask_utils.is_intent_name("joke")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        speak_output =  requests.get("https://icanhazdadjoke.com/", headers={"Accept":"text/plain"}).text
        return (
            handler_input.response_builder
                .speak(speak_output)
                # .ask("add a reprompt if you want to keep the session open for the user to respond")
                .response
        )
```

This code basically returns a random joke by calling the joke api we just pciked.

![20191021215925.png](https://i.imgur.com/0EV8K5S.png)

It is also worth changing any wording you want to change, I believe you can understand this easily.

![20191021220236.png](https://i.imgur.com/X4WCsZF.png)

Finally, add below code at the end of the section, then click Save and Deploy

```python

sb.add_request_handler(jokeIntentHandler())

```

![20191021220407.png](https://i.imgur.com/FSMwb8V.png)


You can now test your skill in the test tab to make sure it works.
In my scenario, I can say:

> "ask joke teller to make me laugh"

![20191021220729.png](https://i.imgur.com/Bv6xBge.png)


### Publish Your Skill

Now we can start to publish our skill, go to distribution and fill the basic information.

![20191021220849.png](https://i.imgur.com/MvyIGkN.png)

One thing needs to be careful is the Example Phrases, you will need to make sure the example phrases are in your intent. For example if your intents are:

- Give me some fun
- Make me laugh

Then your example phrases can be one or both of below:

- Alexa, ask joke teller to make me laugh
- Alexa, ask joke teller to make me laugh

Save and Continue when everything is ready, you will also need to fill in both Privacy Section and Availability.

Please use the same example phrases as testing instructions in Privacy Section.

![20191021221836.png](https://i.imgur.com/x7R431B.png)

Go to Certification after completing the whole distribution section, Run both Validation Test and Functional test to make sure everything is OK.

![20191021221247.png](https://i.imgur.com/MLCblI5.png)

And then go to Submission to Submit the skill, you skill will be in the Alexa Skill store after few days.

![20191021221330.png](https://i.imgur.com/tWJqbt1.png)

## Summary

As you can see it is very simple to create the simple skill, you can be flexible on any of the API to make your skill more fun. According to the terms, you will receive your echo dot in 60 days.
