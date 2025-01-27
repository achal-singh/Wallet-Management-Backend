import { sepolia, baseSepolia } from 'viem/chains';

export const SUPPORTED_CHAINS = new Map<
  string,
  Map<string, { symbol: string; chainId: number; rpcURL: string }>
>([
  [
    'ethereum',
    new Map<string, { symbol: string; chainId: number; rpcURL: string }>([
      [
        'sepolia',
        {
          symbol: 'ETH',
          chainId: sepolia.id,
          rpcURL:
            'https://sepolia.infura.io/v3/67d28706642f4bc3bddb622236c05435',
        },
      ],
    ]),
  ],
  [
    'base',
    new Map<string, { symbol: string; chainId: number; rpcURL: string }>([
      [
        'sepolia',
        {
          symbol: 'ETH',
          chainId: baseSepolia.id,
          rpcURL: 'https://sepolia.base.org',
        },
      ],
    ]),
  ],
]);
