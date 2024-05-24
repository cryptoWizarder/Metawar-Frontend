'use client'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "@/app/store/user.selectors";
import Top from "../Top";
import { ethers } from "ethers";
import { toast } from 'react-toastify';
import { useWeb3React } from "@web3-react/core";
import { useModal } from "@/app/hooks/use-modal";
import { selectWallet } from "@/app/store/user.selectors";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { formatWalletAddress, switchNetwork } from "@/app/connect/wallet";

import { injected } from "@/app/connect/connectors";
import { setWallet } from "@/app/store/user.reducer";
import { IWalletProps } from "@/app/components/Modals/WalletModal";
import Left from "../Left";

export default function Wallet() {
    const dispatch = useDispatch();

    const { open, close } = useModal();
    const walletAddress = useSelector(selectWallet);
    const { active, activate, chainId, account, deactivate } = useWeb3React();
    const [connected, setConnected] = useState('');
    const [walletProvider, setWalletProvider] = useState<typeof EthereumProvider>();
    const handleLogout = async () => {
        if(connected === 'Metamask'){
            await deactivate();
        }else {
            // const ethersWeb3Provider = new ethers.BrowserProvider(walletProvider);
        }
        dispatch(setWallet(''));    
        

    }
    
    const metamaskClick = async () => {
        if (chainId !== 11155111) {
          const res = await switchNetwork(11155111);
          if (!res) {
            toast( `add network fail`, {
              type: "error"
            });
            return;
          } else if (res === "no metamask") {
            toast(`Please install the metamask plugin`,{
              type: "error"
            });
          }
        }
        await activate(injected);
        setConnected('Metamask');
        close();
    };

    const walletConnectClick = async () => {
        try {
            const provider = await EthereumProvider.init({
                projectId : '612df1024874745bccdd7c078f98d5c9', // REQUIRED your projectId
                chains: [1], // REQUIRED chain ids
                optionalChains: [5, 56, 137, 10, 100],
                showQrModal: true, // REQUIRED set to "true" to use @walletconnect/modal,
                // methods, // OPTIONAL ethereum methods
                // optionalMethods: ['eth_signTypedData', 'eth_signTypedData_v4', 'eth_sign'],
                events: ["chainChanged", "accountsChanged"], // OPTIONAL ethereum events
                // optionalEvents: ["accountsChanged", "chainChanged"],
                // rpcMap, // OPTIONAL rpc urls for each chain
                // metadata, // OPTIONAL metadata of your app
                qrModalOptions:{
                    themeMode: 'dark',
                }, // OPTIONAL - `undefined` by default
            });
            close();
            await provider.connect({
                chains: [1], // OPTIONAL chain ids
                rpcMap: {
                    1: "https://mainnet.infura.io/v3/175a6f6149e04964a38455979e4825fe",
                    56: "https://bsc-dataseed1.binance.org",
                    66: "https://exchainrpc.okex.org",
                    128: "https://http-mainnet-node.huobichain.com",
                    137: "https://rpc-mainnet.maticvigil.com",
                    80001: "https://rpc-mumbai.maticvigil.com",
                    42161: "https://arb1.arbitrum.io/rpc",
                    11155111: "https://sepolia.infura.io/v3/",
                }, // OPTIONAL rpc urls
                // pairingTopic, // OPTIONAL pairing topic
            });
            
            // await provider.enable();
            provider.on('display_uri', (uri: string) => {
                console.log("uri", uri);
            })
            // window.walletConnectProvider = provider;
            
            console.log(typeof (provider));
            if(provider){
                // setWalletProvider(provider);
                setConnected('WalletConnect');
                dispatch(setWallet(provider.accounts[0]));
            }
            
            provider.on("accountsChanged", (data: any) => {
                // setTimeout(() => {
                    console.log(data);
                    // if (chainIds === 1) {
                    // globalStore.setState({
                    //     globalAccount: accounts[0],
                    // });
                    // setStore(connectorLocalStorageKey, "true");
                    // setIsMetaMask.on();
                    // setRandom(Math.random());
                    // handleSign();
                    // }
                // }, 1000);
            });
           
            provider.on("chainChanged", (data: any) => {
                console.log("data", data)
            });
            provider.on("connect", (data: any) => {
                console.log("connect", data)
            });
            provider.on("disconnect", () => {
            });
            //  Enable session (triggers QR Code modal)
            
        } catch (err) {
            console.log(err, "err");
        }
    };
    useEffect(() => {
        dispatch(setWallet(account as string));
    }, [active])
    return (
        <>
            <Top />
            <main className=" absolute top-[8rem] lg:top-1/4 w-full">
                <div className="flex w-3/4 justify-between mx-auto">
                    <div className="hidden lg:flex">
                        <Left />
                    </div>
                    <div className="flex flex-col mx-auto bg-teal-950/30 w-4/5 rounded-md">
                        <p className="p-5 flex justify-between items-center">
                            <span>Linked Wallets</span>
                            {
                                walletAddress === undefined || walletAddress === ''  ?
                                    <button className="p-3 border rounded-md" onClick={() => open<IWalletProps>('walletModal', {metamaskClick, walletConnectClick})}>Connect Wallet</button>
                                    :
                                    <button className="p-3 border rounded-md" onClick={handleLogout}>{formatWalletAddress(walletAddress)}</button>
                                    
                            }
                            
                        </p>
                        <hr />
                        <div className="p-5">
                            It appears that our services are down at the moment. Please try again later.
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}