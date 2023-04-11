const pancakeSwapAbi =  [
    {"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},
    ];
    const tokenAbi = [
    {"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    ];
const Web3 = require('web3');

const tokens = [
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
        name: "Wrapped Binance Coin",
        symbol: "BNB",
        decimals: 18,
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        isWrapped: true,
        coingeckoUrl: "https://www.coingecko.com/en/coins/binance-coin",
        imageUrl: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
        baseSymbol: "BNB",
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
        name: "Solidity",
        symbol: "SOL",
        decimals: 18,
        address: "0x570a5d26f7765ecb712c0924e4de545b89fd43df",
        coingeckoUrl: "https://www.coingecko.com/en/coins/solidly",
        imageUrl: "https://assets.coingecko.com/markets/images/832/small/Solidly.jpeg",
      },
]

const pancakeSwapContract = "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase();

async function calcSell( tokensToSell, tokenAddres){
    const web3 = new Web3("https://bsc-dataseed1.binance.org");
    const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" //BNB

    const tokenRouter = await new web3.eth.Contract( tokenAbi, tokenAddres );
    const tokenDecimals = await tokenRouter.methods.decimals().call();
    
    tokensToSell = setDecimals(tokensToSell, tokenDecimals);
    let amountOut;
    try {
        const router = await new web3.eth.Contract( pancakeSwapAbi, pancakeSwapContract );
        amountOut = await router.methods.getAmountsOut(tokensToSell, [tokenAddres ,BNBTokenAddress]).call();
        amountOut =  web3.utils.fromWei(amountOut[1]);
    } catch (error) {}
    
    if(!amountOut) return 0;
    return amountOut;
}

async function calcBNBPrice(){
    const web3 = new Web3("https://bsc-dataseed1.binance.org");
    const BNBTokenAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" //BNB
    const USDTokenAddress  = "0x55d398326f99059fF775485246999027B3197955" //USDT
    const bnbToSell = web3.utils.toWei("1", "ether") ;
    let amountOut;
    try {
        let router = await new web3.eth.Contract( pancakeSwapAbi, pancakeSwapContract );
        amountOut = await router.methods.getAmountsOut(bnbToSell, [BNBTokenAddress ,USDTokenAddress]).call();
        amountOut =  web3.utils.fromWei(amountOut[1]);
    } catch (error) {}
    if(!amountOut) return 0;
    return amountOut;
}

function setDecimals( number, decimals ){
    number = number.toString();
    const numberAbs = number.split('.')[0]
    let numberDecimals = number.split('.')[1] ? number.split('.')[1] : '';
    while( numberDecimals.length < decimals ){
        numberDecimals += "0";
    }
    return numberAbs + numberDecimals;
}

export const getTokenPrice = async() => {
    return await Promise.all(tokens.map(async(token) => {
        // let price = 0;
        // const tokenAddres = token.address;
        // const bnbPrice = await calcBNBPrice() // query pancakeswap to get the price of BNB in USDT
        // const tokens_to_sell = 1; 
        // const priceInBnb = await calcSell(tokens_to_sell, tokenAddres)/tokens_to_sell; // calculate TOKEN price in BNB
        // const daily = await getDailyChange(tokenAddres);
        let daily = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        daily = await daily.json();
        daily = daily.filter((item) => {

          return (item.symbol === (token.symbol + 'USDT'))
        })
        console.log(daily)
        // if(token.symbol === 'BNB'){
        //     price = Number(bnbPrice).toFixed(2);
        // }else{
        //     price = Number(priceInBnb*bnbPrice).toFixed(2);
        // }
        return {...token, changePercent: Number(daily[0].priceChangePercent).toFixed(2), lastPrice: Number(daily[0].lastPrice).toFixed(2)};
    }))
}


const calcDate = (days) => {
    // create Date object for current location
    var d = new Date();
  
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  
    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc - (24 * 60 * 60 * 1000 * days));
  
    // return time as a string
    // return "The local time for city"+ city +" is "+ nd.toLocaleString();
    return nd.getFullYear() + '-' + ('0' + (nd.getMonth() + 1)).slice(-2) + '-' + ('0' + nd.getDate()).slice(-2);
}

const calcTime = (secs) => {
  // create Date object for current location
  var d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc - (1000*(secs + 10 * 60)));

  // return time as a string
  // return "The local time for city"+ city +" is "+ nd.toLocaleString();
  return nd.getFullYear() + '-' + ('0' + (nd.getMonth() + 1)).slice(-2) + '-' + ('0' + nd.getDate()).slice(-2) + 'T' + ('0' + nd.getHours()).slice(-2) + ':' + ('0' + nd.getMinutes()).slice(-2) + ':' + ('0' + nd.getSeconds()).slice(-2) + ".000Z";//format("YYYY-MM-DDTHH:mm:ss") + ".000Z";
}

export const getDailyChange = async(baseCurrency) => {
    const from =  "\"" + calcTime(60 * 60 * 25) + "\"";
    const to =  "\"" + calcTime(0) + "\"";
    baseCurrency = "\"" + baseCurrency + "\"";
    const query = `
    {
      ethereum(network: bsc) {
        dexTrades(
          date: {in: [${from}, ${to}]}
          options: {limitBy: {each: "baseCurrency.address", limit: 2}}
          baseCurrency: {is: ${baseCurrency}}
          quoteCurrency: {is: "0xe9e7cea3dedca5984780bafc599bd69add087d56"}
          exchangeAddress: {is: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73"}
        ) {
          quotePrice
          count
          tradeAmount(in: USD)
          date {
            date
          }
          baseCurrency {
            address
            name
          }
          quoteCurrency {
            address
            name
          }
        }
      }
    }
    `;
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "BQYGEmleXf1Mb2yGGybFph4pQgRh0bD2"
      },
      body: JSON.stringify({
          query
      })
    };
  
    let res = await fetch("https://graphql.bitquery.io/", opts);
    res = await res.json();
    const result = await res?.data?.ethereum?.dexTrades;
    let dailyChange = 0;
    if(result && result.length > 1){
      dailyChange = 2 * (result[1].quotePrice - result[0].quotePrice) / (result[1].quotePrice + result[0].quotePrice) * 100;
      return dailyChange.toFixed(2);
    }
    return dailyChange;
  }
  