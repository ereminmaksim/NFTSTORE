// lib/sanity.js
import {createClient} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
/**
 * export const config = {
 *     /**
 *      * Найдите идентификатор проекта и набор данных в файле `sanity.json` в вашем студийном проекте.
 *      * Они считаются “общедоступными”, но вы можете использовать переменные среды
 *      *, если хотите отличаться между локальной разработкой и производством.
 *      *
 *      * https://nextjs.org/docs/basic-features/environment-variables
 *      **/
// dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
// ProjectID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
// apiVersion: '2021-10-21', // Подробнее: https://www.sanity.io/docs/api-versioning
/**
 *      * Установите useCdn в значение "false", если вашему приложению требуется как можно более свежая информация.
 *      * данные всегда (потенциально немного медленнее и немного дороже).
 *      * Аутентифицированный запрос (например, предварительный просмотр) всегда будет обходить CDN
 *      **/
// useCdn: process.env.NODE_ENV === 'production',
// }*/


export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-03-25', // Подробнее: https://www.sanity.io/docs/api-versioning
    useCdn: process.env.NODE_ENV === 'production',
}
// Настройка клиента для извлечения данных на странице getProps функции
export const sanityClient = createClient(config)

/**
 * Настройте вспомогательную функцию для генерации URL-адресов изображений только с ссылочными данными активов в ваших документах.
 * Подробнее: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source)
