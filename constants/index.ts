
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net",
    31337: "http://127.0.0.1:8545/"

  };

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42,31337];

  export const ALBT_TOKEN_ADDRESS = "0xc6869a93ef55e1d8ec8fdcda89c9d93616cf0a72";
  export const US_ELECTION_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  //export const US_ELECTION_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  