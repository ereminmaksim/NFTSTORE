import React, {useEffect, useState} from 'react';
import {useAddress, useDisconnect, useMetamask, useNFTDrop} from "@thirdweb-dev/react";
import {GetServerSideProps} from "next";
import {sanityClient, urlFor} from "../../sanity";
import {Collection} from "../../typing";
import Link from "next/link";
import {BigNumber} from "ethers";
import toast, {Toaster} from "react-hot-toast";


interface Props {
    collections: Collection
}

const NftDropContentPage = ({collections}: Props) => {
    /**
     * состояние для отлова кол-ва etherium
     */
    const [claimedSupply, setClaimedSupply] = useState<number>(0)
    const [totalCloud, setTotalCloud] = useState<BigNumber>()
    const [priceEth, setPriceEth] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const nftDrop = useNFTDrop(collections.address)

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
//*********************************************************************
    /**
     * рекативное отображение элементов etherium - (точное значение)
     */

    useEffect(() => {
        if (!nftDrop) return

        const fetchPrice = async () => {
            const claimCondition = await nftDrop.claimConditions.getAll()
            setPriceEth(claimCondition?.[0].currencyMetadata.displayValue)
        }
        fetchPrice()
    }, [nftDrop]);

//*********************************************************************


    useEffect(() => {
        if (!nftDrop) return

        const fetchNFTDropp = async () => {
            setLoading(true)
            const claimed = await nftDrop.getAllClaimed()
            const total = await nftDrop.totalSupply()


            setClaimedSupply(claimed.length)
            setTotalCloud(total)
            setLoading(false)
        }

        fetchNFTDropp()
    }, [nftDrop])


    //Чекаем, зашли мы или нет
    // console.log(address)
    // console.log(nftDrop)
    // console.log("check token", process.env.REACT_APP_SANITY_PROJECT_ID)

    const coinageNft = () => {
        if (!nftDrop || !address) return
        const quantity = 1
        setLoading(true)
        const notification = toast.loading("Чеканка монет..", {
            style: {
                background: "white",
                color: "green",
                fontWeight: "bolder",
                fontSize: "17px",
                padding: "20px"
            }
        })


        nftDrop.claimTo(address, quantity).then(async (eth) => {
            const receipt = eth[0].receipt;
            const claimedTokenId = eth[0].id;
            const claimedNFT = eth[0].data();

            toast("Уаууу, успешная чеканка:)!!!", {
                duration: 8000,
                style: {
                    background: "green",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "17px",
                    padding: "20px"
                }
            })

            console.log(receipt)
            console.log(claimedTokenId)
            console.log(claimedTokenId)
            console.log(claimedNFT)

        }).catch(error => {
            toast("К сожелению, не получилось:(", {

                style: {
                    background: "red",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "17px",
                    padding: "20px"
                }
            })
            console.log(error)
        }).finally(() => {
            setLoading(false)
            toast.dismiss(notification)
        })
    }


    return (
        <>
            <div className='flex flex-col h-screen lg:grid lg:grid-cols-10'>
                {/*Content-Left*/}
                <Toaster position='bottom-center'

                />
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

                        {loading ? (
                                <span className='pt-2 text-xl text-pink-700/80'>Загрузка NFT картинок, подождите...</span>
                            ) :
                            <p className='pt-2 text-xl text-pink-700/80'>Выполнено {claimedSupply}/{totalCloud?.toString()} NFT
                                картинок</p>
                        }
                        {loading && (
                            <img className="h-80 w-80 object-contain"
                                // src='https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif' alt='loading'/>
                                 src='https://acegif.com/wp-content/uploads/loading-1.gif' alt='loading'/>
                        )}
                    </div>

                    {/*Button*/}
                    <button onClick={coinageNft}
                            disabled={loading || claimedSupply === totalCloud?.toNumber() || !address}
                            className='rounded-full bg-orange-600 text-white px-4
                py-2 text-xl font-bold lg:px-5 lg:py-3 Lg:text-base disabled:bg-neutral-600'>
                        {loading ? (
                            <span>Загрузка ETH, подождите...</span>
                        ) : claimedSupply === totalCloud?.toNumber() ? (
                            <span>Всё продано</span>
                        ) : !address ? (
                            <span>Войдите в систему</span>
                        ) : (
                            <span className="font-bold">Счёт NFT({priceEth} ETH)</span>
                        )}

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