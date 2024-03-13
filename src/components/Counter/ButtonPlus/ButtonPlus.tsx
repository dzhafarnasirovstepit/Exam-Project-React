import { useContext } from 'react';
import Button from '../../Button/Button';
import { SetCountContext } from '../Counter';

const ButtonPlus = () => {
	// const setCount = useContext(SetCountContext) as React.Dispatch<React.SetStateAction<number>>;
	const setCount = useContext(SetCountContext)!;

	const handlePlus = () => {
		setCount(prevCount => prevCount + 1);
		setCount(prevCount => prevCount + 1);
		setCount(prevCount => prevCount + 1);
		setCount(prevCount => prevCount + 1);
		setCount(prevCount => prevCount + 1);
	}

	return (
		<Button onClick={ handlePlus }>+</Button>
	)
}

export default ButtonPlus;