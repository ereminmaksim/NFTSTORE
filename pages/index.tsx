import Head from "next/head";
import {Collection} from "../typing";
// import ApesComponent from "./apes";
import {GetServerSideProps} from "next";
import {sanityClient, urlFor} from "../sanity";
import Link from "next/link";


export interface CollectionType {
    collections: Collection[]
    collectionsTwo: Collection[]
}


const Home = ({collections, collectionsTwo}: CollectionType) => {

    console.log("check token", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

    return (
        <div className='mx-auto max-w-7xl flex min-h-screen flex-col py-40 px-10 2xl:px-0'>
            <Head>
                <title>Crypto Shop</title>
            </Head>

            <h1 className='mb-10 text-4xl font-extralight'>
                Магазин крипты: {' '}
                <span className='font-extrabold  text-gray-700
                            '> Сapuchin</span>
            </h1>
            {/*<ApesComponent*/}
            {/*    collections={collections}*/}
            {/*    collectionsTwo={collectionsTwo}/>*/}
            <main className="bg-state-100 p-10 shadow-2xl shadow-gray-400/50">
                <div className='grid mx-20 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2'>
                    <div>
                        {collections.map(collection => (
                            <div key={collection._id}>
                                <Link href={`nft/${collection.slug.current}`}>
                                    <div className='flex flex-col items-center transition-all duration-200
                        hover:scale-105 cursor-pointer'>

                                        <img className='h-96 w-60 rounded-2xl object-cover'
                                             src={urlFor(collection.mainImage).url()} alt="image"/>
                                        <div className='p-5'>
                                            <h2 className='text-3xl'>{collection.title}</h2>
                                            <p className='mt-2 text-sm text-gray-400'>{collection.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {collectionsTwo.map(collection => (
                        <div key={collection._id}>
                            <Link href={`nft/${collection.slug.current}`}>
                                <div className='flex flex-col items-center transition-all duration-200
                        hover:scale-105 cursor-pointer'>

                                    <img className='h-96 w-60 rounded-2xl object-cover'
                                         src={urlFor(collection.mainImage).url()} alt="image"/>
                                    <div className='p-5'>
                                        <h2 className='text-3xl'>{collection.title}</h2>
                                        <p className='mt-2 text-sm text-gray-400'>{collection.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
    const query = `*[_type == "collection"] {
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
    const queryTwo = `*[_type == "collectionTwo"] {
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
    const collections = await sanityClient.fetch(query)
    const collectionsTwo = await sanityClient.fetch(queryTwo)
    return {
        props: {
            collections,
            collectionsTwo
        }
    }
};
// https://ereminnftcryptoapp.sanity.studio/
