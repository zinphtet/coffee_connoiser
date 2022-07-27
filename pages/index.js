import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Banner from '../components/Banner/Banner';
import ShopContainer from '../components/ShopContainer/ShopContainer';
import dummyData from '../public/dummyData';

export async function getStaticProps(context) {
	console.log('DUMMY DATA', dummyData);
	return {
		props: {
			dummyData,
		},
	};
}

export default function Home({dummyData}) {
	// console.log('PROPS >>', props);
	return (
		<>
			<Head>
				<title>Discover Coffee Stores</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Banner />
			<ShopContainer data ={dummyData} />
		</>
	);
}
