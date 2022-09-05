import { useContext } from "react";
import { TransactionContext } from "../context/TransferContext";
import dummyData from '../utils/dummyData';
import ShortenAddress from '../utils/ShortenAddress';
import useFetch from '../hooks/useFetch';

const TransactionCard = ({keyword, message, timestamp, addressFrom, amount, addressTo}) => {
    console.log(keyword)
    const gifUrl= useFetch(keyword);
    console.log(gifUrl)
    
    return (
        <div className="text-white bg-[#181918] m-4 flex flex-1
        2xl:min-w-[450px]
        2xl:max-w-[500px]
        sm:min-w-[270px]
        sm:max-w-[300px]
        flex-col p-3 rounded-md hover:shadow-2xl
        ">
            {/* on 2xl devices: .... */}
            {/* rounded but medium */}
            {/* 
            <div>                     background black
                <div>         another div containing text img text and text having bg
                    <div>
                        <a>
                            <p></p>
                        </a>

                        <a>
                            <p></p>
                        </a>

                        <p></p>
                        {message && ()}
                    </div>

                    <img>

                    <div>
                        <p></p>
                    </div>
                </div>
            </div> 
            */}
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target= "_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">
                            {/* text-base just a text size
                            since `` are only in js so go js mode using {} */}
                            from: {ShortenAddress(addressFrom)}
                            {/* simply call like a function */}
                        </p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target= "_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">
                            to: {ShortenAddress(addressTo)}
                        </p>
                    </a>
                    <p className="text-white text-base">
                        Amount: {amount}
                    </p>
                    {message && (
                    <>
                        <br/>
                        <p className="text-white text-base">
                            message: {message}
                        </p>
                    </>
                    )}
                </div>
                <img src= {gifUrl || 'url'} 
                alt= 'gif'
                className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
                // 2xl sized devices will have h-96
                />
                <div className="bg-black p-3 rounded-full px-5 w-max mt-5 shadow-2xl">
                    <p className="text-[#e389b9] ">
                        {timestamp}
                    </p>
                </div>
            </div>
        </div>
    )
}

const Transaction = () => {
    const { currentAccount, transactions } = useContext(TransactionContext)
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            {/* padding 20 on extra large devices */}
            <div className="flex flex-col md:p-12 py-12 px-4">
                {/* on medium devices padding 12 */}
                {currentAccount ? (
                    <h1 className="text-white text-3xl text-center my-2">Latest Transactions..</h1>
                ) : (
                    <h1 className="text-white text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                        Connect your wallet to see more..
                    </h1>
                )
                }
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {/* {dummyData.reverse().map((eachDataObj, i) => { */}
                    {transactions.reverse().map((eachDataObj, i) => {
                        return (
                        <TransactionCard key={i} {...eachDataObj}/>
                    )
                    })}
                </div>
            </div>
        </div>
    );
}
export default Transaction;