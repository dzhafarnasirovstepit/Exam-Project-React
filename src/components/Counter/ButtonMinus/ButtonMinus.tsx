import { useContext } from 'react';
import Button from '../../Button/Button';
import { CountContext, SetCountContext } from '../Counter';

const ButtonMinus = () => {
	const count = useContext(CountContext);
	// const setCount = useContext(SetCountContext) as React.Dispatch<React.SetStateAction<number>>;
	const setCount = useContext(SetCountContext)!;

	const handleMinus = () => {
		setCount(count - 1);
		setCount(count - 1);
		setCount(count - 1);
		setCount(count - 1);
		setCount(count - 1);
	}

	return (
		<Button onClick={ handleMinus }>-</Button>
	)
}

export default ButtonMinus;