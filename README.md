# Instareact ![img](https://github.com/ingochris/lahacks2018/raw/master/assets/instareact-small-25.png)

Hands-free Instagram browsing. Instareact scrolls your Instagram feed and sends likes (and more reactions!) based on your facial reaction to each post. 

## Inspiration

We wanted to create an application that revolutionizes the way we like photos by automatically reacting the way you actually do.

## How is this possible?

It automatically scrolls through your feed one photo at a time and takes a picture of your reaction to each photo using your front facing camera. From there, it processes that photo using Google Cloud Vision API to detect the likelihood of joy in your face. Based on that, it gives the photo a certain amount of likes and displays an icon depending on whether you were neutral, happy, or very happy.

We used React Native to develop the application so that it works on both Android and iOS devices. That also allowed us to use the camera and automatically scroll. On top of that, we used Google Cloud Vision API to process the pictures taken and perform different actions based on the response.

## Challenges

We had to adjust to some of the quirks of React Native as there is a bit of a learning curve. Certain things like accessing the camera and passing information between components was tricky. On top of that, integrating GCP to the front end framework took some work as well.

## Accomplishments that I'm proud of

Using React Native effectively with external APIs and many asynchronous calls.

## What I learned

How to better use props and state in React, Javascript Promises using async/await, and Google Cloud API integration into a mobile app.

## What's next for InstaReact

Replacing Instagram.
