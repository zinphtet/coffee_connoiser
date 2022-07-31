import { useState } from 'react';
import { useContext } from 'react';
import { StoresContext, ACTION } from '../Context/StoreContext';
function UseCurrentLocation() {
	const [locationError, setError] = useState(null);
	const [geoLoading, setLoading] = useState(false);
	// const [location, setLocation] = useState(null);
	const { dispatch } = useContext(StoresContext);
	function error() {
		// console.log('ERROR LOCATION');
		setError('Unable to fetch location data');
		setLoading(false);
	}
	function success({ coords: { latitude, longitude } }) {
		setLoading(true);
		// console.log('SUCCESS LOCATION');
		const lat = latitude;
		const lng = longitude;
		// console.log('LAT LNG', lat, lng);
		// setLocation({ lat, lng });
		dispatch({ type: ACTION.set_location, payload: { lat, lng } });
		setLoading(false);
	}
	function handleLocation() {
		// console.log('HANDLE LOCAION');
		if (!navigator.geolocation) {
			setError('Unable to use Geolocation.');
		} else {
			setLoading(true);
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}

	return {
		locationError,
		geoLoading,
		handleLocation,
	};
}
export default UseCurrentLocation;
