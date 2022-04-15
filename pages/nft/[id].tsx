import React from 'react';
import {useAddress, useDisconnect, useMetamask} from "@thirdweb-dev/react";
import {GetServerSideProps} from "next";
import {sanityClient, urlFor} from "../../sanity";
import {Collection} from "../../typing";
import Link from "next/link";


interface Props {
    collections: Collection
}

const NftDropContentPage = ({collections}: Props) => {

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
        return withConnectMetaMask()
    }
    const disconnectMetaMask = () => {
        return disconnect()
    }

    //Чекаем, зашли мы или нет
    console.log(address)
    // console.log("check token", process.env.REACT_APP_SANITY_PROJECT_ID)
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
                                 src={urlFor(collections.previewImage).url()}
                                 alt="monkey"/>
                        </div>
                        <div className='space-y-2 text-center p-5'>
                            <h1 className='text-3xl font-bold text-white'>
                                {collections.title}
                            </h1>
                            <h2 className='text-xl text-gray-300'>
                                {collections.description}
                            </h2>
                        </div>
                    </div>
                </div>


                {/*Content-Right*/}
                <div className='flex flex-1 flex-col p-12 lg: col-span-6
                bg-gradient-to-r from-green-400 to-blue-500
                '>
                    {/*Header*/}
                    <header className='flex items-center justify-between'>
                        <Link href={'/'}>
                            <h1 className='w-52 cursor-pointer font-bold text-xl sm:w-80 text-white'>
                                Магазин крипты: {' '}
                                <span className='font-extrabold  text-gray-700
                            '> Сapuchin</span>
                            </h1>
                        </Link>
                        <button onClick={address ? disconnectMetaMask : connectMetaMask} className='rounded-full bg-orange-600 text-white px-4
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
                             src={urlFor(collections.mainImage).url()}
                             alt="monkey"/>
                        <h1 className='font-bold text-3xl text-white'>
                            {collections.nftCollectionName} <span className='font-bold text-gray-800'>
                            Сapuchin</span></h1>

                        <p className='pt-2 text-xl text-pink-700/80'>Выполнено 13/27 NFT картинок</p>
                    </div>

                    {/*Button*/}
                    <button className='rounded-full bg-orange-600 text-white px-4
                py-2 text-xl font-bold lg:px-5 lg:py-3 Lg:text-base'>Счёт NFT(0.01 ETH)
                    </button>
                </div>
            </div>
        </>
    )
        ;
}
export default NftDropContentPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const queryParams = `*[_type == "collection" && slug.current == $id][0]{
                      _id,
                      title,
                      address,
                      description,
                      nftCollectionName,
                      mainImage{
                      asset
                    },
                    previewImage{
                        asset
                    },
                      slug{
                            current
                      },
                      creator-> {
                        _id,
                         name,
                        address,
                            slug {
                                current
                            },
                        },
                    }`
    const queryParamsTwo = `*[_type == "collectionTwo" && slug.current == $id][0]{
                      _id,
                      title,

                      address,
                      description,
                      nftCollectionName,
                      mainImage{
                      asset
                    },
                    previewImage{
                      asset
                    },
                      slug{
                        current
                      },
                      creator-> {
                      _id,
                      name,
                      address,
                        slug {
                        current
                      },
                     },
                    }`

    const collections = await sanityClient.fetch(queryParams, {id: params?.id})
    const collectionsTwo = await sanityClient.fetch(queryParamsTwo, {id: params?.id})

    if (!collections && !collectionsTwo) return {notFound: true}

    return {
        props: {
            collections,
            collectionsTwo
        }
    }
}