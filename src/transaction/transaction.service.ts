/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { prisma } from '../../prisma/client';
import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { Transaction } from '../types/modelTypes';

export class TransactionDto {
  @IsString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  hash: string;

  @IsString() // Ensures the value is a string
  @IsIn(['PENDING', 'COMPLETED', 'FAILED']) // Ensures the value is one of the allowed options
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @IsString()
  @IsNotEmpty()
  chainId: string;

  @IsNotEmpty()
  organisationId: number;
}

@Injectable()
export class TransactionService {
  async createTransaction(data: TransactionDto): Promise<Transaction> {
    const {
      data: transactionData,
      hash,
      status,
      chainId,
      organisationId,
    } = data;
    try {
      const newTransaction: Transaction = await prisma.transaction.create({
        data: {
          data: transactionData,
          hash,
          status,
          chainId,
          organisationId,
        },
      });
      console.log('Transaction created successfully:', newTransaction);
      return newTransaction;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Error creating transaction');
    }
  }

  async getAllTransactions(): Promise<Transaction[]> {
    try {
      // Fetch all transactions from the database
      const transactions: Transaction[] = await prisma.transaction.findMany();
      return transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Error fetching transactions');
    }
  }
}
