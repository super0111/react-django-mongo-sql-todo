import React, { useState } from 'react';

const WalletContext = React.createContext([{}, () => {}]);

const WalletProvider = (props) => {
  const [walletAddress, setWalletAddress] = useState("");
  return (
    <WalletContext.Provider value={[walletAddress, setWalletAddress]}>
      {props.children}
    </WalletContext.Provider>
  );
};

export {WalletContext, WalletProvider};