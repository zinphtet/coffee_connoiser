import '../styles/globals.css';
import { StoresProvider } from '../public/Context/StoreContext';

function MyApp({ Component, pageProps }) {
	return (
		<StoresProvider>
			<Component {...pageProps} />
		</StoresProvider>
	);
}

export default MyApp;
