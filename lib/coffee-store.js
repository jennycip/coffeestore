import { createApi } from 'unsplash-js';

// on your node server
/*
const unsplash = createApi({
    accessKey: 'Dn_TvRORIs3f3l9DoRNUApDqmv19uHmNkFmGWrWa_Pg',
    //...other fetch options
});
*/

const getUrlForCoffeeStores = (latLong, query, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
};

/*
const getListOfCoffeePhotos = async () => {
    const photos = await unsplash.search.getPhotos({
        query: "coffee shop",
        page: 1,
        perPage: 10,
        color: "green",
    });


    const unsplashResults = photos.response.results;

    return unsplashResults.map((result) => result.urls["small"]
    );

}
*/

export const fetchCooffeeStores = async (
    latLong = "43.76531006196805%2C11.202170306466355",
    limit = 6
) => {
    //const photos = await getListOfCoffeePhotos();
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3G9eNTC87kfwRNyu+y6FfL8j3w6YXAfOjR6AwDVVHZnI=',
        }
    };

    const responce = await fetch(
        getUrlForCoffeeStores(latLong, "bar", limit),
        options
    );

    const data = await responce.json()
    //.catch(err => console.error(err));
    console.log(data, "data");

    return data.results.map((result, idx) => {
        console.log('RESULT', result, idx);
        return {
            id: result.fsq_id,
            name: result.name || "",
            address: result.location.address || "",
            locality: result.location.locality,
            imgUrl: 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
        };
    });
}