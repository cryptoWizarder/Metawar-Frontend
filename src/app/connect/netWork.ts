import { ethers } from "ethers";
import { SEPOLIA_TESTNET_PARAMS } from "../helper/contsants.helper";

export const mainChainId = "0x38";
export const networkConfigMap: Record<string, any> = {
  11155111: {
    chainId: SEPOLIA_TESTNET_PARAMS,
    chainName: "Sepolia test network",
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
};

export const scanAddressMap: Record<string, string> = {
  11155111: "https://sepolia.infura.io/v3/",
};
