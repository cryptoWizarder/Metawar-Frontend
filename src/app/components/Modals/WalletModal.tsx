'use client'

import { FC, forwardRef, LegacyRef } from "react";
import Image from "next/image";


export interface IWalletProps extends JSX.IntrinsicAttributes {
  metamaskClick?: () => void;
  walletConnectClick?: () => void;
}

const WalletModal: FC<IWalletProps> = forwardRef(({ metamaskClick, walletConnectClick }, ref) => {

    return (
        <>
            <div className="py-8" ref={ref as LegacyRef<HTMLDivElement>}>
                <h3 className={`text-xl font-bold sm:text-3xl text-white mb-8 text-center sm:leading-14`}>
                  Connect your wallet
                </h3>

                <div className="flex justify-around">
                    <button onClick={metamaskClick}><Image src="../meta-mesk.png" alt="metmask" className="" width={100} height={100}></Image></button>
                    <button onClick={walletConnectClick}><Image src="../wallet-connect.png" alt="walletConnect" className="" width={100} height={100}></Image></button>
                </div>

            </div>
        </>
    )
});

WalletModal.displayName = "WalletModal";

export default WalletModal;