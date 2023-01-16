import { BigNumber, BigNumberish, Contract, ContractTransaction, ethers } from 'ethers';
import { EthMessageSigner } from './eth-message-signer';
import { Provider } from './provider';
import { Signer } from './signer';
import { AccountState, Address, TokenLike, Nonce, PriorityOperationReceipt, TransactionReceipt, PubKeyHash, ChangePubKeyData, EthSignerType, SignedTransaction, TransferData, TxEthSignature, ForcedExitData, WithdrawData, Create2Data, ChainId, TokenId, OrderData, TokenAddress, OrderMatchingData, AccountBalances, TransferEntries, ForcedExitEntries, WithdrawEntries, ChangePubKeyEntries, OrderMatchingEntries } from './types';
import { LinkContract } from './contract';
export declare class ZKSyncTxError extends Error {
    value: PriorityOperationReceipt | TransactionReceipt;
    constructor(message: string, value: PriorityOperationReceipt | TransactionReceipt);
}
export declare class Wallet {
    ethSigner: ethers.Signer;
    ethMessageSigner: EthMessageSigner;
    cachedAddress: Address;
    signer?: Signer;
    accountId?: number;
    ethSignerType?: EthSignerType;
    provider: Provider;
    contract: LinkContract;
    ethSignature: string;
    private constructor();
    connect(provider: Provider): this;
    getRestoreKey(): string;
    static fromRestoreKey(ethWallet: ethers.Signer, provider: Provider, restoreKey: string): Promise<Wallet>;
    static fromEthSigner(ethWallet: ethers.Signer, provider: Provider, signer?: Signer, accountId?: number, ethSignerType?: EthSignerType, restoreKey?: string): Promise<Wallet>;
    static fromCreate2Data(syncSigner: Signer, createrSigner: ethers.Signer, provider: Provider, create2Data: Create2Data, accountId?: number): Promise<Wallet>;
    static fromEthSignerNoKeys(ethWallet: ethers.Signer, provider: Provider, accountId?: number, ethSignerType?: EthSignerType): Promise<Wallet>;
    getEIP712Signature(data: any): Promise<TxEthSignature>;
    sendTransfer(transfer: TransferEntries): Promise<Transaction>;
    getTransferData(entries: TransferEntries): Promise<TransferData>;
    signTransfer(entries: TransferEntries): Promise<SignedTransaction>;
    sendForcedExit(entries: ForcedExitEntries): Promise<Transaction>;
    getForcedExitData(entries: ForcedExitEntries): Promise<ForcedExitData>;
    signForcedExit(entries: ForcedExitEntries): Promise<SignedTransaction>;
    signOrder(entries: OrderData): Promise<SignedTransaction>;
    getOrderMatchingData(entries: OrderMatchingEntries): Promise<OrderMatchingData>;
    signOrderMatching(entries: OrderMatchingEntries): Promise<SignedTransaction>;
    sendWithdrawToEthereum(entries: WithdrawEntries): Promise<Transaction>;
    getWithdrawData(entries: WithdrawEntries): Promise<WithdrawData>;
    signWithdrawToEthereum(entries: WithdrawEntries): Promise<SignedTransaction>;
    isSigningKeySet(): Promise<boolean>;
    sendChangePubKey(entries: ChangePubKeyEntries): Promise<Transaction>;
    getChangePubKeyData(entries: ChangePubKeyEntries): Promise<ChangePubKeyData>;
    signChangePubKey(entries: ChangePubKeyEntries): Promise<SignedTransaction>;
    isOnchainAuthSigningKeySet(linkChainId: number, nonce?: Nonce): Promise<boolean>;
    onchainAuthSigningKey(linkChainId: number, nonce?: Nonce, ethTxOptions?: ethers.providers.TransactionRequest): Promise<ContractTransaction>;
    getCurrentPubKeyHash(): Promise<PubKeyHash>;
    getNonce(nonce?: Nonce): Promise<number>;
    getAccountId(): Promise<number | undefined>;
    address(): Address;
    getAccountState(): Promise<AccountState>;
    getSubAccountState(subAccountId: number): Promise<AccountState>;
    getBalances(subAccountId?: number): Promise<AccountBalances>;
    getTokenBalance(tokenId: TokenId, subAccountId: number): Promise<string>;
    getEthereumBalance(token: TokenLike, linkChainId: ChainId): Promise<BigNumber>;
    estimateGasDeposit(linkChainId: number, args: any[]): Promise<BigNumber>;
    isERC20DepositsApproved(tokenAddress: Address, accountAddress: Address, linkChainId: number, erc20ApproveThreshold?: BigNumber): Promise<boolean>;
    approveERC20TokenDeposits(tokenAddress: Address, linkChainId: number, max_erc20_approve_amount?: BigNumber): Promise<ContractTransaction>;
    sendDepositFromEthereum(deposit: {
        subAccountId: number;
        depositTo: Address;
        token: TokenAddress;
        amount: BigNumberish;
        linkChainId: number;
        mapping: boolean;
        ethTxOptions?: ethers.providers.TransactionRequest;
        approveDepositAmountForERC20?: boolean;
    }): Promise<ETHOperation>;
    emergencyWithdraw(withdraw: {
        tokenId: TokenId;
        subAccountId: number;
        linkChainId: number;
        accountId?: number;
        ethTxOptions?: ethers.providers.TransactionRequest;
    }): Promise<ETHOperation>;
    getMainContract(linkChainId: number): Promise<Contract>;
    private modifyEthersError;
    private setRequiredAccountIdFromServer;
}
export declare class ETHOperation {
    ethTx: ContractTransaction;
    zkSyncProvider: Provider;
    state: 'Sent' | 'Mined' | 'Committed' | 'Verified' | 'Failed';
    error?: ZKSyncTxError;
    priorityOpId?: BigNumber;
    constructor(ethTx: ContractTransaction, zkSyncProvider: Provider);
    awaitEthereumTxCommit(): Promise<ethers.ContractReceipt>;
    awaitReceipt(): Promise<TransactionReceipt>;
    private setErrorState;
    private throwErrorIfFailedState;
}
export declare class Transaction {
    txData: any;
    txHash: string;
    sidechainProvider: Provider;
    state: 'Sent' | 'Committed' | 'Verified' | 'Failed';
    error?: ZKSyncTxError;
    constructor(txData: any, txHash: string, sidechainProvider: Provider);
    awaitReceipt(): Promise<TransactionReceipt>;
    private setErrorState;
    private throwErrorIfFailedState;
}
export declare function submitSignedTransaction(signedTx: SignedTransaction, provider: Provider): Promise<Transaction>;
