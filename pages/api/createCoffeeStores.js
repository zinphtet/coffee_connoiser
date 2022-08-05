import {
	table,
	getRecords,
	fetchedStores,
} from '../../public/Airtable/airtable';

// console.log({ table });

const createCoffeeStores = async (req, res) => {
	console.log(req);
	try {
		if (req.method == 'POST') {
			const { id, name, street, nearby, voting, imgUrl } = req.body;
			if (id) {
				const fetchedCoffeeStores = await table
					.select({ filterByFormula: `id="${id}"` })
					.firstPage();
				if (fetchedCoffeeStores.length > 0) {
					const records = getRecords(fetchedCoffeeStores);
					console.log('RECORDS', records);
					res.json(records);
				} else {
					const records = table.create([
						{
							fields: {
								id,
								name,
								street,
								nearby,
								voting,
								imgUrl,
							},
						},
					]);
					const myRecords = await records;
					const createdRecords = getRecords(myRecords);
					res.json({ alert: 'Created Records', created: createdRecords });
				}
			} else {
				res.status(400);
				res.json({ error: 'Id  is Missing .' });
			}
		} else {
			res.json({ method: 'YOU ARE USING GET REQUEST' });
		}
	} catch (error) {
		console.log('Server Error', error);
		res.status(500);
		res.json({ type: 'Internal Server Error' });
	}
};

export default createCoffeeStores;
