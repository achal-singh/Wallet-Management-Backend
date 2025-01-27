import * as dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../../prisma/client';
import { Provider } from '@nestjs/common';
import { initiateDeveloperControlledWalletsClient } from '@circle-fin/developer-controlled-wallets';
import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';

export type CircleClient = ReturnType<
  typeof initiateDeveloperControlledWalletsClient
>;

export const CircleClientProvider: Provider = {
  provide: 'CIRCLE_CLIENT',
  useFactory: (): CircleClient & {
    getWalletList: (orgId: number) => Promise<Wallet[] | { error: string }>;
  } => {
    if (!process.env.CIRCLE_DEV_KEY || !process.env.CIRCLE_ENTITY_SECRET) {
      throw new Error(
        'Missing Circle API credentials in environment variables',
      );
    }

    const client = initiateDeveloperControlledWalletsClient({
      apiKey: String(process.env.CIRCLE_DEV_KEY),
      entitySecret: String(process.env.CIRCLE_ENTITY_SECRET),
    });

    const extendedClient = Object.assign(client, {
      getWalletList: async (
        orgId: number,
      ): Promise<Wallet[] | { error: string }> => {
        const org = await prisma.organisation.findUnique({
          where: {
            id: orgId,
          },
        });

        if (!org) return { error: 'Organisation not found' };

        try {
          const { data } = await client.listWallets({
            walletSetId: org.walletSetId,
          });

          return data?.wallets as Wallet[];
        } catch (err) {
          console.error('Error fetching wallets:', err);
          return { error: 'Failed to fetch wallets from Circle API' };
        }
      },
    });
    return extendedClient;
  },
};
