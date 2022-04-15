// import React from 'react';
// import {urlFor} from "../sanity";
// import {CollectionType} from "./index";
// import Link from "next/link";
//
// const ApesComponent = (props: CollectionType) => {
//     return (
//         <>
//             <main className="bg-state-100 p-10 shadow-2xl shadow-gray-400/50">
//                 <div className='grid mx-20 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2'>
//                     <div>
//                         {props.collections.map(collection => (
//                             <Link href={`nft/${collection.slug.current}`}>
//                             <div className='flex flex-col items-center transition-all duration-200
//                         hover:scale-105 cursor-pointer'
//                                  key={collection._id}>
//
//                                 <img className='h-96 w-60 rounded-2xl object-cover'
//                                      src={urlFor(collection.mainImage).url()} alt="image"/>
//                                 <div className='p-5'>
//                                     <h2 className='text-3xl'>{collection.title}</h2>
//                                     <p className='mt-2 text-sm text-gray-400'>{collection.description}</p>
//                                 </div>
//                             </div>
//                             </Link>
//                         ))}
//                     </div>
//                     {props.collectionsTwo.map(collection => (
//                         <Link href={`nft/${collection.slug.current}`}>
//                         <div className='flex flex-col items-center transition-all duration-200
//                         hover:scale-105 cursor-pointer'
//                              key={collection._id}>
//
//                             <img className='h-96 w-60 rounded-2xl object-cover'
//                                  src={urlFor(collection.mainImage).url()} alt="image"/>
//                             <div className='p-5'>
//                                 <h2 className='text-3xl'>{collection.title}</h2>
//                                 <p className='mt-2 text-sm text-gray-400'>{collection.description}</p>
//                             </div>
//                         </div>
//                             </Link>
//                     ))}
//                 </div>
//             </main>
//
//         </>
//     );
// };
//
//
// export default ApesComponent;


