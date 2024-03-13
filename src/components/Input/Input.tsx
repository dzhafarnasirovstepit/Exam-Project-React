import { forwardRef } from 'react'

type InputProps = {
    type: string,
    name: string,
    onInput: React.FormEventHandler<HTMLInputElement>
}

const Input = forwardRef(({ type, name, onInput }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <input
        ref={ref}
        type={type}
        name={name}
        onInput={onInput}
    />
})

export default Input;