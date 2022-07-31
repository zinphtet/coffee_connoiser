import { useReducer } from 'react';
import { createContext } from 'react';
const initialState = {
	location: {},
	nearCoffeeShops: [],
};
export const ACTION = {
	set_location: 'SET_LOCATION',
	set_coffee_stores: 'SET_COFFEESTORES',
};
const StoreReducer = (initialState, action) => {
	switch (action.type) {
		case ACTION.set_location:
			return {
				...initialState,
				location: action.payload,
			};
		case ACTION.set_coffee_stores:
			return {
				...initialState,
				nearCoffeeShops: action.payload,
			};
		default:
			throw new Error('Invalid Dispatch Type ');
	}
};

export const StoresContext = createContext();

export const StoresProvider = ({ children }) => {
	const [state, dispatch] = useReducer(StoreReducer, initialState);

	return (
		<StoresContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</StoresContext.Provider>
	);
};
