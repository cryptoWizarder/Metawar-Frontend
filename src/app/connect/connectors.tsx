import { InjectedConnector } from "@web3-react/injected-connector";
import { SEPOLIA_TESTNET_PARAMS } from "../helper/contsants.helper";

export const NetworkContextName = "NETWORK";
export const connectorLocalStorageKey = "connectorId";
export const injected = new InjectedConnector({
  supportedChainIds: [11155111],
});

const walletConfig = {
  // walletconnect 用到的bridge
  bridge: "https://bridge.walletconnect.org",
  infuraId: "ad92ef65d7cf424e807d09f01cdb7702",
  rpc: {
    80001: "https://rpc-mumbai.maticvigil.com"
  },
};

