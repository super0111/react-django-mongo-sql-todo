
import { ethers } from "ethers";
import { getContract } from "../Addresses";

export const TOKEN_ABI= [
  {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_spender",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_from",
              "type": "address"
          },
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
          {
              "name": "",
              "type": "uint8"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "name": "balance",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "name": "",
              "type": "string"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "constant": false,
      "inputs": [
          {
              "name": "_to",
              "type": "address"
          },
          {
              "name": "_value",
              "type": "uint256"
          }
      ],
      "name": "transfer",
      "outputs": [
          {
              "name": "",
              "type": "bool"
          }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "constant": true,
      "inputs": [
          {
              "name": "_owner",
              "type": "address"
          },
          {
              "name": "_spender",
              "type": "address"
          }
      ],
      "name": "allowance",
      "outputs": [
          {
              "name": "",
              "type": "uint256"
          }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
  },
  {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "spender",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "value",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  }
]

export const TOKENS = {
    56: [
      {
        name: "Bitcoin (BTCB)",
        symbol: "BTC",
        decimals: 18,
        address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
        coingeckoUrl: "https://www.coingecko.com/en/coins/binance-bitcoin",
        imageUrl: "https://assets.coingecko.com/coins/images/14108/small/Binance-bitcoin.png",
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
        coingeckoUrl: "https://www.coingecko.com/en/coins/ethereum",
        imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      },
      {
        name: "Binance Coin",
        symbol: "BNB",
        decimals: 18,
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",//ethers.constants.AddressZero,
        coingeckoUrl: "https://www.coingecko.com/en/coins/binance-coin",
        imageUrl: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
        isNative: true,
      },
      {
        name: "Wrapped Binance Coin",
        symbol: "WBNB",
        decimals: 18,
        address: getContract(56, "NATIVE_TOKEN"),
        isWrapped: true,
        coingeckoUrl: "https://www.coingecko.com/en/coins/binance-coin",
        imageUrl: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
        baseSymbol: "BNB",
      },
      {
        name: "Cardano",
        symbol: "ADA",
        decimals: 18,
        coingeckoUrl: "https://www.coingecko.com/en/coins/cardano",
        imageUrl: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
        address: "0x3ee2200efb3400fabb9aacf31297cbdd1d435d47",
      },
      {
        name: "Binance USD",
        symbol: "BUSD",
        decimals: 18,
        address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
        isStable: true,
        coingeckoUrl: "https://www.coingecko.com/en/coins/binance-usd",
        imageUrl: "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
      },
      {
        name: "USD Coin",
        symbol: "USDC",
        decimals: 18,
        address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        isStable: true,
        coingeckoUrl: "https://www.coingecko.com/en/coins/usd-coin",
        imageUrl: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      },
      {
        name: "Tether",
        symbol: "USDT",
        decimals: 18,
        address: "0x55d398326f99059fF775485246999027B3197955",
        isStable: true,
        coingeckoUrl: "https://www.coingecko.com/en/coins/tether",
        imageUrl: "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png",
      },
      {
        name: "XRP Token",
        symbol: "XRP",
        decimals: 18,
        address: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      // Should me check again!
      {
        name: "Dogecoin",
        symbol: "DOGE",
        decimals: 18,
        address: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Polkadot Token",
        symbol: "DOT",
        decimals: 18,
        address: "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "TRON",
        symbol: "TRX",
        decimals: 18,
        address: "0x85eac5ac2f758618dfa09bdbe0cf174e7d574d5b",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Avalanche",
        symbol: "AVAX",
        decimals: 18,
        address: "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Shiba BSC",
        symbol: "SHIBSC",
        decimals: 18,
        address: "0xdF0816CC717216c8B0863aF8d4f0fC20Bc65d643",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "LEO",
        symbol: "LEO",
        decimals: 18,
        address: "0xda38d8facd3875daad437839308f1885646dfbb6",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Crypto.Com",
        symbol: "CRO",
        decimals: 18,
        address: "0xfc24e97d43d35a23486be3f6fdba8c22fd454b48",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
        address: "0x208f71de1ac756340c94b473701fcd621e8a51ec",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "FTT",
        symbol: "FTT",
        decimals: 18,
        address: "0x8921B8f398449CBedF15AA974DAda631bBc44f6c",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "LinkitCoin",
        symbol: "LTC",
        decimals: 9,
        address: "0xd92daffec8fd03fb14b245b889690e4734e9b837",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "LINK",
        symbol: "LINK",
        decimals: 18,
        address: "0x8e772ebbe49be116c4b18bcb020c254b22b70670",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "XCN",
        symbol: "XCN",
        decimals: 18,
        address: "0x9d5cebcbad254d7d9eed599f5a4e098be5b3f5ef",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "XLM-Token",
        symbol: "XLM",
        decimals: 18,
        address: "0x905c78711d7715cc93844c2f9c5063cd18beda18",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "BCH",
        symbol: "BCH",
        decimals: 9,
        address: "0x559E249C87d2af9e1d5895Ac6b6147Bf954939CD",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "MONERO",
        symbol: "XMR",
        decimals: 9,
        address: "0x559E249C87d2af9e1d5895Ac6b6147Bf954939CD",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Near",
        symbol: "NEAR",
        decimals: 9,
        address: "0x3bd3e6c14875eba8eb163692493e54b919d347d7",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Ethereum Classic",
        symbol: "ETC",
        decimals: 18,
        address: "0x3d6545b08693daE087E957cb1180ee38B9e3c25E",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "ALGO",
        symbol: "ALGO",
        decimals: 9,
        address: "0x0741Dd15F9F1BFAcc54FACA4E4AC7638757eaff9",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Cosmos",
        symbol: "ATOM",
        decimals: 9,
        address: "0x0eb3a705fc54725037cc9e008bdede697f62f335",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "FLOW",
        symbol: "FLOW",
        decimals: 18,
        address: "0xc943c5320b9c18c153d1e2d12cc3074bebfb31a2",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "UNI Token",
        symbol: "UNI",
        decimals: 18,
        address: "0x36c09a20a5ccc9a3130541e4418b3792349c7612",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Binance-Peg VeChain Token",
        symbol: "VET",
        decimals: 18,
        address: "0xa9d810e5555c2951239efe7a3245ef3c1b4ca8cf",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Theta Fuel",
        symbol: "TFUEL",
        decimals: 18,
        address: "0x9a68f4a8ede33a2b984ec96712e961a830387fb1",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "HBAR",
        symbol: "HBAR",
        decimals: 18,
        address: "0xae104efa05a2379061741674a662d193cb9a6f07",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "XTC Token",
        symbol: "XTC",
        decimals: 18,
        address: "0x8546F0926fEDf6b2cbA7db8BE361f4C370f1BD65",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Frax",
        symbol: "FRAX",
        decimals: 18,
        address: "0x90C97F71E18723b0Cf0dfa30ee176Ab653E89F40",
        coingeckoUrl: "https://www.coingecko.com/en/coins/xrp",
        imageUrl: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
      },
      {
        name: "Solidity",
        symbol: "SOL",
        decimals: 18,
        address: "0x6d2e7780ffd79f98163f30187dc67267792c78e1",
        coingeckoUrl: "https://www.coingecko.com/en/coins/solidly",
        imageUrl: "https://assets.coingecko.com/markets/images/832/small/Solidly.jpeg",
      },
  ]
}
const TOKENS_MAP = {};
const CHAIN_IDS = [56];

const TOKENS_BY_SYMBOL_MAP = {};
for (let j = 0; j < CHAIN_IDS.length; j++) {
    const chainId = CHAIN_IDS[j];
    TOKENS_MAP[chainId] = {};
    TOKENS_BY_SYMBOL_MAP[chainId] = {};
    let tokens = TOKENS[chainId];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      TOKENS_MAP[chainId][token.address] = token;
      TOKENS_BY_SYMBOL_MAP[chainId][token.symbol] = token;
    }
  }
export function getTokens(chainId) {
    return TOKENS[chainId];
}

export function getWhitelistedTokens(chainId) {
    return TOKENS[chainId].filter((token) => token.symbol !== "USDG");
}
export function getTokenBySymbol(chainId, symbol) {
    const token = TOKENS_BY_SYMBOL_MAP[chainId][symbol];
    if (!token) {
      throw new Error(`Incorrect symbol "${symbol}" for chainId ${chainId}`);
    }
    return token;
}

export function getToken(chainId, address) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`);
  }
  if (!TOKENS_MAP[chainId][address]) {
    throw new Error(`Incorrect address "${address}" for chainId ${chainId}`);
  }
  return TOKENS_MAP[chainId][address];
}


export function isValidToken(chainId, address) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`);
  }
  return address in TOKENS_MAP[chainId];
}