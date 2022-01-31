import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';

export type WarningMessageType = 'enter and set values' | 'incorrect max value' | 'incorrect  min value' | ''

const Counter = () => {

    const [maxValue, setMaxValue] = useState(0)
    const [minValue, setMinValue] = useState(0)
    let [value, setValue] = useState<number | null>(null)
    const [disabling, setDisabling] = useState<boolean>(false)
    const [warningMessage, setWarningMessage] = useState<WarningMessageType>('enter and set values')

    useEffect(() => {
        let minV = localStorage.getItem('counterValueMin')
        if (minV) {
            setMinValue(JSON.parse(minV))
        }
        let maxV = localStorage.getItem('counterValueMax')
        if (maxV) {
            setMaxValue(JSON.parse(maxV))
        }
        let val = localStorage.getItem('counterValue')
        if (val) {
            setValue(JSON.parse(val))
            setWarningMessage('')
        }
    },[])


    useEffect(() => {
        localStorage.setItem('counterValueMax', JSON.stringify(maxValue))
        localStorage.setItem('counterValueMin', JSON.stringify(minValue))
        localStorage.setItem('counterValue', JSON.stringify(value))
    }, [value, maxValue, minValue])



    const Incrementing = () => {
        if (typeof value==='number') {
            setValue(value += 1)
        }
    }

    const Resetting = () => {
        setValue(minValue)
    }

    const Setting = () => {
        setWarningMessage('')
        setValue(minValue)
    }

    const onMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if ((Number(e.currentTarget.value)) <= minValue) {
            setWarningMessage("incorrect max value")
            setDisabling(true)
        } else if
            ((Number(e.currentTarget.value)) > minValue) {
            setWarningMessage('enter and set values')
            setDisabling(false)
            setMaxValue(Number(e.currentTarget.value))
        }
    }

    const onMinValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if ((Number(e.currentTarget.value)) >= maxValue) {
            setWarningMessage("incorrect  min value")
            setDisabling(true)
        } else if
            ((Number(e.currentTarget.value)) < maxValue) {
            setWarningMessage('enter and set values')
            setDisabling(false)
            setMinValue(Number(e.currentTarget.value))
        }
    }


    return (
        <div className={'wrapper'}>
            <div className="settings-wrapper">
                <div className={'settings'}>
                    <div className={'max-value'}>
                        <div>max value</div>
                        <input className={warningMessage === 'incorrect max value' ? 'max-value-input' : ''}
                               type="number" value={maxValue} onChange={onMaxValueHandler}/>
                    </div>
                    <div className={'min-value'}>
                        <div>min value</div>
                        <input className={warningMessage === 'incorrect  min value' ? 'min-value-input' : ''}
                               type="number" value={minValue} onChange={onMinValueHandler}/>
                    </div>
                </div>
                <div className={'interface'}>
                    <Btn className={'set'} btnName={'set'} disabled={disabling} callBack={Setting}/>
                </div>
            </div>
            <div className="counter-wrapper">
                <Disp value={value} maxValue={maxValue} warningMessage={warningMessage}/>
                <div className={'interface'}>
                    <Btn disabled={value === maxValue || disabling} className={'incr'} btnName={'incr'}
                         callBack={Incrementing}/>
                    <Btn disabled={value === minValue || disabling} className={'reset'} btnName={'res'}
                         callBack={Resetting}/>
                </div>
            </div>
        </div>
    );
}


type DispPropsType = {
    value: number | null
    maxValue: number
    warningMessage: WarningMessageType
}

const Disp: React.FC<DispPropsType> = ({value, maxValue, warningMessage}) => {
    return <div
        className={value === maxValue || warningMessage === 'incorrect max value' || warningMessage === 'incorrect  min value' ?
            'counter-value-maxi' : 'counter-value'}>
        {warningMessage ? warningMessage : value}
    </div>
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
