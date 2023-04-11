
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../store";
import * as Web3 from 'web3'
import { BUSD_ADDRESS, STAKING_CONTRACT_ADDRESS, ETH_CONTRACT_ADDRESS , ETH_ADDRESS, USDT_CONTRACT_ADDRESS , USDT_ADDRESS, BNB_CONTRACT_ADDRESS } from '../constant';
import { WalletContext } from "../context/wallet";
import { BUSDABI, STAKING_POOL, ETHABI, ETH_STAKING_POOL, USDTABI, USDT_STAKING_POOL, BNB_STAKING_POOL } from '../abi';
import BigNumber from "bignumber.js";
import useClipboard from "react-use-clipboard";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Dropdown from 'react-bootstrap/Dropdown';

const Home = () => {
    const global = useContext(StoreContext);
    const [walletAddress] = useContext(WalletContext);
    const [link] = useState("gemstone.abc/stake/?ref=");
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [referralAddress, setReferralAddress] = useState('');
    const [isCopied, setCopied] = useClipboard(link + walletAddress);

    const [balance, setBalance] = useState(0);
    const [ETH_balance, setETH_Balance] = useState(0);
    const [USDT_balance, setUSDT_Balance] = useState(0);
    const [BNB_balance, setBNB_Balance] = useState(0);
    
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [ETH_withdrawAmount, setETH_WithdrawAmount] = useState(0);
    const [USDT_withdrawAmount, setUSDT_WithdrawAmount] = useState(0);
    const [BNB_withdrawAmount, setBNB_WithdrawAmount] = useState(0);
    
    const [reward, setReward] = useState(0);
    const [ETH_reward, setETH_Reward] = useState(0);
    const [USDT_reward, setUSDT_Reward] = useState(0);
    const [BNB_reward, setBNB_Reward] = useState(0);

    const [totalAmount, setTotalAmount] = useState(0);
    const [ETH_totalAmount, setETH_TotalAmount] = useState(0);
    const [USDT_totalAmount, setUSDT_TotalAmount] = useState(0);
    const [BNB_totalAmount, setBNB_TotalAmount] = useState(0);


    const [tvl, setTVL] = useState(0);
    const [ETH_tvl, setETH_TVL] = useState(0);
    const [USDT_tvl, setUSDT_TVL] = useState(0);
    const [BNB_tvl, setBNB_TVL] = useState(0);
    
    const [referralAmount, setReferralAmount] = useState(0);
    const [ETH_referralAmount, setETH_ReferralAmount] = useState(0);
    const [USDT_referralAmount, setUSDT_ReferralAmount] = useState(0);
    const [BNB_referralAmount, setBNB_ReferralAmount] = useState(0);

    const [referralCount, setReferralCount] = useState(0);
    const [ETH_referralCount, setETH_ReferralCount] = useState(0);
    const [USDT_referralCount, setUSDT_ReferralCount] = useState(0);
    const [BNB_referralCount, setBNB_ReferralCount] = useState(0);

    const web3 = new Web3(window.ethereum);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
        setCopied(link + walletAddress);
    };

    useEffect(() => {
        if (!global.walletConnected) {
            initialize();
        }
    }, [global.walletConnected])

    useEffect(() => {
        const getBalances = async () => {
            if (walletAddress === "" || walletAddress === null) {
                setBalance(0);
                setETH_Balance(0);
                setBNB_Balance(0);
                setUSDT_Balance(0);

            } else {
                // BUSD
                const contract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
                const userBalance = await contract.methods.balanceOf(walletAddress).call();
                setBalance((userBalance / (10 ** 18)).toFixed(2));
                // ETH
                const ETH_contract = new web3.eth.Contract(ETHABI, ETH_ADDRESS);
                const ETH_userBalance = await ETH_contract.methods.balanceOf(walletAddress).call();
                setETH_Balance((ETH_userBalance / (10 ** 18)).toFixed(4));
                // USDT
                const USDT_contract = new web3.eth.Contract(USDTABI, USDT_ADDRESS);
                const USDT_userBalance = await USDT_contract.methods.balanceOf(walletAddress).call();
                setUSDT_Balance((USDT_userBalance / (10 ** 18)).toFixed(4));
                // BNB
                const BNB_userBalance = await web3.eth.getBalance(walletAddress);
                setBNB_Balance((BNB_userBalance / (10 ** 18)).toFixed(4));
            }
        }
        getBalances();
    }, [web3?.eth, walletAddress])

    useEffect(() => {
        const getInit = async () => {
            const Url = window.location.href;
            let urls = Url.split('=');
            if (urls.length > 1 && urls[1] === 'BONUS') {
                setReferralAddress('0xB770be217e2B446C546857e1109f2B0FB65af45C');
            } else if (urls.length > 1 && urls[1] === 'GOLD') {
                setReferralAddress('0x767Ff070900F76bA9e3bfBC6Cd3B7c797d2ff1cf');
            } else if (urls.length > 1 && urls[1] !== '') {
                setReferralAddress(urls[1]);
            }
            // BUSD POOL
            const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            let temp = await stakingContract.methods.calcWithdraw(walletAddress).call({ from: walletAddress });
            setWithdrawAmount(temp / (10 ** 18).toFixed(2));
            temp = await stakingContract.methods.calcReward(walletAddress).call({ from: walletAddress });
            setReward((temp / (10 ** 18)).toFixed(2));
            temp = await stakingContract.methods.getTotalDeposit(walletAddress).call({ from: walletAddress });
            setTotalAmount((temp / (10 ** 18)).toFixed(2));
            temp = await stakingContract.methods.getUserReferralCount(walletAddress).call({ from: walletAddress });
            setReferralCount(temp);
            temp = await stakingContract.methods.getTotalReferral(walletAddress).call({ from: walletAddress });
            setReferralAmount((temp / (10 ** 18)).toFixed(2));

            // ETH POOL
            const ETHContract = new web3.eth.Contract(ETH_STAKING_POOL, ETH_CONTRACT_ADDRESS);
            let temp1 = await ETHContract.methods.calcWithdraw(walletAddress).call({ from: walletAddress });
            setETH_WithdrawAmount(temp1 / (10 ** 18).toFixed(5));
            temp1 = await ETHContract.methods.calcReward(walletAddress).call({ from: walletAddress });
            setETH_Reward((temp1 / (10 ** 18)).toFixed(5));
            temp1 = await ETHContract.methods.getTotalDeposit(walletAddress).call({ from: walletAddress });
            setETH_TotalAmount((temp1 / (10 ** 18)).toFixed(5));
            temp1 = await ETHContract.methods.getUserReferralCount(walletAddress).call({ from: walletAddress });
            setETH_ReferralCount(temp1);
            temp1 = await ETHContract.methods.getTotalReferral(walletAddress).call({ from: walletAddress });
            setETH_ReferralAmount((temp1 / (10 ** 18)).toFixed(5));

            // USDT POOL
            const USDTContract = new web3.eth.Contract(USDT_STAKING_POOL, USDT_CONTRACT_ADDRESS);
            let temp2 = await USDTContract.methods.calcWithdraw(walletAddress).call({ from: walletAddress });
            setUSDT_WithdrawAmount( temp2 / (10 ** 18).toFixed(2));
            temp2 = await USDTContract.methods.calcReward(walletAddress).call({ from: walletAddress });
            setUSDT_Reward((temp2 / (10 ** 18)).toFixed(2));
            temp2 = await USDTContract.methods.getTotalDeposit(walletAddress).call({ from: walletAddress });
            setUSDT_TotalAmount((temp2 / (10 ** 18)).toFixed(2));
            temp2 = await USDTContract.methods.getUserReferralCount(walletAddress).call({ from: walletAddress });
            setUSDT_ReferralCount(temp2);
            temp2 = await USDTContract.methods.getTotalReferral(walletAddress).call({ from: walletAddress });
            setUSDT_ReferralAmount((temp2 / (10 ** 18)).toFixed(2));

            // BNB POOL
            const BNBContract = new web3.eth.Contract(BNB_STAKING_POOL, BNB_CONTRACT_ADDRESS);
            let temp3 = await BNBContract.methods.calcWithdraw(walletAddress).call({ from: walletAddress });
            setBNB_WithdrawAmount(temp3 / (10 ** 18).toFixed(4));
            temp3 = await BNBContract.methods.calcReward(walletAddress).call({ from: walletAddress });
            setBNB_Reward((temp3 / (10 ** 18)).toFixed(4));
            temp3 = await BNBContract.methods.getTotalDeposit(walletAddress).call({ from: walletAddress });
            setBNB_TotalAmount((temp3 / (10 ** 18)).toFixed(4));
            temp3 = await USDTContract.methods.getUserReferralCount(walletAddress).call({ from: walletAddress });
            setBNB_ReferralCount(temp3);
            temp3 = await USDTContract.methods.getTotalReferral(walletAddress).call({ from: walletAddress });
            setBNB_ReferralAmount((temp3 / (10 ** 18)).toFixed(2));
        }
        if (walletAddress !== '')
            getInit();
    }, [walletAddress, web3?.eth, isCopied])

    const initialize = () => {
        setBalance(0)
        setETH_Balance(0)
        setUSDT_Balance(0)
        setBNB_Balance(0)
        setTotalAmount(0)
        setETH_TotalAmount(0)
        setUSDT_TotalAmount(0)
        setBNB_TotalAmount(0)
        setReferralCount(0)
        setReferralAmount(0)
        setReward(0)
        setETH_Reward(0)
        setUSDT_Reward(0)
        setBNB_Reward(0)
    }
    
    // BUSD funcs
    const approve = async () => {
        try {
            const busdContract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
            const depositContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            const allowance = await busdContract.methods.allowance(walletAddress, STAKING_CONTRACT_ADDRESS).call();
            if (parseInt(allowance) < amount * 10 ** 18)
                await busdContract.methods.approve(STAKING_CONTRACT_ADDRESS, BigNumber(amount * 10 ** 18).toFixed().toString()).send({ from: walletAddress });

            if (referralAddress === '')
                await depositContract.methods.userDeposit(walletAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                    from: walletAddress,
                });

            else await depositContract.methods.userDeposit(referralAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                from: walletAddress,
            });

            global.setLoad(true);

        } catch (err) {
            console.log(err);
        }
    }

    const getReward = async () => {
        const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
        await stakingContract.methods.withdrawReward().send({ from: walletAddress });
    }

    const withDrawDeposit = async () => {
        if (amount !== '0') {
            const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
            await stakingContract.methods.withdrawDeposit((BigNumber(amount) * 10 ** 18).toString()).send({ from: walletAddress });
        } else {
            alert("Please enter invalid number!");
        }
    }

    const withdrawReferral = async () => {
        if (global.token === 'USDT') return withdrawReferralUSDT();
        else if (global.token === 'ETH') return withdrawReferralETH();
        else if (global.token === 'BNB') return withdrawReferralBNB();
        const stakingContract = new web3.eth.Contract(STAKING_POOL, STAKING_CONTRACT_ADDRESS);
        await stakingContract.methods.withdrawReferral().send({ from: walletAddress });
    }

    // ETH Func
    const approveETH = async () => {
        try {
            const ETHContract = new web3.eth.Contract(ETHABI, ETH_ADDRESS);
            const ETH_depositContract = new web3.eth.Contract(ETH_STAKING_POOL, ETH_CONTRACT_ADDRESS);
            const allowance = await ETHContract.methods.allowance(walletAddress, ETH_CONTRACT_ADDRESS).call();
            if (parseInt(allowance) < amount * 10 ** 18)
                await ETHContract.methods.approve(ETH_CONTRACT_ADDRESS, BigNumber(amount * 10 ** 18).toFixed().toString()).send({ from: walletAddress });
            console.log(referralAddress);
            console.log('ETH_depositContract', ETH_depositContract);
            if (referralAddress === '')
                await ETH_depositContract.methods.userDeposit(walletAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                    from: walletAddress,
                });

            else await ETH_depositContract.methods.userDeposit(referralAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                from: walletAddress,
            });

            global.setLoad(true);

        } catch (err) {
            console.log(err);
        }
    }

    const getRewardETH = async () => {
        const ETH_depositContract = new web3.eth.Contract(ETH_STAKING_POOL, ETH_CONTRACT_ADDRESS);
        await ETH_depositContract.methods.withdrawReward().send({ from: walletAddress });
    }

    const withDrawDepositETH = async () => {
        if (amount !== '0') {
            const ETH_depositContract = new web3.eth.Contract(ETH_STAKING_POOL, ETH_CONTRACT_ADDRESS);
            await ETH_depositContract.methods.withdrawDeposit((BigNumber(amount) * 10 ** 18).toString()).send({ from: walletAddress });
        } else {
            alert("Please enter invalid number!");
        }
    }

    const withdrawReferralETH = async () => {
        const ETH_depositContract = new web3.eth.Contract(ETH_STAKING_POOL, ETH_CONTRACT_ADDRESS);
        await ETH_depositContract.methods.withdrawReferral().send({ from: walletAddress });
    }

    // USDT funcs
    const approveUSDT = async () => {
        try {
            const USDTContract = new web3.eth.Contract(USDTABI, USDT_ADDRESS);
            const USDT_depositContract = new web3.eth.Contract(USDT_STAKING_POOL, USDT_CONTRACT_ADDRESS);
            const allowance = await USDTContract.methods.allowance(walletAddress, USDT_CONTRACT_ADDRESS).call();
            if (parseInt(allowance) < amount * 10 ** 18)
                await USDTContract.methods.approve(USDT_CONTRACT_ADDRESS, BigNumber(amount * 10 ** 18).toFixed().toString()).send({ from: walletAddress });
            console.log(referralAddress);
            console.log('USDT_depositContract', USDT_depositContract);
            if (referralAddress === '')
                await USDT_depositContract.methods.userDeposit(walletAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                    from: walletAddress,
                });

            else await USDT_depositContract.methods.userDeposit(referralAddress, BigNumber(amount * 10 ** 18).toFixed().toString()).send({
                from: walletAddress,
            });

            global.setLoad(true);

        } catch (err) {
            console.log(err);
        }
    }

    const getRewardUSDT = async () => {
        const USDT_depositContract = new web3.eth.Contract(USDT_STAKING_POOL, USDT_CONTRACT_ADDRESS);
        await USDT_depositContract.methods.withdrawReward().send({ from: walletAddress });
    }

    const withDrawDepositUSDT = async () => {
        if (amount !== '0') {
            const USDT_depositContract = new web3.eth.Contract(USDT_STAKING_POOL, USDT_CONTRACT_ADDRESS);
            await USDT_depositContract.methods.withdrawDeposit((BigNumber(amount) * 10 ** 18).toString()).send({ from: walletAddress });
        } else {
            alert("Please enter invalid number!");
        }
    }

    const withdrawReferralUSDT = async () => {
        const USDT_depositContract = new web3.eth.Contract(USDT_STAKING_POOL, USDT_CONTRACT_ADDRESS);
        await USDT_depositContract.methods.withdrawReferral().send({ from: walletAddress });
    }

    // BNB funcs
    const approveBNB = async () => {
        try {
            const BNB_depositContract = new web3.eth.Contract(BNB_STAKING_POOL, BNB_CONTRACT_ADDRESS);
            if (referralAddress === '')
                await BNB_depositContract.methods.userDeposit(walletAddress).send({from: walletAddress, value: BigNumber(amount * 10 ** 18).toFixed().toString()});
            else await BNB_depositContract.methods.userDeposit(referralAddress).send({from: walletAddress, value: BigNumber(amount * 10 ** 18).toFixed().toString()});
            global.setLoad(true);
        } catch (err) {
            console.log(err);
        }
    }

    const getRewardBNB = async () => {
        const BNB_depositContract = new web3.eth.Contract(BNB_STAKING_POOL, BNB_CONTRACT_ADDRESS);
        await BNB_depositContract.methods.withdrawReward().send({ from: walletAddress });
    }

    const withDrawDepositBNB = async () => {
        if (amount !== '0') {
            const BNB_depositContract = new web3.eth.Contract(BNB_STAKING_POOL, BNB_CONTRACT_ADDRESS);
            await BNB_depositContract.methods.withdrawDeposit((BigNumber(amount) * 10 ** 18).toString()).send({ from: walletAddress });
        } else {
            alert("Please enter invalid number!");
        }
    }

    const withdrawReferralBNB = async () => {
        const BNB_depositContract = new web3.eth.Contract(BNB_STAKING_POOL, BNB_CONTRACT_ADDRESS);
        await BNB_depositContract.methods.withdrawReferral().send({ from: walletAddress });
    }

    useEffect(() => {
        const init = async () => {
            // BUSD
            const contract = new web3.eth.Contract(BUSDABI, BUSD_ADDRESS);
            const tvl = await contract.methods.balanceOf(STAKING_CONTRACT_ADDRESS).call();
            setTVL((tvl / (10 ** 18)).toFixed(2));
            // ETH
            const ETH_contract = new web3.eth.Contract(ETHABI, ETH_ADDRESS);
            const ETH_tvl = await ETH_contract.methods.balanceOf(ETH_CONTRACT_ADDRESS).call();
            setETH_TVL((ETH_tvl / (10 ** 18)).toFixed(5));
            // USDT
            const USDT_contract = new web3.eth.Contract(USDTABI, USDT_ADDRESS);
            const USDT_tvl = await USDT_contract.methods.balanceOf(USDT_CONTRACT_ADDRESS).call();
            setUSDT_TVL((USDT_tvl / (10 ** 18)).toFixed(2));
            // BNB

            const BNB_userBalance = await web3.eth.getBalance(BNB_CONTRACT_ADDRESS);
            setBNB_TVL((BNB_userBalance / (10 ** 18)).toFixed(4));
        }
        init();

        const intervalId = setInterval(() => {
            init();
        }, 1000 * 30) // in milliseconds
        return () => clearInterval(intervalId)
    }, [web3?.eth])

    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);

    const [ETH_modalShow, setETH_ModalShow] = useState(false);
    const [ETH_modalShow1, setETH_ModalShow1] = useState(false);

    const [USDT_modalShow, setUSDT_ModalShow] = useState(false);
    const [USDT_modalShow1, setUSDT_ModalShow1] = useState(false);

    const [BNB_modalShow, setBNB_ModalShow] = useState(false);
    const [BNB_modalShow1, setBNB_ModalShow1] = useState(false);

    return (
        <div className="mb-5">
            <div className="section section--pb0 section--first">
                <div className="section__article-head"> 
                </div>
            </div>

            <div className="section section--article mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-4 mb-3 ">
                            <div className="staking staking-first">
                                <div className="d-flex">
                                    <div>
                                        <img src="../../teth.png" alt="" />
                                    </div>
                                    <div className="staking__info staking__info_USDT align-self-center">
                                        { global.lan === false ? <h2>USDT Farming</h2> : <h2>USDT Ферма</h2> }
                                        { global.lan === false ? <p>Stake USDT - Earn USDT</p> : <p>Инвестировать - Зарабатывать USDT</p> }
                                    </div>
                                </div>
                            </div>
                            <div className="staking-center">
                                <div className="staking-apr d-flex justify-content-between">
                                    <div className="d-flex">
                                        <span className="staking-apr-letter">APR</span>
                                        <i className="mx-2 fa fa-calculator"></i>
                                        <i className="fa fa-question-circle-o"></i>
                                    </div>
                                    <span className="staking-apr-letter">912,5%</span>

                                </div>

                                <div className='staking-main d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>Staked USDT</p> : <p>Стейкинг USDT</p> }
                                        <span>{USDT_totalAmount} USDT</span>
                                    </div>
                                    <div>
                                        <button className="mobile_staking-plus-active" onClick={() => setUSDT_ModalShow(true)}>+</button>
                                        <button className="mobile_staking-plus" onClick={() => setUSDT_ModalShow1(true)}>-</button>
                                    </div>
                                </div>
                                <div className='staking-reward d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>EARN USDT</p> : <p>Награда USDT</p> }
                                        <span>{USDT_reward} USDT</span>
                                    </div>
                                    <div className="mobile_staking-plus-minus">
                                        { global.lan === false ? <button className="mobile_staking-withdraw" onClick={getRewardUSDT}>Withdraw</button>
                                         : <button className="mobile_staking-withdraw" onClick={getRewardUSDT}>Вывести</button> }
                                    </div>
                                </div>
                                <div className="staking-note">
                                    { global.lan === false ? <p>3% deposit fee</p> : <p>3% комиссия за депозит</p> }
                                    { global.lan === false ? <p>3% withdraw fee</p> : <p>3% вывести за депозит</p> }
                                    <div className="d-flex justify-content-between mt-4">
                                        { global.lan === false ? <span className="stake-slash">Total staked&nbsp;&nbsp;------------------------------------- &nbsp;&nbsp;</span>
                                        : <span className="stake-slash" style={{ fontSize:'13px !important'}}>Общий депозит&nbsp;&nbsp;-------------------------------- &nbsp;&nbsp;</span> }
                                        <span className="total-right d-flex" style={{ fontSize:'14px'}}> {USDT_tvl}</span>
                                    </div>
                                </div>  
                                <div className="staking-main" style={{ marginBottom:'20px'}}>
                                    { global.lan === false ? <a href='https://bscscan.com/address/0x2dBF363f1244296E79455218928C475F95835Fc3' target='_blank' rel="noreferrer">View Contract</a>
                                    : <a href='https://bscscan.com/address/0x2dBF363f1244296E79455218928C475F95835Fc3' target='_blank' rel="noreferrer">Посмотреть Контракт</a> }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 mb-3 ">
                            <div className="staking staking-first">
                                <div className="d-flex">
                                    <div>
                                        <img src="../../bnb_logo.png" alt="" />
                                    </div>
                                    <div className="staking__info align-self-center">
                                        { global.lan === false ? <h2>BNB Farming</h2> : <h2>BNB Ферма</h2> }
                                        { global.lan === false ? <p>Stake BNB - Earn BNB</p> : <p>Инвестировать - Зарабатывать BNB</p> }
                                    </div>
                                </div>
                            </div>
                            <div className="staking-center">
                                <div className="staking-apr d-flex justify-content-between">
                                    <div className="d-flex">
                                        <span className="staking-apr-letter">APR</span>
                                        <i className="mx-2 fa fa-calculator"></i>
                                        <i className="fa fa-question-circle-o"></i>
                                    </div>
                                    <span className="staking-apr-letter">912,5%</span>

                                </div>

                                <div className='staking-main d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>Staked BNB</p> : <p>Стейкинг BNB</p> }
                                        <span>{BNB_totalAmount} BNB</span>
                                    </div>
                                    <div>
                                        <button className="mobile_staking-plus-active" onClick={() => setBNB_ModalShow(true)}>+</button>
                                        <button className="mobile_staking-plus" onClick={() => setBNB_ModalShow1(true)}>-</button>
                                    </div>
                                </div>
                                <div className='staking-reward d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>EARN BNB</p> : <p>Награда BNB</p> }
                                        <span>{BNB_reward} BNB</span>
                                    </div>
                                    <div className="mobile_staking-plus-minus">
                                        { global.lan === false ? <button className="mobile_staking-withdraw" onClick={getRewardBNB}>Withdraw</button>
                                         : <button className="mobile_staking-withdraw" onClick={getRewardBNB}>Вывести</button> }
                                    </div>
                                </div>
                                <div className="staking-note">
                                    { global.lan === false ? <p>3% deposit fee</p> : <p>3% комиссия за депозит</p> }
                                    { global.lan === false ? <p>3% withdraw fee</p> : <p>3% вывести за депозит</p> }
                                    <div className="d-flex justify-content-between mt-4">
                                        { global.lan === false ? <span className="stake-slash">Total staked&nbsp;&nbsp;------------------------------------- &nbsp;&nbsp;</span>
                                        : <span className="stake-slash" style={{ fontSize:'13px !important'}}>Общий депозит&nbsp;&nbsp;------------------------------------- &nbsp;&nbsp;</span> }
                                        <span className="total-right d-flex" style={{ fontSize:'14px'}}> {BNB_tvl}</span>
                                    </div>
                                </div>  
                                <div className="staking-main" style={{ marginBottom:'20px'}}>
                                    { global.lan === false ? <a href='https://bscscan.com/address/0x490a78Bf169dC15deb6CD86D9f44879099244753' target='_blank' rel="noreferrer">View Contract</a>
                                    : <a href='https://bscscan.com/address/0x490a78Bf169dC15deb6CD86D9f44879099244753' target='_blank' rel="noreferrer">Посмотреть Контракт</a> }
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-4 mb-3 ">
                            <div className="staking staking-first">
                                <div className="d-flex">
                                    <div>
                                        <img src="../../eth.png" alt="" />
                                    </div>
                                    <div className="staking__info align-self-center">
                                        { global.lan === false ? <h2>ETH Farming</h2> : <h2>ETH Ферма</h2> }
                                        { global.lan === false ? <p>Stake ETH - Earn ETH</p> : <p>Инвестировать - Зарабатывать ETH</p> }
                                    </div>
                                </div>
                            </div>
                            <div className="staking-center">
                                <div className="staking-apr d-flex justify-content-between">
                                    <div className="d-flex">
                                        <span className="staking-apr-letter">APR</span>
                                        <i className="mx-2 fa fa-calculator"></i>
                                        <i className="fa fa-question-circle-o"></i>
                                    </div>
                                    <span className="staking-apr-letter">912,5%</span>

                                </div>

                                <div className='staking-main d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>Staked ETH</p> : <p>Стейкинг ETH</p> }
                                        <span>{ETH_totalAmount} ETH</span>
                                    </div>
                                    <div>
                                        <button className="mobile_staking-plus-active" onClick={() => setETH_ModalShow(true)}>+</button>
                                        <button className="mobile_staking-plus" onClick={() => setETH_ModalShow1(true)}>-</button>
                                    </div>
                                </div>
                                <div className='staking-reward d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>EARN ETH</p> : <p>Награда ETH</p> }
                                        <span>{ETH_reward} ETH</span>
                                    </div>
                                    <div className="mobile_staking-plus-minus">
                                        { global.lan === false ? <button className="mobile_staking-withdraw" onClick={getRewardETH}>Withdraw</button>
                                         : <button className="mobile_staking-withdraw" onClick={getRewardETH}>Вывести</button> }
                                    </div>
                                </div>
                                <div className="staking-note">
                                    { global.lan === false ? <p>3% deposit fee</p> : <p>3% комиссия за депозит</p> }
                                    { global.lan === false ? <p>3% withdraw fee</p> : <p>3% вывести за депозит</p> }
                                    <div className="d-flex justify-content-between mt-4">
                                        { global.lan === false ? <span className="stake-slash">Total staked&nbsp;&nbsp;-------------------------------------&nbsp;&nbsp;</span>
                                        : <span className="stake-slash" style={{ fontSize:'13px !important'}}>Общий депозит&nbsp;&nbsp;------------------------------------- &nbsp;&nbsp;</span> }
                                        <span className="total-right d-flex" style={{ fontSize:'14px'}}> {ETH_tvl}</span>
                                    </div>
                                </div>  
                                <div className="staking-main" style={{ marginBottom:'20px'}}>
                                    { global.lan === false ? <a href='https://bscscan.com/address/0x8e44AA687DF401515dcdF38e0D9fE070CdDcbd28' target='_blank' rel="noreferrer">View Contract</a>
                                    : <a href='https://bscscan.com/address/0x8e44AA687DF401515dcdF38e0D9fE070CdDcbd28' target='_blank' rel="noreferrer">Посмотреть Контракт</a> }
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="section section--article section_article_mt">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-2">
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="staking staking-first">
                                <div className="d-flex">
                                    <div>
                                        <img src="../../mark.png" alt="" />
                                    </div>
                                    <div className="staking__info align-self-center">
                                        { global.lan === false ? <h2>BUSD Farming</h2> : <h2>BUSD Ферма</h2> }
                                        { global.lan === false ? <p>Stake BUSD - Earn BUSD</p> : <p>Инвестировать - Зарабатывать BUSD</p> }
                                    </div>
                                </div>
                            </div>
                            <div className="staking-center">
                                <div className="staking-apr d-flex justify-content-between">
                                    <div className="d-flex">
                                        <span className="staking-apr-letter">APR</span>
                                        <i className="mx-2 fa fa-calculator"></i>
                                        <i className="fa fa-question-circle-o"></i>
                                    </div>
                                    <span className="staking-apr-letter">912,5%</span>

                                </div>

                                <div className='staking-main d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>Staked BUSD</p> : <p>Стейкинг BUSD</p> }
                                        <span>{totalAmount} BUSD</span>
                                    </div>
                                    <div>
                                        <button className="mobile_staking-plus-active" onClick={() => setModalShow(true)}>+</button>
                                        <button className="mobile_staking-plus" onClick={() => setModalShow1(true)}>-</button>
                                    </div>
                                </div>
                                <div className='staking-reward d-flex justify-content-between'>
                                    <div className="staking-main-first">
                                        { global.lan === false ? <p>EARN BUSD</p> : <p>Награда BUSD</p> }
                                        <span>{reward} BUSD</span>
                                    </div>
                                    <div className="staking-plus-minus">
                                        { global.lan === false ? <button className="mobile_staking-withdraw" onClick={getReward}>Withdraw</button>
                                         : <button className="mobile_staking-withdraw" onClick={getReward}>Вывести</button> }
                                    </div>
                                </div>
                                <div className="staking-note">
                                    { global.lan === false ? <p>3% deposit fee</p> : <p>3% комиссия за депозит</p> }
                                    { global.lan === false ? <p>3% withdraw fee</p> : <p>3% вывести за депозит</p> }
                                    <div className="d-flex justify-content-between mt-4">
                                        { global.lan === false ? <span className="stake-slash">Total staked&nbsp;&nbsp;------------------------------------- &nbsp;&nbsp;</span>
                                        : <span className="stake-slash" style={{ fontSize:'13px !important'}}>Общий депозит&nbsp;&nbsp;------------------------------------- &nbsp;&nbsp;</span> }
                                        <span className="total-right d-flex"> {tvl}</span>
                                    </div>
                                </div>  
                                <div className="staking-main" style={{ marginBottom:'20px'}}>
                                    { global.lan === false ? <a href='https://bscscan.com/address/0x333602758Af0B007769923dF8A0deb55B876ab2E' target='_blank' rel="noreferrer">View Contract</a>
                                    : <a href='https://bscscan.com/address/0x333602758Af0B007769923dF8A0deb55B876ab2E' target='_blank' rel="noreferrer">Посмотреть Контракт</a> }
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-4 mb-5">
                            <div className="staking staking--second">
                                { global.lan === false ? <h2>My Referral Link</h2> : <h2>Моя реферальная ссылка</h2> }
                                <div className="referral-link-input">
                                    <input type='text' value={link + walletAddress} className="input referal-url-input" name="referral" readOnly />
                                    <div>
                                        <Grid container justifyContent="center">
                                            <Grid item>
                                                <ClickAwayListener onClickAway={handleTooltipClose}>
                                                    <div>
                                                        <Tooltip
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={handleTooltipClose}
                                                            open={open}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title="Copied!"
                                                            arrow
                                                        >
                                                            <img src="/regclone.svg" className="button copyLink" alt="" onClick={handleTooltipOpen} onMouseOut={handleTooltipClose} />
                                                        </Tooltip>
                                                    </div>
                                                </ClickAwayListener>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                { global.lan ===false ? <div className="get-referral text-center">
                                    <p>You will get</p>
                                    <span>3%</span>
                                    <p>from every win of </p><p>your referral</p>
                                </div>
                                : <div className="get-referral text-center">
                                    <p>Вы будете получать</p>
                                    <span>3%</span>
                                    <p>с каждого выигрыша </p><p>вашего реферала</p>
                                </div> }
                                <div className="your-referral d-flex justify-content-between">
                                    { global.lan === false ? <span>Your Referrals</span> : <span>Ваши рефералы</span> }
                                    <span>{global.token === 'BUSD'? referralCount : global.token === 'USDT' ? USDT_referralCount : global.token === 'BNB' ? BNB_referralCount : global.token === 'ETH' ? ETH_referralCount : ''}</span>
                                </div>
                            </div>
                            
                            <div className="staking_referral withdraw-referral">
                                { global.lan === false ? <h4>Farm Referrals</h4> : <h4>Рефералы фермы</h4> }
                                <div className="d-flex justify-content-between referral_dropdown">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic" size='sm' className='mr-2 px-2'>
                                            {global.token}                                        
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='ml-3 text-center'>
                                            <Dropdown.Item href="#" className={ global.token === 'BUSD' ? 'active' : ''} onClick={() => global.setToken('BUSD')}>BUSD</Dropdown.Item>
                                            <Dropdown.Item href="#" className={ global.token === 'USDT' ? 'active' : ''} onClick={() => global.setToken('USDT')}>USDT</Dropdown.Item>
                                            <Dropdown.Item href="#" className={ global.token === 'BNB' ? 'active' : ''} onClick={() => global.setToken('BNB')}>BNB</Dropdown.Item>
                                            <Dropdown.Item href="#" className={ global.token === 'ETH' ? 'active' : ''} onClick={() => global.setToken('ETH')}>ETH</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> 
                                    <div>
                                        <p>{global.token === 'BUSD'? referralAmount : global.token === 'USDT' ? USDT_referralAmount : global.token === 'BNB' ? BNB_referralAmount : global.token === 'ETH' ? ETH_referralAmount : ''}</p>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between referral-button">
                                    { global.lan === false ? <button className="mobile_staking-withdraw" onClick={withdrawReferral}>Withdraw</button> :
                                    <button className="mobile_staking-withdraw-ru" onClick={withdrawReferral} style={{ fontSize:'16px'}}>реферальная награда</button> } 
                                    <div>
                                        <img src="/staking-logo-blue.svg" alt=""/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <WithdrawModal
                    withdrawAmount={USDT_withdrawAmount}
                    withDrawDeposit={withDrawDepositUSDT}
                    setamount={setAmount}
                    amount={amount}
                    show={USDT_modalShow1}
                    global={global.lan}
                    tokenname = 'USDT'
                    onHide={() => setUSDT_ModalShow1(false)}
                />
                <DepositModal
                    approve={approveUSDT}
                    balance={USDT_balance}
                    setamount={setAmount}
                    amount={amount}
                    show={USDT_modalShow}
                    global={global.lan}
                    tokenname = 'USDT'
                    onHide={() => setUSDT_ModalShow(false)}
                />
                <WithdrawModal
                    withdrawAmount={BNB_withdrawAmount}
                    withDrawDeposit={withDrawDepositBNB}
                    setamount={setAmount}
                    amount={amount}
                    show={BNB_modalShow1}
                    global={global.lan}
                    tokenname = 'BNB'
                    onHide={() => setBNB_ModalShow1(false)}
                />
                <DepositModal
                    approve={approveBNB}
                    balance={BNB_balance}
                    setamount={setAmount}
                    amount={amount}
                    show={BNB_modalShow}
                    global={global.lan}
                    tokenname = 'BNB'
                    onHide={() => setBNB_ModalShow(false)}
                />
                <WithdrawModal
                    withdrawAmount={ETH_withdrawAmount}
                    withDrawDeposit={withDrawDepositETH}
                    setamount={setAmount}
                    amount={amount}
                    show={ETH_modalShow1}
                    global={global.lan}
                    tokenname = 'ETH'
                    onHide={() => setETH_ModalShow1(false)}
                />
                <DepositModal
                    approve={approveETH}
                    balance={ETH_balance}
                    setamount={setAmount}
                    amount={amount}
                    show={ETH_modalShow}
                    global={global.lan}
                    tokenname = 'ETH'
                    onHide={() => setETH_ModalShow(false)}
                />
                <WithdrawModal
                    withdrawAmount={withdrawAmount}
                    withDrawDeposit={withDrawDeposit}
                    setamount={setAmount}
                    amount={amount}
                    show={modalShow1}
                    global={global.lan}
                    tokenname = 'BUSD'
                    onHide={() => setModalShow1(false)}
                />
                <DepositModal
                    approve={approve}
                    balance={balance}
                    setamount={setAmount}
                    amount={amount}
                    show={modalShow}
                    global={global.lan}
                    tokenname = 'BUSD'
                    onHide={() => setModalShow(false)}
                />
            </div>

        </div>
    )
}

function DepositModal(props) {

    const { balance, setamount, amount, approve, global, tokenname } = props;

    const handleConfirm = () => {
        props.onHide();
        approve();
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    { global === false ? <span className="modal-title">Stake {tokenname} Tokens</span> 
                        :<span className="modal-title">Размещайте {tokenname} токены</span> }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="busd-form d-flex flex-column">
                    { global === false ? <span className="text-right">{balance} {tokenname} Available</span>
                        : <span className="text-right">{balance} {tokenname} Доступно</span> }
                    <div style={{ textAlign:'right'}}>
                        <input type="number" className="input-busd" value={amount} placeholder="0.00" onChange={(e) => setamount(e.target.value)} />
                        <button className='max-amount' onClick={() => setamount(balance)}>Max</button> <span className="busd-symbol">{tokenname}</span>
                    </div>
                </div>
                <div className="modal-btn-group">
                    { global === false ? <Button className="cancel-btn" onClick={props.onHide}>Cancel</Button>
                        : <Button className="cancel-btn" onClick={props.onHide}>Отмена</Button> }
                    { global === false ? <Button className="confirm-btn" onClick={handleConfirm}>Confirm</Button>
                        : <Button className="confirm-btn" onClick={handleConfirm}>Подтвердите</Button> }
                </div>

            </Modal.Body>
        </Modal>
    );
}

function WithdrawModal(props) {

    const { withdrawAmount, setamount, amount, withDrawDeposit, global, tokenname } = props;

    const handleDeposit = () => {
        props.onHide();
        withDrawDeposit();
    }
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    { global === false ? <span className="modal-title">Withdraw {tokenname} Tokens</span> 
                        :<span className="modal-title">Вывести {tokenname} токены</span> }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="busd-form d-flex flex-column">
                    { global === false ? <span className="text-right">{withdrawAmount} {tokenname} Available</span>
                        : <span className="text-right">{withdrawAmount} {tokenname} Доступно</span> }
                    <div style={{ textAlign:'right'}}>
                        <input type="number" className="input-busd" value={amount} onChange={(e) => setamount(e.target.value)} placeholder="0.00" />
                        <button className='max-amount' onClick={() => setamount(withdrawAmount)}>Max</button> <span className="busd-symbol">{tokenname}</span>
                    </div>
                </div>
                <div className="modal-btn-group">
                    { global === false ? <Button className="cancel-btn" onClick={props.onHide}>Cancel</Button>
                        : <Button className="cancel-btn" onClick={props.onHide}>Отмена</Button> }
                    { global === false ? <Button className="confirm-btn" onClick={handleDeposit}>Confirm</Button>
                        : <Button className="confirm-btn" onClick={handleDeposit}>Подтвердите</Button> }
                </div>

            </Modal.Body>
        </Modal>
    );
}


export default Home;
