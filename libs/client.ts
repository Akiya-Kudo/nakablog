import {createClient} from 'microcms-js-sdk'

export const client = createClient({
    serviceDomain: 'nakagawaseminer',
    apiKey: process.env.API_KEY || '',
})

