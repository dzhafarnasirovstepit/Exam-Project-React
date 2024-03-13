import { useContext } from "react";
import Div from "../../Div/Div";
import { CountContext } from "../Counter";

const Display = () => {
	const info = useContext(CountContext);

    return (
        <Div>{info}</Div>
    )
}

export default Display;