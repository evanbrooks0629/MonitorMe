# MonitorMe
A web app I created in a solo hackathon that solves the problem of buying hard-to-get products through various online retailers

## Inspiration
I had been interested in the monitoring of products online since the start of covid when certain items would randomly drop in price only to get quickly snagged by customers. If only there was a way to help know when those products would drop in price...I knew what I had to do.

## What it does
MonitorMe tracks prices on several hand-selected websites as well as any other website you would like. This has a clean UI to show the user their current active or silent monitors. The user also has the ability to add a website and add a monitor. In the background, the web application checks the websites to track for a decrease in price and notifies the user about it via a discord bot.

## How we built it
This was built using a react application built within an express server. Since I was drawing data from websites outside the domain, I needed to communicate with an api to reroute the requests. I also had to use it as a way to store json files locally to track the user's current monitors and websites. Linking the web application in this manner was a totally new experience for me.

## Challenges we ran into
It was extremely tough managing routing data every second through an api. The app sometimes lags when being switched between active and silent. Another issue was figuring out how to keep track of all the different api endpoints I had for different things.

## Accomplishments that we're proud of
I had tried to request data from other domains outside of a react app before and I had always run into errors. Only during this project did I finally understand a lot about using react and express together to access more data. I also created a product that people would potentially buy. It does work, and it has the potential to save people a ton of money, or even make money.

## What we learned
I learned a lot about express and apis. Designing the front end was easy but time consuming, where as dealing with the backend was pretty frustrating.

## What's next for MonitorMe
I hope to create a larger system to hold users and run their monitors on a large server. That starts with hosting this for myself on Heroku or something so I can play around with having it run forever.
