const { ApiPromise, WsProvider } = require("@polkadot/api");

async function getBalanceAtBlock(address, blockHeight) {
  // Step 1: Connect to the Shiden network
  const provider = new WsProvider("wss://rpc.shiden.astar.network");
  const api = await ApiPromise.create({ provider });

  // Step 2: Get the block hash at the specified block height
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

  // Step 3: Fetch the account balance at the specific block hash
  const { data: balance } = await api.query.system.account.at(
    blockHash,
    address
  );

  // Step 4: Convert the balance to a decimal by dividing by 10^18
  const decimalBalance = balance.free / 10 ** 18;

  // Step 5: Print the free balance at that block height in a human-readable format
  console.log(
    `Balance of address ${address} at block height ${blockHeight}: ${decimalBalance}`
  );
}

// Replace these with your desired address and block height
const address = "XUmPNx2DqD9wyh2YTE2KSFPKSmgkXDrit8JEfFDzMyD9D1L"; // Replace with the target address
const blockHeight = 5627526; // Replace with the desired block height

getBalanceAtBlock(address, blockHeight).catch(console.error);
