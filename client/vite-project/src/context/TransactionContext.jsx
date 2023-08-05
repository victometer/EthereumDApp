import React, {useEffect, useState} from 'react'
import {ethers} from 'ethers'
import {contractABI, contractAddress} from '../utils/constants'

export const TransactionContext = React.createContext()

const {ethereum} = window

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)

    console.log({
        provider,
        signer,
        transactionContract
    })
}

//Create a context that will make use of the getEthereumContract()
export const TransactionProvider = ({children}) => {
    const [connectedAccount, setConnectedAccount] = useState('')
    
    const checkIfWalletIsConnected = async () => {
        if(!ethereum) return alert('Please install Metamask')
        //show all accounts connected via MetaMask
        const accounts = await ethereum.request({method: 'eth_accounts'})
        console.log(accounts)
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('Please install Metamask')
            // request all metamask accounts, so that the user can choose one
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            setConnectedAccount(accounts[0])
        } catch (error) {
            console.log(error)
            throw new Error('No ethereum object.')
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    return (
        <TransactionContext.Provider value={{connectWallet}}>
            {children}
        </TransactionContext.Provider>
    )
}