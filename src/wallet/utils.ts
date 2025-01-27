import Safe, {
  PredictedSafeProps,
  SafeAccountConfig,
} from '@safe-global/protocol-kit';
import { baseSepolia } from 'viem/chains';
import { createPublicClient, http, parseGwei } from 'viem';

import { SUPPORTED_CHAINS } from '../blockchain/utils';
const RPC = SUPPORTED_CHAINS.get('base')?.get('sepolia')?.rpcURL as string;
const chainId = SUPPORTED_CHAINS.get('base')?.get('sepolia')?.chainId;

/* NOTE: In the following function the first wallet (wallets[0]) of the 3 wallets is used to pay for 
deploying the Safe contract, so make sure it has enough funds to cover for its costs */
export const deployNewSafeWallet = async (
  wallets: any[],
  circleClient: any,
) => {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(RPC),
  });

  const safeAccountConfig: SafeAccountConfig = {
    owners: [wallets[0].address, wallets[1].address, wallets[2].address],
    threshold: 2,
    fallbackHandler: wallets[0].address,
  };

  const predictedSafe: PredictedSafeProps = {
    safeAccountConfig,
  };

  let protocolKit = await Safe.init({
    provider: RPC,
    signer: wallets[0].address,
    predictedSafe,
  });
  protocolKit = await protocolKit.connect({ predictedSafe });

  const deploymentTransaction =
    await protocolKit.createSafeDeploymentTransaction();

  const nonce = await client.getTransactionCount({
    address: wallets[0].address,
  });

  const estimateGas = await client.estimateGas(deploymentTransaction as any);

  const txObj = {
    ...deploymentTransaction,
    nonce,
    chainId,
    gas: estimateGas.toString(),
    maxFeePerGas: parseGwei('25').toString(),
    maxPriorityFeePerGas: parseGwei('25').toString(),
  };

  const signedTx = await circleClient.signTransaction({
    walletId: wallets[0].id,
    transaction: JSON.stringify(txObj),
  });

  const hash = await client.sendRawTransaction({
    serializedTransaction: signedTx.data?.signedTransaction as `0x${string}`,
  });
  console.log('Safe Deployment Tx-Hash: ', hash);
  return { hash, safeAddress: await protocolKit.getAddress() };
};
