import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { CircleClientProvider } from './wallet.provider';

@Module({
  controllers: [WalletController],
  providers: [WalletService, CircleClientProvider],
  exports: [WalletService], // Export if needed in other modules
})
export class WalletModule {}
