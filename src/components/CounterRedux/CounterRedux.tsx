import { increment, decrement } from "../../redux/slices/counterSlice";
import { useTypedDispatch, useTypedSelector } from "../../store";

const CounterRedux = () => {
	const count = useTypedSelector(state => state.counterReducer);
	const dispatch = useTypedDispatch();

	return (
		<div>
			<button onClick={() => dispatch(decrement())}>-</button>
			{count}
			<button onClick={() => dispatch(increment())}>+</button>
		</div>
	)
}

export default CounterRedux;