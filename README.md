# Maison - Decentralized Vercel
![MS](https://user-images.githubusercontent.com/45455218/180645049-22ed294b-badc-4be6-884b-9b7061e852e3.png)

For ETHCC 2022 Hack. <br/>
Creating a toolkit to deploy immutable frontends on IPFS.<br/>
Take Decentralized Front ends cool.<br/>

## ENV 🔑
Need a Privy.io KEY for the DB Push

Create a `.env.local` file in this repository copied from `.env.local.example` and replace the TODO with your API key from the console.

```
NEXT_PUBLIC_PRIVY_API_KEY=TODO
```

## Build and run the dev server ⚒️

`yarn` + `yarn dev` 

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Future / ToDo List 🔑
- Fix ENS SetContentHash
- Add Build folder
- Create an container / VM to handle the builds on a server
- IPFS Hash pin through Pinata instead of Alchemy

## Other future integration considerations
- Ceramic
- ARWeave