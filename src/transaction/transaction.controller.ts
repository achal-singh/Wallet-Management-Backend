/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { Transaction } from '../types/modelTypes';
import { TransactionDto, TransactionService } from './transaction.service';

@Injectable()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  async saveTransaction(txData: TransactionDto): Promise<Transaction> {
    return this.transactionService.createTransaction(txData);
  }
  catch(error) {
    console.error('Error creating organisation:', error);
    return { error: 'Error creating organisation' };
  }

  async getAllOrganisations(): Promise<any[]> {
    try {
      return this.transactionService.getAllTransactions();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Error fetching transactions');
    }
  }
}
