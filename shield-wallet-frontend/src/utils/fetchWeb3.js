import Web3 from "web3";

export const fetchWeb3 = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask to use this dApp!");
            throw Error("MetaMask not installed");
        }
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        return web3;
}