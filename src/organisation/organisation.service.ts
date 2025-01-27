/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { prisma } from '../../prisma/client';
import { Organisation } from '../types/modelTypes';
import { IsString, IsNotEmpty } from 'class-validator';
import { WalletService } from '../wallet/wallet.service';

export class OrganisationDto {
  @IsString()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  country: string;
}

@Injectable()
export class OrganisationService {
  constructor(private readonly walletService: WalletService) {}

  async createOrganisation(data: OrganisationDto): Promise<Organisation> {
    const { name, country } = data;
    try {
      const walletSet = await this.walletService.createWalletSet(name);
      await this.walletService.createWallet(walletSet.id);
      const newOrganisation: Organisation = await prisma.organisation.create({
        data: {
          name,
          country,
          walletSetId: walletSet.id,
        },
      });
      console.log('Organisation created successfully:', newOrganisation);
      return newOrganisation;
    } catch (error) {
      console.error('Error creating organisation:', error);
      return { error: 'Error creating organisation' };
    }
  }

  async getAllOrganisations(): Promise<Organisation[]> {
    try {
      // Fetch all organisations from the database
      const organisations: Organisation[] =
        await prisma.organisation.findMany();
      return organisations;
    } catch (error) {
      console.error('Error fetching organisations:', error);
      throw new Error('Error fetching organisations');
    }
  }
}
