/* eslint-disable @typescript-eslint/no-unsafe-call */
import { WalletService } from './wallet.service';
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { Wallet } from '@circle-fin/developer-controlled-wallets/dist/types/clients/developer-controlled-wallets';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  createWallet(@Body() createWalletDto: { orgId: number }): any {
    const { orgId } = createWalletDto;
    return this.walletService.deploySafeWallet(orgId);
  }

  @Get(':orgId')
  getWallets(
    @Param('orgId') orgId: string,
  ): Promise<Wallet[] | { error: string }> {
    return this.walletService.getAllWallets(parseInt(orgId));
  }
}
