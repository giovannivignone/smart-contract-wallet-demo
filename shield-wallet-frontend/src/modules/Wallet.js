import "styles/inputBox.css";
import { fetchWeb3 } from "utils/fetchWeb3";
import "../styles/wallet.css";
import securityServiceCompiled from "../constants/abis/ShieldSafetyService.json";
import walletCompiled from "../constants/abis/BaseCoinMasterWallet.json";
import { useEffect, useState } from "react";

export const Wallet = ({ address }) => {
    const [data, setData] = useState({ guardians: null, threshold: null, balance: null });
    useEffect(async() => {
        const { balance, guardians, threshold } = await getWalletData();
        setData({ balance, guardians, threshold });
    }, []);
    const getWalletData = async () => {
        const web3 = await fetchWeb3();
        const balance = await web3.eth.getBalance(address);
        console.log(balance);
        const securityService = new web3.eth.Contract(securityServiceCompiled.abi, process.env.REACT_APP_SINGLETON_SECURITY_SERVICE);
        const guardians = await securityService.methods.totalGuardians(address).call();
        const threshold = await securityService.methods.getGuardianThreshold(address).call();
        return { balance, guardians, threshold };
    }
    const routeToEtherscan = () => {
        window.open(`https://goerli.etherscan.io/address/${address}`, "_blank");
    }
    const lockWallet = async(isLocked) => {
        const web3 = await fetchWeb3();
        const account = (await web3.eth.getAccounts())[0];
        const securityService = new web3.eth.Contract(securityServiceCompiled.abi, process.env.REACT_APP_SINGLETON_SECURITY_SERVICE);
        if (isLocked) {
            return await securityService.methods.unlock(address).send({ from: account });
        }
        return await securityService.methods.lockWallet(address).send({ from: account });
    }
    const walletLocked = async () => {
        const web3 = await fetchWeb3();
        const wallet = new web3.eth.Contract(walletCompiled.abi, address);
        return await wallet.methods.locked().call();
    }
    const handleToggle = async () => {
        const isLocked = await walletLocked();
        const tx = await lockWallet(isLocked);
        console.log(tx);
        return tx;
    }

    return (
            <div className="walletWrapper">
                <div className="address buffered" onClick={routeToEtherscan}>{`${address.slice(0,5)}...${address.slice(-6,-1)}`}</div>
                <div className="balance buffered">Balance: {data.balance}</div>
                <div className="guardians buffered">Total Guardians: {data.guardians}</div>
                <div className="threshold buffered">Threshold: {data.threshold}</div>
                <div className="labelSwitch">Lock Wallet</div>
                <label class="switch" onClick={handleToggle}>
                    <input type="checkbox"/>
                <span class="slider round">
                    
                    </span>
                </label>
        </div>
    );
}