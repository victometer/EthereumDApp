import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'

//create a React context, so the rest of app can interact with it. It will contain all ETH transaction related functions
export const TransactionContext = React.createContext()

// grab the ethereum object from the metamask browser extension
const { ethereum } = window
console.log(window.ethereum)


//create a function that sets up an instance of the Ethereum contract
const getEthereumContract = () => {
    if(!ethereum) {
        throw new Error('Ethereum object is not available')
    }
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    console.log(`Hey, I'm ethereum ${ethereum}`)

    return transactionContract

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract
    // })
}

//Create a component that will make use of the getEthereumContract()
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''})

    //all handleChange functions that deal with input accept an e (event) as an argument - the event of typing
    const handleChange = (e, name) => {
        //updating the old state with the new requires a callback function: 2 arguments -> 1.prevState, 2.a copy of the array/object(in this case), using the old state and the value(key:value in this case) you're updating it with.
        setFormData((prevState) => ({...prevState, [name]: e.target.value}))
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask')
            //show all accounts connected via MetaMask
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if (accounts.length) {
                setCurrentAccount(accounts[0])
                console.log(accounts[0])
                //get all transactions
            }
            else {
                console.log('No accounts found')
            }
        }
        catch {
            console.log(error)
            throw new Error('No ethereum object.')
        }

    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install Metamask')
            // request all metamask accounts, so that the user can choose one
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            
            setCurrentAccount(accounts[0])

        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object.')
        }
    }
    // logic for sending and storing transactions
    const sendTransaction = async () => {
        try {
            // await getEthereumContract()
            if (!ethereum) return alert('Please install Metamask')
            // get the data from the form in Welcome
            const {addressTo, amount, keyword, message} = formData
            const transactionContract = getEthereumContract()
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object.')
        }
    }
    useEffect(() => {
        checkIfWalletIsConnected()
        console.log("The use effect ran")
    }, [])



    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}