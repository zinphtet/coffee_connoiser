const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
	process.env.AIRTABLE_BASE_KEY
);
export const table = base('coffee-stores');

export const getRecords = (fetchedRecords) => {
	// console.log('fetched Records ', fetchedRecords);
	return fetchedRecords.map((rec) => {
		return {
			recordId: rec.id,
			...rec.fields,
		};
	});
};

export const fetchedStores = async (id) => {
	const fetchedCoffeeStores = await table
		.select({ filterByFormula: `id="${id}"` })
		.firstPage();

	const records = getRecords(fetchedCoffeeStores);
	// console.log('RECORDS', records);
	return records;
};
