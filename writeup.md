
## Inspiration

We began our project intending to make a complete proof generator that encompasses all the sentential logic rules, is able to use those rules, and will provide step-by-step citations of those rules. We were inspired by

## What it does

Our code first takes premises and a conclusion as inputs in standard sentential logic syntax. Then using a recursive branching approach, it generates a set of valid sentences and pieces together the conclusion. When the conclusion is detected in the set of valid sentences, the algorithm then generates a proof history that records each step it has taken, specifically the sentential logic rule cited, the input sentences used, and resulting sentence derived. This proof history is then sent to be displayed on our website.

## How we built it

We built this project as a full stack webapp. Our frontend website is written using React, and is hosted using AWS Amplify. Our backend is an AWS Lambda function, which AWS API Gateway exposes in an endpoint that we make POST requests to from the frontend.

AWS Amplify helps us manage the entire stack and keep things wrapped up nicely. This includes our hosting environment (read server) for our React website, our AWS Lambda function, and AWS API Gateway.

## Challenges we ran into

Out the innumerable bugs that we ran into while setting up and implementing the front and backend, there are a few that stand out.

- There was a nasty issue with AWS CLI, where their Amplify toolchain didn't work in certain instances with Windows 11. We had to get our code on a different machine via Github, install NodeJS, AWS CLI, and the Amplify toolchain, and try again.

- In the solving algorithm, we encountered problems of possible infinite branches. There are a number of rules in sentential logic that can be applied anytime and can result in an infinite number of valid sentences at each given point. We decided to not implement that rule for now. We have brainstormed a possible approach starting from both the given premises and the conclusion to eliminate possible branches and keep the solving portion of the algorithm manageable.

## Accomplishments that we're proud of

We are very proud that we at least have a working product, and that we were able to pull this together, even though some of the technology that we used was new to us.

## What we learned

We learnt how to use React, AWS Amplify, AWS Lambda, AWS CLI, and AWS API Gateway during this competition. We also read many papers on general automated theorem proving in a bid to find ideas pertaining to our application.

## What's next for Mimir

We plan to implement more rules of sentential logic. We have managed to cover half of the rules in sentential logic and we plan on also implementing the inference and replacement rules. In the far future, we hope to build a proof algorithm for quantificational logic and perhaps even modal logic one day.
