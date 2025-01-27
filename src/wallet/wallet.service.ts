import { Injectable, Inject } from '@nestjs/common';
import { CircleClient } from './wallet.provider';
import { deployNewSafeWallet } from './utils';
import { prisma } from '../../prisma/client';
import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';

@Injectable()
export class WalletService {
  constructor(
    @Inject('CIRCLE_CLIENT')
    private readonly circleClient: CircleClient & {
      getWalletList: (orgId: number) => Promise<Wallet[] | { error: string }>;
    },
  ) {}

  async createWalletSet(orgName: string): Promise<any> {
    try {
      const response = await this.circleClient.createWalletSet({
        name: orgName,
      });
      return response.data!.walletSet;
    } catch (error) {
      console.error('Something went wrong in createWalletSet(): ');
      console.dir(error, { depth: null });
    }
  }

  async createWallet(walletSetId: string): Promise<any> {
    try {
      /* For now we're only supporting EVM-TESTNET type of wallets */
      const { data } = await this.circleClient.createWallets({
        blockchains: ['EVM-TESTNET'],
        walletSetId,
        count: 3,
      });
      return data?.wallets;
    } catch (error) {
      console.error('Something went wrong in createWallet(): ');
      console.dir(error, { depth: null });
    }
  }

  async deploySafeWallet(orgId: number): Promise<any> {
    const wallets = await this.circleClient.getWalletList(orgId);

    if ('error' in wallets) return wallets.error;
    const { safeAddress } = await deployNewSafeWallet(
      wallets,
      this.circleClient,
    );
    return await this.saveSafeWallet(safeAddress, orgId);
  }

  async getAllWallets(orgId: number): Promise<Wallet[] | { error: string }> {
    return await this.circleClient.getWalletList(orgId);
  }

  async saveSafeWallet(safeAddress: string, orgId: number): Promise<any> {
    try {
      const safeWallet = await prisma.wallet.create({
        data: {
          safeAddress,
          chainType: 'EVM-TESTNET',
          organisationId: orgId,
        },
      });
      console.log('Safe wallet saved successfully:', safeWallet);
      return safeWallet;
    } catch (error) {
      console.error('Error in saveSafeWallet:', error);
      return { error: 'Error saving safe wallet' };
    }
  }
}
