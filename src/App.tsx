import React, {useState} from 'react';
import './App.css';

export type ValueType = number

const Counter = () => {

    let [value, setValue] = useState<ValueType>(0)

    const Incrementing = () => {
        setValue(value += 1)
    }

    const Resetting = () => {
        setValue(0)
    }

    return (
            <div className="counter-wrapper">
                <Disp value={value}/>
                <div className={'interface'}>
                    <Btn disabled={value === 5} className={'incr'} btnName={'incr'} callBack={Incrementing}/>
                    <Btn disabled={value === 0} className={'reset'} btnName={'res'} callBack={Resetting}/>
                </div>
            </div>
    );
}


type DispPropsType = {
    value: ValueType
}

const Disp: React.FC<DispPropsType> = ({value}) => {
    return <div className={value === 5 ? 'counter-value-maxi' : 'counter-value'}>{value}</div>
}


type BtnPropsType = {
    className: string
    btnName: string
    callBack: () => void
    disabled?: boolean
}

const Btn: React.FC<BtnPropsType> = ({className, btnName, callBack, disabled}) => {
    return <button disabled={disabled} onClick={callBack} className={className}>{btnName}</button>
}

export default Counter;
