import * as ethers from 'ethers';
import { Injectable } from '@nestjs/common';

import { SUPPORTED_CHAINS } from '../utils';

@Injectable()
export class EVMProvider {
  #getClient(chainName: string, network: string): any {
    if (
      !SUPPORTED_CHAINS.has(chainName) ||
      !SUPPORTED_CHAINS.get(chainName)?.has(network)
    ) {
      throw new Error(
        `Unsupported chain or network: ${chainName} -> (${network})`,
      );
    }

    const { rpcURL } = SUPPORTED_CHAINS.get(chainName)?.get(network) || {};

    if (!rpcURL) {
      throw new Error(
        `RPC URL not found for chain: ${chainName} -> network: ${network}`,
      );
    }
    return new ethers.JsonRpcProvider(rpcURL);
  }

  /* TO-DO: More functions to be added */
}
