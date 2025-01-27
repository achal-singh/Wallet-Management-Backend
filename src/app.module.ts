import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { OrganisationModule } from './organisation/organisation.module';

@Module({
  imports: [WalletModule, OrganisationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
