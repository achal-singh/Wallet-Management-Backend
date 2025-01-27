# Wallet Deployer Backend

The set of APIs in this backend project allow you to deploy Safe's Multi-Sig Wallets using its [Core SDK](https://docs.safe.global/sdk/overview) which are signed and controlled by your wallets hosted on [Circle's Developer-Controlled Wallets](https://developers.circle.com/interactive-quickstarts/dev-controlled-wallets) portal.

## Setup

1. Set up your local .env file and set the following variables in it:

   ```js
   PORT=3000
   DATABASE_URL="mysql://root@localhost:3306/my-mcw"
   CIRCLE_DEV_KEY=
   CIRCLE_ENTITY_SECRET=
   ```

2. Set up mysql using prisma, make sure you have mysql installed in your system and then execute these commands:
   `npx prisma db push` and `npx prisma migrate deploy`. This should setup the DB and run the migrations.

## Using the APIs

> Bear in mind that only a couple of APIs are in the working state and the asset being used is **_`Base Sepolia`_**.

3. Firstly, create an Organisation using the **`POST`**: **`/org/create`** route. A sample body that can be passed to this route is this:

   ```json
   {
     "name": "BlackRock",
     "country": "USA"
   }
   ```

- It Creates a wallet set and further creates **`3`** wallets within the set.
- The wallet set is named same as the **`name`** property passed in the body above.

  The response looks like this:

  ```json
  {
    "id": 1,
    "walletSetId": "8c30a26f-b4bf-5448-97fa-eab92ca14ad2",
    "name": "BlackRock",
    "country": "USA",
    "createdAt": "2025-01-26T17:20:27.551Z"
  }
  ```

4. **List of wallets**: You can view the list of created wallets by hitting the GET route: **`wallet/:orgId`**, which in case of the above example would be: **`wallet/1`**.

   > NOTE: Make sure to **_fund the FIRST WALLET_** (with Base Sepolia) in the list of wallets created against the organisation.

5. **Delpoying a Safe**: Make sure the first wallet from the previous step has enough funds to pay for the safe deployment transaction. Once ready, hit the **`POST`** route: **`wallet/create`** with **`{ orgId: <ORG_ID> }`** in the body. (This is a slow API and can take about 10-15 seconds to execute).

   On successful execution the response should look similar to this:

   ```json
   {
     "id": "312fd37a-e55f-4dc3-b9f3-d32e8f3a2159",
     "safeAddress": "0xf6EeEB6c81AE426Ca09BC4D2C3d2C0C13922A773",
     "chainType": "EVM-TESTNET",
     "organisationId": "1",
     "createdAt": "2025-01-26 17:42:06.539"
   }
   ```
