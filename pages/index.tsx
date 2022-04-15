import Head from "next/head";
import {Collection} from "../typing";
import ApesComponent from "./apes";
import {GetServerSideProps} from "next";
import {sanityClient} from "../sanity";



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
            <ApesComponent
                collections={collections}
                collectionsTwo={collectionsTwo}/>
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

