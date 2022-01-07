import { BigNumberish, ethers } from 'ethers';
import { Address, EthSignerType, PubKeyHash, Transfer, Withdraw, ForcedExit, ChangePubKey, ChangePubKeyOnchain, ChangePubKeyECDSA, ChangePubKeyCREATE2, Create2Data, AddLiquidity, RemoveLiquidity, Swap, CurveAddLiquidity, CurveRemoveLiquidity, CurveSwap } from './types';
export declare class Signer {
    #private;
    private constructor();
    pubKeyHash(): Promise<PubKeyHash>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    transferSignBytes(transfer: {
        accountId: number;
        fromChainId: number;
        toChainId: number;
        from: Address;
        to: Address;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncTransfer(transfer: {
        accountId: number;
        fromChainId: number;
        toChainId: number;
        from: Address;
        to: Address;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<Transfer>;
    signSyncSwap(transfer: {
        fromChain: number;
        toChain: number;
        accountId: number;
        account: Address;
        tokenIdIn: number;
        tokenIdOut: number;
        amountIn: BigNumberish;
        amountOut: BigNumberish;
        amountOutMin: BigNumberish;
        fee0: BigNumberish;
        fee1: BigNumberish;
        pairAddress: Address;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<Swap>;
    signSyncRemoveLiquidity(transfer: {
        fromChainId: number;
        toChainId: number;
        minAmount1: BigNumberish;
        minAmount2: BigNumberish;
        tokenId1: number;
        tokenId2: number;
        lpTokenId: number;
        fee1: BigNumberish;
        fee2: BigNumberish;
        from: Address;
        pairAddress: Address;
        lpQuantity: BigNumberish;
        accountId: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<RemoveLiquidity>;
    signSyncAddLiquidity(transfer: {
        accountId: number;
        account: Address;
        fromChainId: number;
        toChainId: number;
        tokenId0: number;
        tokenId1: number;
        amount0: BigNumberish;
        amount1: BigNumberish;
        amount0Min: BigNumberish;
        amount1Min: BigNumberish;
        pairAccount: Address;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<AddLiquidity>;
    signSyncCurveAddLiquidity(payload: CurveAddLiquidity & {
        chainId: string;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<CurveAddLiquidity>;
    signSyncCurveRemoveLiquidity(payload: CurveRemoveLiquidity & {
        chainId: string;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<CurveRemoveLiquidity>;
    signSyncCurveSwap(payload: CurveSwap & {
        chainId: string;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<CurveSwap>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    withdrawSignBytes(withdraw: {
        accountId: number;
        from: Address;
        ethAddress: string;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        withdrawFeeRatio: number;
        fastWithdraw: number;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncWithdraw(withdraw: {
        accountId: number;
        from: Address;
        ethAddress: string;
        tokenId: number;
        amount: BigNumberish;
        fee: BigNumberish;
        withdrawFeeRatio: number;
        fastWithdraw: number;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<Withdraw>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    forcedExitSignBytes(forcedExit: {
        initiatorAccountId: number;
        target: Address;
        tokenId: number;
        fee: BigNumberish;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncForcedExit(forcedExit: {
        initiatorAccountId: number;
        target: Address;
        tokenId: number;
        fee: BigNumberish;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Promise<ForcedExit>;
    /**
     * @deprecated `Signer.*SignBytes` methods will be removed in future. Use `utils.serializeTx` instead.
     */
    changePubKeySignBytes(changePubKey: {
        accountId: number;
        account: Address;
        newPkHash: PubKeyHash;
        fromChainId: number;
        toChainId: number;
        feeTokenId: number;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        validFrom: number;
        validUntil: number;
    }): Uint8Array;
    signSyncChangePubKey(changePubKey: {
        accountId: number;
        account: Address;
        newPkHash: PubKeyHash;
        fromChainId: number;
        toChainId: number;
        feeTokenId: number;
        fee: BigNumberish;
        ts: number;
        nonce: number;
        ethAuthData?: ChangePubKeyOnchain | ChangePubKeyECDSA | ChangePubKeyCREATE2;
        ethSignature?: string;
        validFrom: number;
        validUntil: number;
    }): Promise<ChangePubKey>;
    static fromPrivateKey(pk: Uint8Array): Signer;
    static fromSeed(seed: Uint8Array): Promise<Signer>;
    static fromETHSignature(ethSigner: ethers.Signer): Promise<{
        signer: Signer;
        ethSignatureType: EthSignerType;
    }>;
}
export declare class Create2WalletSigner extends ethers.Signer {
    zkSyncPubkeyHash: string;
    create2WalletData: Create2Data;
    readonly address: string;
    readonly salt: string;
    constructor(zkSyncPubkeyHash: string, create2WalletData: Create2Data, provider?: ethers.providers.Provider);
    getAddress(): Promise<string>;
    /**
     * This signer can't sign messages but we return zeroed signature bytes to comply with ethers API.
     */
    signMessage(_message: any): Promise<string>;
    signTransaction(_message: any): Promise<string>;
    connect(provider: ethers.providers.Provider): ethers.Signer;
}
