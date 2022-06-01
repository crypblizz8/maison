# Privy Quickstart Project

This sample Next.js project is designed to help you hit the ground running with Privy's API. To run this project, you'll need the following:

* A MetaMask account and the [MetaMask browser extension](https://metamask.io/download/) 🦊. 
* A Privy account. Email hi@privy.io if you don't have one yet. 

You can check out [a running version of the quickstart](https://demos.privy.io/quickstart).

## Setting up the Privy Schema

In this sample project, we will collect two simple pieces of user data: their name and their favorite color. In your Privy console, create two fields: 
- `first-name`
- `fav-color`

For both, give read and write permissions to the "Self" and "Admin" roles. 

## Get your Privy API Keys 🔑

Head over to the "API Settings" section of the console. If you don't already have a Privy API key, hit "Roll Keys" to generate a new pair. We don't need the API secret for this demo, but if you anticipate needing it later, copy down the API secret somewhere safe. If you lose it you'll have to generate a new API key.

Create a `.env.local` file in this repository copied from `.env.local.example` and replace the TODO with your API key from the console.

```
NEXT_PUBLIC_PRIVY_API_KEY=TODO
```

## Build and run the dev server ⚒️

That's it! You're ready to build and run the sample project. Run `npm install` to install the project dependencies. Then, use `npm run dev` to run the development server. 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Troubleshooting

**My app fails to start because of a Next.js `SWC binary` issue**
- Delete the `package-lock.json` file and `the node_modules` directory in your project
- Run `npm install` again and try restarting your app.

## Use the app! 

In your browser, you should see a "Connect with MetaMask" button. Go ahead and sign in with MetaMask. Once you do, you'll see a simple page that asks for your name and favorite color.

Once you submit that information, head over to the "View Data" section of the Privy console. You'll see that the data has been added! 

Back in your browser, you'll also see that if you submitted a valid color, the app background has been personalized to that color. Now, even if you stop the dev server and re-run it, logging in with the same MetaMask account will fetch these preferences from Privy and personalize the app.

![ezgif-5-c93ee556b6](https://user-images.githubusercontent.com/3359083/163305647-51d5efb8-dd6c-4a40-ae10-e321729775fc.gif)

## Poke around the code 🤓

Feel free to mess around and experiment! There are two files that are relevant:
* pages/index.js -- contains the front-end code
* .env.local -- has your Privy API key
