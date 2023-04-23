## 🚩 Challenge 8: Diamond Challenge - Crowdfunding 💎

> 🎰 Smart contract development can get quite complex if you have a lot of contract logic to maintain. The Diamond standard (EIP-2535) makes it easy to modularize and efficiently upgrade and manage your smart contracts.

> We believe that at some point Diamonds will be standarized and used in different kinds of applications i.e. Smart Contract Wallets ERC4337

> Crowdfunding contracts have different features and there are many implementations out there, in this Challenge you will write your own Crowdfunding system using diamonds, you will run into some problems where diamonds and facets will become handy and hopefully you get a better understanding of how this standard works

> We will start with a basic crowdfunding contract that allows users to contribute and the owner to claim the funds any time they want.

> 😱 Seems like contributors will never be able to get their money back, your role is to fix this and set up some conditions and add some functionalities to your crowdfunding contract.

> 💬 Meet other builders working on this challenge and get help in the [Challenge 8 telegram](https://t.me/+3StA0aBSArFjNjUx)!

---

### Checkpoint -1 : 📦 install 📚

Want a fresh cloud environment? Click this to open a gitpod workspace, then skip to Checkpoint 1 after the tasks are complete.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/scaffold-eth/scaffold-eth-challenges/tree/challenge-3-dice-game)

```bash
git clone https://github.com/scaffold-eth/scaffold-eth-challenges.git challenge-3-dice-game
cd challenge-3-dice-game
git checkout challenge-3-dice-game
yarn install
```

---

### Checkpoint 0: 🔭 Environment 📺

You'll have three terminals up for:

```bash
yarn chain   (hardhat backend)
yarn start   (react app frontend)
yarn deploy  (to compile, deploy, and publish your contracts to the frontend)
```

> 👀 Visit your frontend at http://localhost:3000

> **IMPORTANT**👩‍💻 Rerun `yarn deploy --reset` whenever you want to deploy new contracts to the frontend.

**NOTE**

> This will setup a basic Crowdfunding Diamond that only allows users to `contribute` and the owner to `claim`.

---

### Checkpoint 1: 💸 Contribute some ETH

🔍 Inspect the code in the `MainFacet` contract in `packages/hardhat/contracts/facets`

🔍 Inspect the code in the `CrowdFundDiamondInit` contract in `packages/hardhat/contracts`

💸 Grab some funds from the faucet and try sending some ETH to the crowdfunding

![image](https://user-images.githubusercontent.com/12072395/168866845-bfc07d54-4722-44a8-ae07-544e001ceeaa.png)

> Let's start by sending 1 ETH

> > Can you guess why is this happening ?

> > This wont work so your **TASK 1** is to change the minimum `contribution amount` in TODO: line for the code

> After you are done with this part : run `yarn deploy --reset`

> > you should be now able to `contribute` 1 ETH

> As the owner you should be able to `claim()` all the funds added to this contract

#### 🥅 Goals

- [x] Understand how the initalization of a diamond takes place.
- [x] Get acquainted with the essential setup of Diamonds.

---

### Checkpoint 2: 🙏 Lets be fair to the contributors

Contributors have started to complain if they can actually take their money back from the Crowdfundr contract, the owner can take the money but the contributors' money is locked.

🔍 Inspect the code in the `WithdrawFacet.sol` contract in `packages/hardhat/contracts/facets`, specially look at the function `refund()`

> Start by commenting out the `return` line in the code at `02_checkpoint.ts`, this will run the script contained in this file.

🔍 Inspect the code in the `02_checkpoint.ts` inside `packages/hardhat/deploy`, sepcially understand how a facet is added to the Diamond

> At this point your contributors should be able to get the funds back by calling the `refund` function in `WithdrawFacet`

> > Can you guess whats wrong here ?

#### ⚔️ Checkpoint 2 side quests

In a crowdfunding contract, usually the contributors will be able to withdraw their amount after the deadline has passed. So lets set a deadline and enforce it inside the function `refund()`

- [x] call `setDeadline(VALUE)` at the bottom of `02_checkpoint.ts`, the value passed is in seconds, lets set it to 120 Seconds.

- [x] Uncomment the code that enforces deadline to be reached inside `refund()` in `WithdrawFacet.sol`.

- [x] Redeploy

- [x] within 2 minute try contributing some ETH and withdraw , see if withdraw function fails until the 2 minute has passed from deployment

---

### Checkpoint 3: 💵 Claiming when goal amount has been reached

Ok, so at this point your contributors can `contribute` and `withdraw` their assets when the deadline has been reached. But there should be some rules for the owner, owner can only withdraw if the goal hasnt been reached. Likewise, contributors only would be able to withdraw if the goal hasnt been reached

🔍 Inspect the code in the `ConfigFacet.sol` contract in `packages/hardhat/contracts/facets`

> Start by commenting out the `return` line in the code at `03_checkpoint.ts`, in the same way the facet was added in `02_checkpoint.ts`, try adding the last facet : `ConfigFacet`

- [x] Inside `MainFacet.sol` enforce that deadline has been reached inside the `claim()` function

- [x] Inside `WithdrawFacet.sol` enforce that goal has been reached inside the `refund()` function, likewise for `claim()` inside `MainFacet.sol`

- [x] Inside `03_checkpoint.ts` , call target amount to set the value. Lets try 10 ETH.

#### 🥅 Goals

- [✅] Test out the contract, do all your functions work as expected
- [✅] Interact and play around with the facets, get acquainted with their functions

#### ⚔️ Side Quest

- [✅] Check the tests

close the chain terminal and open a new one

```bash
yarn chain
```

```bash
yarn hardhat:test
```

### Checkpoint 4: 💾 Deploy it! 🛰

📡 Edit the `defaultNetwork` in `packages/hardhat/hardhat.config.js`, as well as `targetNetwork` in `packages/react-app/src/App.jsx`, to [your choice of public EVM networks](https://ethereum.org/en/developers/docs/networks/)

👩‍🚀 You will want to run `yarn account` to see if you have a **deployer address**.

🔐 If you don't have one, run `yarn generate` to create a mnemonic and save it locally for deploying.

🛰 Use a faucet to fund your **deployer address** (run `yarn account` again to view balances)

> ⚠️ Make sure you fund your account with enough Eth! .05 is required to initially fund the DiceGame contract and .01 more is required to fund the riggedRoll contract. Plus a bit extra to pay the gas.

🚀 Run `yarn deploy` to deploy to your public network of choice (😅 wherever you can get ⛽️ gas)

🔬 Inspect the block explorer for the network you deployed to... make sure your contract is there.

---

### Checkpoint 6: 🚢 Ship it! 🚁

📦 Run `yarn build` to package up your frontend.

💽 Upload your app to surge with `yarn surge` (you could also `yarn s3` or maybe even `yarn ipfs`?)

> 😬 Windows users beware! You may have to change the surge code in `packages/react-app/package.json` to just `"surge": "surge ./build",`

⚙ If you get a permissions error `yarn surge` again until you get a unique URL, or customize it in the command line.

🚔 Traffic to your url might break the [Infura](https://infura.io/) rate limit, edit your key: `constants.js` in `packages/react-app/src`

---

### Checkpoint 7: 📜 Contract Verification

Update the `apikey` in `packages/hardhat/package.json`. You can get your key [here](https://etherscan.io/myapikey).

> Now you are ready to run the `yarn verify --network your_network` command to verify your contracts on etherscan 🛰

Copy the verified address for your RiggedRoll contract and enter that into the appropriate Etherscan testnet.

---
