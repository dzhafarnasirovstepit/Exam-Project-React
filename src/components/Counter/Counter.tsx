import { createContext, useState } from 'react';
import ButtonPlus from './ButtonPlus/ButtonPlus';
import ButtonMinus from './ButtonMinus/ButtonMinus';
import Display from './Display/Display';

export const CountContext = createContext(0);
export const SetCountContext = createContext<React.Dispatch<React.SetStateAction<number>> | null>(null);

const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<>
			<CountContext.Provider value={count}>
				<SetCountContext.Provider value={setCount}>
					<ButtonPlus />
					<Display />
					<ButtonMinus />
				</SetCountContext.Provider>
			</CountContext.Provider>
		</>
	);
}

export default Counter;