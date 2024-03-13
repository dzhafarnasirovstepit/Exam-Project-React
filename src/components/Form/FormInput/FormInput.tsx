import { useRef } from 'react';
import styles from './FormInput.module.css';
import { InputData } from 'src/App';
import Input from '../../Input/Input';

type FormInputProps = InputData & {
    setInvalidInputsCount: React.Dispatch<React.SetStateAction<number>>;
}

const FormInput = ({ labelText, type = 'text', name, pattern, setInvalidInputsCount }: FormInputProps) => {
    console.log(4564654564);
    
    const inputRef = useRef<HTMLInputElement>(null);
    // const [isValid, setIsValid] = useState(false);
    const isValidRef = useRef(false);

    const handleInput = () => {
        if (inputRef.current === null) return;

        const regexp = new RegExp(`^${pattern}$`, 'gi');
        const value = inputRef.current.value;

        const isValidValue = regexp.test(value);

        // console.log(inputRef.current.dataset.isValid);       

        inputRef.current.dataset.isValid = isValidValue.toString();

        // console.log(inputRef.current.dataset.isValid);

        // setIsValid(isValidValue);
        
        setInvalidInputsCount(prevInvalidCount => {
            if (isValidRef.current === isValidValue) return prevInvalidCount;

            return prevInvalidCount + (isValidValue ? -1 : 1);
        })

        isValidRef.current = isValidValue;
    }

    return (
        <label className={styles['form-input']}>
            {labelText}
            <Input ref={inputRef} type={type} name={name} onInput={handleInput}/>
        </label>
    )
}

export default FormInput;