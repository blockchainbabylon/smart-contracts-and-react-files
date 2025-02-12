import { useState } from "react";
import { ethers } from ethers;

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"
const ABI = [
    {
        "input": [],
        "name": "increment",
        "output": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "input": [],
        "name": "decrement",
        "output": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "input": [],
        "name": "getCount",
        "output": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];

function App() {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [storedValue, setStoredValue] = useState(0);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.send("eth_requestAccounts");
                setAccount(accounts[0]);

                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
                setContract(contractInstance);

                const curentStoredValue = await contractInstance.retrieve();
                setStoredValue(currentStoredValue.toString());
            } catch (error) {
                console.error("Error connection to wallet:", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    const handleStore = async () => {
        if (contract) {
            try {
                const valueToStore = parseInt(prompt("Enter a value to store:"));
                const tx = await contract.store(valueToStore);
                await tx.wait();

                const updatedValue = await contract.retrieve();
                setStoredValue(updatedValue.toString());
            } catch (error) {
                console.error("Error storing value:", error);
            }
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1> Simple Storage DApp</h1>
            <p><strong>Connected Account:</strong> {account || "Not Connected"}</p>
            <h2>Stored Value: {storedValue}</h2>
            <button
                onClick={connectWallet}
                style={{ margin: "10px", padding: "10px 20px" }}
            >
                Connect Wallet
            </button>
            <button 
                onClick={handleStore}
                style={{ margin: "10px", padding: "10px 20px" }}
            >
                Store a Value
            </button>
        </div>
    );
}

export default App;