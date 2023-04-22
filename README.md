# 🏗 Scaffold-ETH 2

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

## Contents

- [Requirements](#requirements)
- [Quickstart](#quickstart)
- [Deploying your Smart Contracts to a Live Network](#deploying-your-smart-contracts-to-a-live-network)
- [Deploying your NextJS App](#deploying-your-nextjs-app)
- [Disabling Type & Linting Error Checks](#disabling-type-and-linting-error-checks)
  - [Disabling commit checks](#disabling-commit-checks)
  - [Deploying to Vercel without any checks](#deploying-to-vercel-without-any-checks)
  - [Disabling Github Workflow](#disabling-github-workflow)
- [Contributing to Scaffold-ETH 2](#contributing-to-scaffold-eth-2)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Deploying your Smart Contracts to a Live Network

Once you are ready to deploy your smart contracts, there are a few things you need to adjust.

1. Select the network

By default, `yarn deploy` will deploy the contract to the local network. You can change the defaultNetwork in `packages/hardhat/hardhat.config.ts.` You could also simply run `yarn deploy --network target_network` to deploy to another network.

Check the `hardhat.config.ts` for the networks that are pre-configured. You can also add other network settings to the `hardhat.config.ts file`. Here are the [Alchemy docs](https://docs.alchemy.com/docs/how-to-add-alchemy-rpc-endpoints-to-metamask) for information on specific networks.

Example: To deploy the contract to the Sepolia network, run the command below:

```
yarn deploy --network sepolia
```

2. Generate a new account or add one to deploy the contract(s) from. Additionally you will need to add your Alchemy API key. Rename `.env.example` to `.env` and fill the required keys.

```
ALCHEMY_API_KEY="",
DEPLOYER_PRIVATE_KEY=""
```

The deployer account is the account that will deploy your contracts. Additionally, the deployer account will be used to execute any function calls that are part of your deployment script.

You can generate a random account / private key with `yarn generate` or add the private key of your crypto wallet. `yarn generate` will create a random account and add the DEPLOYER_PRIVATE_KEY to the .env file. You can check the generated account with `yarn account`.

3. Deploy your smart contract(s)

Run the command below to deploy the smart contract to the target network. Make sure to have some funds in your deployer account to pay for the transaction.

```
yarn deploy --network network_name
```

4. Verify your smart contract

You can verify your smart contract on Etherscan by running:

```
yarn verify --network network_name
```

## Deploying your NextJS App

Run `yarn vercel` and follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

**Make sure your `packages/nextjs/scaffold.config.ts` file has the values you need.**

**Hint**: We recommend connecting the project GitHub repo to Vercel so you the gets automatically deployed when pushing to `main`

## Hook Example

- [useScaffoldContractRead](#usescaffoldcontractread)
- [useScaffoldContractWrite](#usescaffoldcontractwrite)
- [useScaffoldEventSubscriber](#usescaffoldeventsubscriber)
- [useScaffoldEventHistory](#usescaffoldeventhistory)
- [useDeployedContractInfo](#usedeployedcontractinfo)
- [useScaffoldContract](#usescaffoldcontract)

### useScaffoldContractRead:

Use this hook to read a value from your deployed contracts.

```ts
const { data: totalCounter } = useScaffoldContractRead({
  contractName: "YourContract",
  functionName: "getGreeting",
  args: ["ARGUMENTS IF THE FUNCTION ACCEPTS ANY"],
});
```

### useScaffoldContractWrite:

Use this hook to write to your deployed contracts.

```ts
const { writeAsync, isLoading } = useScaffoldContractRead({
  contractName: "YourContract",
  functionName: "setGreeting",
  args: ["The value to set"],
  //value if the function is payable and sends eth to it
  value: "0.01",
});
```

### useScaffoldEventSubscriber:

Use this to listen for an event emitted in the deployed smart contracts.

```ts
useScaffoldEventSubscriber({
  contractName: "YourContract",
  eventName: "GreetingChange",
  //parameters that the event emits
  //event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  listener: (greetingSetter, newGreeting, premium, value) => {
    console.log(greetingSetter, newGreeting, premium, value);
  },
});
```

### useScaffoldEventHistory:

Use this hook to read events from a deployed contract

```ts
const {
  data: events,
  isLoading: isLoadingEvents,
  error: errorReadingEvents,
  } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "GreetingChange",
  fromBlock: //the block number to start reading events from,
  blockData: true,
  filters: //filters to be applied to the event (parameterName: value),
  transactionData: //if set to true it will return the transaction data for each event (default: false),
  receiptData: //if set to true it will return the receipt data for each event (default: false),
});
```

### useDeployedContractInfo:

Use this hook to get the matching contract info from the contracts file generated by yarn deploy

```ts
//contractName: name of the deployed contract
const { data: deployedContractData } = useDeployedContractInfo(contractName);
```

### useScaffoldContract:

Use to gets a deployed contract by contract name and returns a contract instance
Can also be use to read and write to the deployed smart contract

```ts
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
});
// will return the greeting and can be call in any function unlike useScaffoldContractRead
await yourContract?.greeting();

//can be use to write to a contract and can be called in any function
import { Signer } from "ethers";
import { useSigner } from "wagmi";

const { data: signer, isError, isLoading } = useSigner();
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
  signerOrProvider: signer as Signer,
});
const setGreeting = async () => {
  //call the method in any function
  await yourContract?.setGreeting("the greeting here");
};
```

## Disabling type and linting error checks

> **Hint**
> Typescript helps you catch errors at compile time, which can save time and improve code quality, but can be challenging for those who are new to the language or who are used to the more dynamic nature of JavaScript. Below are the steps to disable type & lint check at different levels

### Disabling commit checks

We run `pre-commit` [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) which lints the staged files and don't let you commit if there is an linting error.

To disable this, go to `.husky/pre-commit` file and comment out `yarn lint-staged --verbose`

```diff
- yarn lint-staged --verbose
+ # yarn lint-staged --verbose
```

### Deploying to Vercel without any checks

Vercel by default runs types and lint checks while developing `build` and deployment fails if there is a types or lint error.

To ignore types and lint error checks while deploying, use :

```shell
yarn vercel:yolo
```

### Disabling Github Workflow

We have github workflow setup checkout `.github/workflows/lint.yaml` which runs types and lint error checks every time code is **pushed** to `main` branch or **pull request** is made to `main` branch

To disable it, **delete `.github` directory**

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
# 🏗 scaffold-eth | 🏰 BuidlGuidl

## 🚩 Challenge 3: 🎲 Dice Game 

> 🎰 Randomness is tricky on a public deterministic blockchain. The block hash is an easy to use, but very weak form of randomness. This challenge will give you an example of a contract using block hash to create random numbers.  This randomness is exploitable.  Other, stronger forms of randomness include commit/reveal schemes, oracles, or VRF from Chainlink.

> 👍 One day soon, randomness will be built into the Ethereum protocol!

> 💬 Dice Game is a contract that allows users to roll the dice to try and win the prize.  If players roll either a 0, 1, or 2 they will win the current prize amount.  The initial prize is 10% of the contract's balance, which starts out at .05 Eth.  
 
> 🧤 Every time a player rolls the dice, they are required to send .002 Eth.  40 percent of this value is added to the current prize amount while the other 60 percent stays in the contract to fund future prizes.  Once a prize is won, the new prize amount is set to 10% of the total balance of the DiceGame contract. 
 
> 🧨 Your job is to attack the Dice Game contract!  You will create a new contract that will predict the randomness ahead of time and only roll the dice when you're guaranteed to be a winner!

> 💬 Meet other builders working on this challenge and get help in the [Challenge 3 telegram](https://t.me/+3StA0aBSArFjNjUx)!
 
---

### Checkpoint 0: 📦 install 📚

Want a fresh cloud environment? Click this to open a gitpod workspace, then skip to Checkpoint 1 after the tasks are complete.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/scaffold-eth/scaffold-eth-challenges/tree/challenge-3-dice-game)

```bash
git clone https://github.com/scaffold-eth/scaffold-eth-challenges.git challenge-3-dice-game
cd challenge-3-dice-game
git checkout challenge-3-dice-game
yarn install
```
---

### Checkpoint 1: 🔭 Environment 📺

You'll have three terminals up for:

```bash
yarn chain   (hardhat backend)
yarn start   (react app frontend)
yarn deploy  (to compile, deploy, and publish your contracts to the frontend)
```

> 👀 Visit your frontend at http://localhost:3000

> 👩‍💻 Rerun `yarn deploy --reset` whenever you want to deploy new contracts to the frontend.

---

### Checkpoint 2: 🎲 Dice Game

 🔍 Inspect the code in the `DiceGame.sol` contract in `packages/hardhat/contracts`

 🔒  You will not be changing any code in the DiceGame.sol contract in this challenge.  You will write your own contract to predict the outcome, then only roll the dice when it is favourable.

 💸 Grab some funds from the faucet and roll the dice a few times.  Watch the balance of the DiceGame contract in the Debug tab.  It increases on a failed roll and decreases by the prize amount on a successful roll. 

![image](https://user-images.githubusercontent.com/12072395/168866845-bfc07d54-4722-44a8-ae07-544e001ceeaa.png)


#### 🥅 Goals

- [ ] Track the solidity code to find out how the DiceGame contract is generating random numbers.
- [ ] Is it possible to predict the random number for any given roll?

---

### Checkpoint 3: 🔑 Rigged Contract

Start by creating a `receive()` function in the `RiggedRoll.sol` contract to allow it to receive Eth.  This will allow us to fund the RiggedRoll contract from the faucet which is required for our contract to call the rollTheDice() function.

Next add a `riggedRoll()` function. This function should predict the randomness of a roll, and if the outcome will be a winner, call `rollTheDice()` on the DiceGame contract.

 🃏 Predict the outcome by generating your random numbers in the exact same way as the DiceGame contract.

> 📣 Reminder!  Calling rollTheDice() will fail unless you send a message value of at least .002 Eth! [Here is one example of how to send value with a function call.](https://ethereum.stackexchange.com/questions/6665/call-contract-and-send-value-from-solidity)

🚀 To deploy your RiggedRoll contract, uncomment the appropriate lines in the `01_deploy_riggedRoll.js` file in `packages/hardhat/deploy`

❓ If you're struggling to get the exact same random number as the DiceGame contract, try adding some `console.log()` statements in both contracts to help you track the values.  These messages will appear in the Hardhat node terminal.

#### ⚔️ Side Quest

- [ ] Add a statement to require `address(this).balance >= .002 ether` in your riggedRoll function.  This will help prevent calling the rollTheDice() function without enough value.
- [ ] Uncomment the code in `App.jsx` to show a riggedRoll button and contract balance on the main UI tab.  Now you can test your function without switching tabs.
- [ ] Does your riggedRoll function only call rollTheDice() when it's going to be a winning roll?  What happens when it does call rollTheDice()?  


---

### Checkpoint 4: 💵 Where's my money?!?

You have beaten the game, but where is your money?  Since the RiggedRoll contract is the one calling `rollTheDice()`, that is where the prize money is being sent.  

📥 Create a `withdraw(address _addr, uint256 _amount)` function to allow you to send Eth from RiggedRoll to another address.

#### 🥅 Goals

- [ ] Can you send value from the riggedRoll contract to your front end address?
- [ ] Is anyone able to call the withdraw function?  What would be the downside to that?

#### ⚔️ Side Quest

- [ ] Lock the withdraw function so it can only be called by the owner.

> ⚠️ But wait, I am not the owner!  You will want to set your front end address as the owner in `01_deploy_riggedRoll.js`.  This will allow your front end address to call the withdraw function.

### Checkpoint 5: 💾 Deploy it! 🛰

📡 Edit the `defaultNetwork` in `packages/hardhat/hardhat.config.js`, as well as `targetNetwork` in `packages/react-app/src/App.jsx`, to [your choice of public EVM networks](https://ethereum.org/en/developers/docs/networks/)

👩‍🚀 You will want to run `yarn account` to see if you have a **deployer address**.

🔐 If you don't have one, run `yarn generate` to create a mnemonic and save it locally for deploying.

🛰 Use a faucet to fund your **deployer address** (run `yarn account` again to view balances)

> ⚠️ Make sure you fund your account with enough Eth! .05 is required to initially fund the DiceGame contract and .01 more is required to fund the riggedRoll contract.  Plus a bit extra to pay the gas.

 🚀 Run `yarn deploy` to deploy to your public network of choice (😅 wherever you can get ⛽️ gas)

🔬 Inspect the block explorer for the network you deployed to... make sure your contract is there.

---
### Checkpoint 6: 🚢 Ship it! 🚁

📦 Run `yarn build` to package up your frontend.

💽 Upload your app to surge with `yarn surge` (you could also `yarn s3` or maybe even `yarn ipfs`?)

>  😬 Windows users beware!  You may have to change the surge code in `packages/react-app/package.json` to just `"surge": "surge ./build",`

⚙ If you get a permissions error `yarn surge` again until you get a unique URL, or customize it in the command line.

🚔 Traffic to your url might break the [Infura](https://infura.io/) rate limit, edit your key: `constants.js` in `packages/react-app/src`

---

### Checkpoint 7: 📜 Contract Verification

Update the `apikey` in `packages/hardhat/package.json`. You can get your key [here](https://etherscan.io/myapikey).

> Now you are ready to run the `yarn verify --network your_network` command to verify your contracts on etherscan 🛰

Copy the verified address for your RiggedRoll contract and enter that into the appropriate Etherscan testnet.

---
