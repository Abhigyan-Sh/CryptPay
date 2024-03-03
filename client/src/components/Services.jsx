import { FaShieldVirus } from 'react-icons/fa'
import { FaStudiovinari } from 'react-icons/fa'
import { GiHand } from 'react-icons/gi'
import { BsSearch } from 'react-icons/bs'

const ServiceCard = ({color, title, icon, subtitle}) => {
    return (
        <div className="flex-3 flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
            <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
                {icon}
            </div>
            <div className="ml-5 flex flex-col flex-1">
                <h3 className="mt-2 text-white text-lg">{title}</h3>
                <p className="mt-1 text-white text-sm md:w-9/12">
                    {subtitle}
                </p>
            </div>
        </div>
        // <div className='flex mf:flex-row flex-col justify-center items-center'></div>
    )
}
const Services = () => {
    return (
        <div className='flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services text-white p-3'>
            {/* so having flex-col otherwise for medium devices having flex-row */}
            <div className='flex-1 flex mf:flex-row flex-col item-center justify-between md:p-20 py-12 px-4'>
                <div className='flex-1 flex flex-col justify-start items-start'>
                    <h1 className='text-white text-3xl sm:text-5xl py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                        {/* size 3xl but on small devices 5xl */}
                        {/* using text-gradient: make txt transparent, bg-clip-text, apply gradient */}
                        Services provided by 
                        <br/>
                        crypt app
                    </h1>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-start item-center'>
            <ServiceCard
                color="bg-sky-500"
                // color="bg-[#2952E3]"
                title="Secure transactions"
                icon={<FaShieldVirus fontSize={21} className="text-white" />}
                subtitle="Security is one thing that everyone in the world is always concerned about.In a time where all the data is easily available on the internet, it becomes mandatory to pay special attention to it."
            />
            <ServiceCard
                color="bg-amber-300"
                title="Speed helps you scale."
                icon={<FaStudiovinari fontSize={21} className="text-black" />}
                subtitle="Cryptos are disrupting traditional wire transfers which can take hours, days, or even weeks to clear. While digital funds offer frictionless and faster cross-border solutions."
            />
            <ServiceCard
                color="bg-rose-200"
                // color="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                title="Trust worthy ?"
                icon={<GiHand fontSize={21} className="text-black" />}
                subtitle="crypto provides swift transactions which can be traced down to the users and can be used to provide any legal proof of a ownership of balance."
            />
            <ServiceCard
                color="bg-violet-500"
                title="Traceability"
                icon={<BsSearch fontSize={21} className="text-white" />}
                subtitle="Blockchain-based traceability has the potential to identify counterfeits or fake transactions, tracking/tracing product origin, and supply chain activities at the same time can ease paperwork processing."
            />
            </div>
        </div>
    )
}

export default Services