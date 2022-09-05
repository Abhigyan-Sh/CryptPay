import { useEffect, useState } from 'react'

const useFetch = (keyword) => {
    const [gifUrl, setGifUrl] = useState('')
    console.log(keyword)
    function fetchGifs () {
        let APIKEY= import.meta.env.VITE_YOUR_API;
        console.log(APIKEY)
        // return new Promise (function (resolve, reject) {
        //     let gifUrl= fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`)
        // })
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword}&limit=1&offset=0&rating=g&lang=en`)
        .then(to_data => to_data.json())
        .then((data) => {
            console.log(data.data[0].images.downsized_medium.url)
            setGifUrl(data.data[0].images.downsized_medium.url)
        })
        // .then(data => setGifUrl(data[0]?.images?.downsized_medium.url))
        .catch(error => console.log(error))
        // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${id.split(" ").join("")}&limit=1`)
    }
    // 
    useEffect(() => {
        if (keyword) fetchGifs()
    }, [keyword])

    return gifUrl;
}

export default useFetch;
/* things out of react scopes like making an api call are called as side effects in react
so you can imagine when a function which renders is called since some changes were 
there but since the call is also placed in this function so its a loop of infinite 
rendering and hence use useEffect()

i read the docs they were not detailed but were amazing, they tell what all can be 
done and i liked their Search Endpoint feature the most.
 */

/* 
Probably because you have a free account and they only have access to a whitelist of sites.
thus we get 403 error.
Giphy turned on bot protection
 */