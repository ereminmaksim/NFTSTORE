import type {GetServerSideProps} from 'next'
import Head from "next/head";
import {sanityClient, urlFor} from '../sanity'
import {Collection} from "../typing";


interface CollectionType {
    collections: Collection[]
}


const Home = ({collections}: CollectionType) => {

    console.log("check token", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

    return (
        <div className=''>
            <Head>
                <title>Crypto Shop</title>
            </Head>

            <h1 className='w-52 cursor-pointer font-bold text-xl sm:w-80 text-white'>
                Магазин картинок{' '}
                <span className='font-extrabold  text-gray-700
                            '> Сapuchin</span>
            </h1>


            <main>
                <div>
                    {collections.map(collection => (
                        <div key={collection._id}>
                        <h1>{collection.title}</h1>
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
    const collections = await sanityClient.fetch(query)
    return {
        props: {
            collections
        }
    }
}