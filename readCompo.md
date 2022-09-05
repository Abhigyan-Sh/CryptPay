<!--                                                                         TO CONNECT TO WALLET (4 files)-->
<!-- main.jsx -->
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TransactionProvider } from './context/TransactionContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>
)
<!-- TransactionContext.jsx -->
import React from 'react'
export const TransactionContext = React.createContext()

const { ethereum } = window

export const TransactionProvider = ({children}) => {
    const ConnectToWallet = () => {
        return (
            ethereum.request({method:'eth_requestAccounts'})
        )
    }
    return (
    <TransactionContext.Provider value= {{ConnectToWallet}}>
        {children}
    </TransactionContext.Provider>
    )
}
<!-- App.jsx -->
import Navbar from "./components/Navbar"
import ConnectWallet from './components/ConnectWallet'

const App= () => {
  return (
      <div className='gradient-bg-services'>
        <Navbar/>
        <ConnectWallet/>
      </div>
  )
}
export default App

<!-- ConnectWallet.jsx (component) -->
import { useContext } from "react"
import { TransactionContext } from "../context/TransactionContext"

const ConnectWallet = () => {
    const { ConnectToWallet } = useContext(TransactionContext)
    return (
        <button onClick={ConnectToWallet} className='text-white white-glassmorphism px-4 p-2 my-3'>
            connect Wallet
        </button>
    )
}
export default ConnectWallet;





<!--  -->
Input passes props
input takes and utilizes props, onChange handles a function which updates formData

<!--  -->
