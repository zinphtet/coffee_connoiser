import { createApi } from 'unsplash-js';

const api = createApi({
	// Don't forget to set your access token here!
	// See https://unsplash.com/developers
	accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
});

const fetchPhotos = async (search, limit) => {
	const response = api.search.getPhotos({
		query: `${search}`,
		orientation: 'landscape',
		perPage: `${limit}`,
	});
	const resdata = await response;
	const data = resdata.response?.results.map(({ urls }) => urls.regular);
	return data;
};

const fetchUrl = (lng, lat) => {
	return `https://api.geoapify.com/v2/places?categories=catering.cafe&bias=proximity:${lng},${lat}&limit=10&apiKey=${process.env.NEXT_PUBLIC_GEO_API}`;
};
// '96.093292'
// '21.954510'
const fetchData = async (lng, lat, query, limit) => {
	const response = await fetch(fetchUrl(lng, lat)); //MDY location
	const data = await response.json();
	const photos = await fetchPhotos(query, limit);
	// console.log('Photos Response', photos);
	// console.log('COFFEE STORES', data);
	const myData = data.features?.map(({ properties }, idx) => {
		const { name, street, town, state } = properties;
		return {
			id: name || street,
			name: name || 'Name not found',
			street,
			nearby: town || state,
			imgUrl: photos[idx],
		};
	});
	// console.log('FETCH DATA ', data.features);
	// console.log('FINAL DATA', myData);
	return myData;
};

export default fetchData;
// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
