import { ethers } from "ethers";
import { TransactionResponse } from "@ethersproject/providers";
import { networkConfigMap } from "./netWork";
import { SEPOLIA_TESTNET_PARAMS } from "../helper/contsants.helper";
// import { ERC20Abi } from "@/abi/ERC20Abi";
// import { XBuffBettingABI } from "@/abi/XbuffBettingABI";

// import { AbiItem } from 'web3-utils'

export enum WalletEnum {
  metamask = "MetaMask",
  walletconnect = "WalletConnect",
}

export interface Wallet {
  logo: string;
  name: WalletEnum;
  url?: string;
}

// switch network to ethereum
export const switchNetwork = async (chainId: number) => {
  try {
    if (ethereum) {
      await ethereum?.request?.({
        method: "wallet_switchEthereumChain",
        params: [ SEPOLIA_TESTNET_PARAMS ],
      });
    } else {
      return "no metamask";
    }
  } catch (error: any) {
    if (error.code === 4902 || error.code === -32603) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkConfigMap[chainId]],
        });
        return true;
      } catch (addError) {
        return false;
      }
    }
    return false;
  }
  return true;
};

export const formatWalletAddress = (address: string) => {
  console.log(address)
  if(address === undefined || address === '')
    return '';
  else
    return address.slice(0, 5) + '....' + address.slice(-5);
}
// export const executeAndShowTx = async (
//   promise: Promise<any>,
//   { throwError } = {
//     throwError: false,
//   }
// ) => {
//   let tx;
//   try {
//     tx = (await promise) as TransactionResponse;
//     // txPending(tx.chainId, tx.hash);

//     await tx.wait();
//     // txSuccess(tx.chainId, tx.hash);
//     return tx.hash;
//   } catch (err) {
//     if (tx) {
//       console.log("err:", tx.hash);
//     }
//     if (throwError) {
//       console.log(err);
//     } else {
//       console.error("transaction fail: ", err);
//     }
//     return err;
//   }
// };

// export const recharge = async (
//   library: any,
//   account: any,
//   tokenAddress: string,
//   wallet_address: string,
//   usdc: string,
// ) => {
//   try {
//     const signer = library.getSigner(account);
//     console.log("Signer ", signer)
//     const contract = new ethers.Contract(tokenAddress, ERC20Abi, signer);
//     console.log("contract ", contract)
//     const decimals = await contract.decimals();
//     console.log("decimals ", decimals)
//     const tran = contract.transfer(
//       wallet_address,
//       ethers.utils.parseUnits(usdc, decimals)
//     );
//     console.log("tran ", tran)
//     const res = await executeAndShowTx(tran);
//     if (res && typeof res === "string") {
//       return { success: true, hash: res }
//     } else {
//       return { success: false, hash: "" }
//     }
//   } catch (err) {
//     console.log("Deposit Recharge Error ", err)
//     return { success: false, hash: "" }
//   }
// };

// export const checkingBalance = async (
//   inputValue: number,
//   token: string,
//   wallet_address: string,
// ) => {
//   const metamaskProvider = window.ethereum;
//   await metamaskProvider.request({ method: "eth_requestAccounts" });
//   const provider = new ethers.providers.Web3Provider(metamaskProvider);
//   const signer = provider.getSigner();
//   const usdcContract = new ethers.Contract(token, ERC20Abi, signer);
//   const usdcBalance =
//     (await usdcContract.balanceOf(wallet_address)) / 10 ** 18;
//   console.log("USDC Balance", usdcBalance);
//   // eslint-disable-next-line react-hooks/exhaustive-deps

//   if (usdcBalance >= Number(inputValue)) {
//     return true;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   } else {
//     return false;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }
// };

// export const checkRound = async () => {
//   try {
//     const metamaskProvider = window.ethereum;
//     await metamaskProvider.request({ method: "eth_requestAccounts" });
//     const provider = new ethers.providers.Web3Provider(metamaskProvider);
//     const signer = provider.getSigner();
//     // console.log("Signer === ", signer);

//     const contract = new ethers.Contract("0xF541FF5F364c0b72A52AE8072D2851D24e402dC3", XBuffBettingABI, signer);
//     // console.log("contract === ", contract)

//     const roundId = await contract.getAvailableRound();
//     // console.log("Current Round ===", roundId)

//     return { success: true, roundId }
//   } catch (err) {
//     console.log("Check Round Error ", err)
//     return { success: false, roundId: "" }
//   }
// };

// export const joinRound = async (
//   library: any,
//   account: any,
//   roundId: any,
//   upOrDown: boolean,
//   amount: number
// ) => {
//   try {

//     console.log("Join Round Id ", roundId);
//     console.log("Join Up or Down", upOrDown);
//     console.log("Join Amount ", amount);
//     const metamaskProvider = window.ethereum;
//     await metamaskProvider.request({ method: "eth_requestAccounts" });
//     const provider = new ethers.providers.Web3Provider(metamaskProvider);
//     const signer = provider.getSigner();
//     const contractAddress = '0xF541FF5F364c0b72A52AE8072D2851D24e402dC3';

//     const contract = new ethers.Contract(contractAddress, XBuffBettingABI, signer);

//     // Ensure that the amount is greater than zero
//     if (amount <= 0) {
//       throw new Error("Amount must be greater than zero");
//     }

//     const joinRoundTx = await contract.joinRound(roundId, upOrDown, {
//       value: ethers.utils.parseEther(amount.toString()), // Convert to Wei
//     });

//     // Wait for transaction confirmation using the provider
//     await provider.waitForTransaction(joinRoundTx.hash);

//     console.log('Transaction successful:', joinRoundTx.hash);

//     return { success: true, joinRoundTx };
//   } catch (err: any) {
//     // console.log("Join Round Error ", JSON.stringify(err));

//     // Extract the revert reason from the error object
//     const errorMessage = err.reason || (err.data && err.data.message) || "Unknown reason";

//     // Extract the specific message "Round is closing" from the error
//     const revertReason = errorMessage.includes(":") ? errorMessage.split(":")[1].trim() : errorMessage;

//     console.log("Revert Reason:", revertReason);
//     return { success: false, joinRoundTx: {}, message: revertReason };
//   }
// };
