import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ContractUtils from '../utils/contractUtils';
import { StoreContext } from '../store';
import { WalletContext } from '../context/wallet';

const Header = () => {
    const global = useContext(StoreContext);
    const [walletAddress, setWalletAddress] = useContext(WalletContext);
    

    useEffect(() => {
        const address = localStorage.getItem("walletLocalStorageKey");
        if (address)
            setWalletAddress(address);
    }, [walletAddress, setWalletAddress])

    const onClickConnect = async () => {
        let res = await ContractUtils.connectWallet();
        if (res.address) {
            global.setShowToast(true);
            setWalletAddress(res.address);
            window.localStorage.setItem('walletLocalStorageKey', res.address);
        }
        else {
            global.setShowToast(true);
            setWalletAddress("");
        }
    }

    const onClickDisconnect = async () => {
        await ContractUtils.disconnectWallet();
        await window.localStorage.removeItem('walletLocalStorageKey');
        global.setShowToast(false);
        setWalletAddress("");
        window.location.reload();
    }

    return (
        <>
            <header className="header">
                <div className="container-cthu">
                    <div className="row">
                        <div className="col-12">
                            <div className="header__content">
                                <a href="/" className="header__logo">
                                    <img src="/logo2.png" alt=""/>          
                                </a>
                                <ul className='navbar-left'>
                                    <a  href='https://t.me/cthulhu_chat' target='_blank' rel="noreferrer"><li className='nav-send me-2'><i className='fa fa-send'></i></li></a>
                                    <a  href='https://cthulhu-farm.gitbook.io/cthulhu-farm/' target='_blank' rel="noreferrer">
                                        <li className='nav-user me-2'>
                                            <img src='../../svgs/Path3.svg' alt='' />
                                        </li>
                                    </a>
                                    <a  href='https://Twitter.com/CthulhuFarm' target='_blank' rel="noreferrer"><li className='nav-twitter me-2'><i className='fa fa-twitter'></i></li></a>
                                    <a href='https://github.com/CthulhuFarm' target='_blank' rel="noreferrer"><li className='nav-twitter me-2'><i className='fa fa-github'></i></li></a>
                                </ul>
                                <ul className="header__nav" id="header__nav" style={{ marginLeft:'20px'}}>
                                    <li>
                                        { global.lan === false ? <Link to="/home">HOME</Link>
                                        : <Link to="/home" style={{ marginLeft:'-30px'}}>Главная</Link> }
                                    </li>
                                    <li>
                                        { global.lan === false ?<Link to="/stake">STAKE</Link>
                                        : <Link to="/stake" >Фарминг</Link> }
                                    </li>
                                    <li>
                                        { global.lan === false ?<Link to="/faqs">FAQs</Link>
                                        : <Link to="/faqs" >FAQs</Link> }
                                    </li>
                                    
                                </ul>
                                { global.lan === false ? <button className='nav-button' onClick={() => global.setLan(true)}>
                                    <img src='/language-white.png' alt='' />
                                </button>
                                :<button className='nav-button' onClick={() => global.setLan(false)}>
                                    <img src='/language-white.png' alt='' />
                                </button>}
                                <button className="header__cta">
                                    {walletAddress === '' ?
                                        <>
                                            { global.lan === false ? <span onClick={() => onClickConnect()}>CONNECT</span>
                                            : <span onClick={() => onClickConnect()} style={{ fontSize:'12px'}}>ПОДКЛЮЧИТЬ</span> }
                                        </>
                                        :
                                        <>
                                            <span onClick={() => onClickDisconnect()}>{walletAddress.substr(0, 4)}...{walletAddress.slice(38)}</span>
                                        </>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;