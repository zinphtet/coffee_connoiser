import { table } from '../../public/Airtable/airtable';

const voteShot = (req, res) => {
	// console.log('Update', req.body);
	const { recId, voting } = req.body;
	table.update([
		{
			id: recId,
			fields: {
				voting,
			},
		},
	]);
};

export default voteShot;
