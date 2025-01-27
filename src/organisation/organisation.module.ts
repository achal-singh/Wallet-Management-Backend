import { Module } from '@nestjs/common';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [WalletModule],
  controllers: [OrganisationController],
  providers: [OrganisationService],
})
export class OrganisationModule {}
