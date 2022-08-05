import {
	table,
	getRecords,
	fetchedStores,
} from '../../public/Airtable/airtable';

const getCoffeeStoreById = async (req, res) => {
	const { id } = req.query;

	try {
		if (id) {
			// const fetchedCoffeeStores = await table
			// 	.select({ filterByFormula: `id="${id}"` })
			// 	.firstPage();
			// if (fetchedCoffeeStores.length > 0) {
			// 	const records = getRecords(fetchedCoffeeStores);
			// 	console.log('RECORDS BY ID', records);
			// 	res.json(records);
			// }
			const myRecords = await fetchedStores(id);
			// if (myRecords.length > 0) {
			res.json(myRecords);
			// }
		} else {
			res.status({ error: 'Id Not Found' });
		}
	} catch (err) {
		res.status(400);
		res.json({ error: 'Id  is Missing . or Something wrong ' });
	}
};

export default getCoffeeStoreById;
