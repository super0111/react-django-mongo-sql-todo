export const BSC_BLOCK_TIME = 3

const MAINNET = 56
const TESTNET = 97

const ChainID = MAINNET;

export const CHAIN_NAME = {
    [MAINNET]: 'BSC Mainnet',
    [TESTNET]: 'BSC Testnet',
}

export const BASE_BSC_SCAN_URLS = {
    [MAINNET]: 'https://bscscan.com',
    [TESTNET]: 'https://testnet.bscscan.com',
}

export const NODE = {
    [MAINNET]: 'https://bsc-dataseed.binance.org',
    [TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
}

export const SortOption = {
    CLASSES: 'Class',
    LEVEL: 'Level',
    GENDER: 'Gender',
    UPPER: 'Headgear Upper',
    MID: 'Headgear Mid',
    LOWER: 'Headgear Lower'
}

export const NATIVE_CURRENCY = {
    [MAINNET]: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
    },
    [TESTNET]: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
    },
}
export const connectorLocalStorageKey = "connectorIdv2"
export const walletLocalStorageKey = "wallet";
export const id = "salary"
export const cakeId = "tether"
export const currency = "usd"
export const baseURLforIPFS = "https://worldofragnarok.mypinata.cloud/"
export const contractAddress = "0xe180c3297C4e3a0cB09027AD42771a6E74b26e03" // WorldOfRagnarok contract address
export const wzenyAddress = "0x670568763731F1cd604c7611907878F1B4956B4d" // WZENY Token address
export const createPartyAddress = "0xc2B0D46351A22CDD6A5aDb41951ae603b2922Ba7" //CreateParty contract address
export const SECOND_TO_START = 864000 // 10 days
export const EndDay = new Date(Date.UTC(2022, 2, 12, 12, 0, 0));

export default {
    ChainID,
    CHAIN_NAME,
    NATIVE_CURRENCY,
    Node: NODE[ChainID],
    WalletLocalStorageKey: walletLocalStorageKey,
    BASE_BSC_SCAN_URLS,
    BaseURLforIPFS: baseURLforIPFS,
    ContractAddress: contractAddress,
    WzenyAddress: wzenyAddress,
    CreatePartyAddress: createPartyAddress,
};