import fetchData from '../../public/fetchData/fetchData';
const getCoffeeStores = async (req, res) => {
	try {
		console.log('QUERY', req.query);
		const { lng, lat } = req.query;
		const nearbyData = await fetchData(lng, lat, 'coffee stores', 10);
		res.status(200);
		res.json(nearbyData);
	} catch (error) {
		res.status(500);
		res.json({ error: 'Error fetching coffee stores' });
	}
};

export default getCoffeeStores;
