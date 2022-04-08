import React from 'react';
import {useAddress, useDisconnect, useMetamask} from "@thirdweb-dev/react";
import {log} from "util";



const NftDropContentPage = () => {

//*********************************************************************
    /**
     * ---AUTH---
     */
    // Данным хуком мы определяем вход через метаданные - (METAMASKA)!!!
    const withConnectMetaMask = useMetamask()
    //Для настройки адреса!!!
    const address = useAddress()
    //Для выхода использовать хук
    const disconnect = useDisconnect()
//*********************************************************************

    //Для кнопки
    const connectMetaMask = () => {
       return  withConnectMetaMask()
    }
    const disconnectMetaMask = () => {
       return  disconnect()
    }

    //Чекаем, зашли мы или нет
    console.log(address)

     return (
        <>
            <div className='flex flex-col h-screen lg:grid lg:grid-cols-10'>
                {/*Content-Left*/}
                <div className='bg-gradient-to-br from-cyan-800 to-rose-500
            lg:col-span-4 border-r-[4px] border-amber-400
            '>
                    <div className='flex flex-col items-center justify-center
                py-2 lg:min-h-screen
                '>
                        <div className='rounded-xl bg-gradient-to-br from-yellow-400 to-purple-600 p-2'>
                            <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72'
                                 src="https://links.papareact.com/8sg" alt="monkey"/>
                        </div>
                        <div className='space-y-2 text-center p-5'>
                            <h1 className='text-3xl font-bold text-white'>Коллекция картинок (тестовая)</h1>
                            <h2 className='text-xl text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit.
                            </h2>
                        </div>
                    </div>

                </div>



                {/*Content-Right*/}
                <div className='flex flex-1 flex-col p-12 lg: col-span-6
                bg-gradient-to-r from-green-400 to-blue-500
                '>

                    <header className='flex items-center justify-between'>

                        <h1 className='w-52 cursor-pointer font-bold text-xl sm:w-80 text-white'>
                            Магазин картинок{' '}
                            <span className='font-extrabold  text-gray-700
                            '> Капуцин</span>
                        </h1>
                        <button onClick={ address ? disconnectMetaMask : connectMetaMask} className='rounded-full bg-orange-600 text-white px-4
                py-2 text-xs font-bold lg:px-5 lg:py-3 Lg:text-base'>
                            {address ? 'Выйти' : 'Войти'}
                        </button>
                    </header>
                    <hr className='my-2 border border-gray-300'/>

                    {address && <p className='text-center pt-2 text-xl text-pink-700/80'>Вы вошли с помощью кошелька:
                        {address.substring(0, 14)}...{address.substring(address.length - 5)}</p>}

                    {/*Content*/}
                    <div className='flex flex-1 flex-col mt-10 items-center space-y-6
                    text-center lg:space-y-0 lg: justify-center
                    '>
                        <img className='w-[336px] object-cover pb-10 lg: h-[328px] rounded-lg'
                             src="https://links.papareact.com/bdy" alt="monkey"/>
                        <h1 className='font-bold text-3xl text-white'>
                            NFT продажа картинок || Магазин <span className='font-bold text-gray-800'>
                            Капуцин</span></h1>

                        <p className='pt-2 text-xl text-pink-700/80'>Выполнено 13/27 NFT картинок</p>
                    </div>

                    {/*Button*/}
                    <button className='rounded-full bg-orange-600 text-white px-4
                py-2 text-xl font-bold lg:px-5 lg:py-3 Lg:text-base'>Счёт NFT(0.01 ETH)</button>
                </div>
            </div>
        </>
    )
        ;
};

export default NftDropContentPage;
