export type Organisation =
  | {
      name: string;
      id: number;
      walletSetId?: string;
      country: string;
      createdAt: Date;
    }
  | {
      error: string;
    };

export type Transaction =
  | {
      id: string;
      data: any;
      hash: string;
      status: 'PENDING' | 'COMPLETED' | 'FAILED';
      chainId: string;
      organisationId: number;
      createdAt: Date;
      updatedAt: Date;
    }
  | {
      error: string;
    };
