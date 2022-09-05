import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants'
export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    /*@dev::: built contract */
    // console.log(ethereum)
    // console.log(ethers);
    // console.log({
    //     provider,
    //     signer,
    //     transactionContract
    // });
    return transactionContract;
}
 
export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    // to get form data
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: ''});
    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }))
    }
    const [isLoading, setIsLoading ] = useState(false);
    const [ transactionCount, setTransactionCount ] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    // 
    const getAllTxn = async() => {
        try {
            if (ethereum) {
                const transfer_contract = getEthereumContract()
                const available_transactions = await transfer_contract.getAllTransactions()
                console.log(available_transactions)
                const structured_transactions = available_transactions.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }))
                console.log(structured_transactions);
                setTransactions(structured_transactions)
            }
            else {
                console.log('download ethereum wallet!')
            }
        }
        catch (error) {
            console.log(error)
            throw new Error('no Ethereum object!')
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("please install metamask!")
            const accounts= await ethereum.request({method: 'eth_accounts'});
            console.log(accounts);
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log('No object found!');
            }
            getAllTxn()
        }
        catch (error) {
            console.log(error);
            throw new error('No ethereum object!');
        }
    }
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("please install metamask!")
            const accounts= await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
            throw new Error("no ethereum object.")
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("please install metamask!");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract= getEthereumContract();
            // send transaction
            const parsedAmount= ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',
                    value: parsedAmount._hex,
                }]
            });
            // add to blockchain
            const transactionHash= await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            location.reload()
        } catch (error) {
            console.log(error);
            throw new error ('no ethereum object!')
        }
    }

    const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
    };
    
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);
    return (
        <TransactionContext.Provider value= {{connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    );
}
/* first {} to enter js mode, second {} to make object */