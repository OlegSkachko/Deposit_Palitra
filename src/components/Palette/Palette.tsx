import React, { ChangeEvent, useState } from 'react';
import './index.css'
import PaletteElement, { ActionTypes } from './../../types/types'
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';


const Palette = () => {
    const [showDeletePallete, setShowDeletePallete] = useState<boolean>(false)
    const [color, setColor] = useState<string>('white')
    const state = useTypedSelector(state=>state.pallete)
    const dispatch = useDispatch()

    function chooseColor(e:ChangeEvent<HTMLInputElement>) {
        setColor(e.target.value)  
    }

    function changeColor(e:ChangeEvent<HTMLInputElement>, id: number) {
        const choosenColor = e.target.value
        dispatch({
            type: ActionTypes.CHANGE_PALLETE_COLOR, 
            payload: {id, color: choosenColor}
        }) 
    }

    const addPallete = () => {
        let newEl:PaletteElement = {
            color,
            id: Date.now()
        }
        dispatch({type: ActionTypes.ADD_PALLETE, payload: newEl})     
    }

    function deletePallete(e:any, el:number) {
        dispatch({type: ActionTypes.DELETE_PALLETE, payload: {id:el}})
    }

    return (

        <div className='palette' >
            <div className='palette__contain'> 
                { state.map((el,i)=>
                    <div className='cube-div'
                        onMouseOver={(i)=>{setShowDeletePallete(true)}}
                        onMouseOut={(i)=>{setShowDeletePallete(false)}}
                        style={{ 'border':'none'}}
                    >
                        <input type='color'
                        value={el.color}
                        className='cube' 
                        key={el.id} 
                        style={{ 'border':'none'}}
                        onChange={(e) => changeColor(e,el.id)}
                        >
                        </input>
                        <div 
                            className={`${showDeletePallete? 'delete': 'none'}`}
                            onClick={(e)=>deletePallete(e,el.id)}
                        /> 
                    </div>)
                } 
            <input 
                className='cube'
                onChange={chooseColor}
                type='color'  
            />
            </div>
            <button onClick={addPallete}>Добавить цвет</button>
        </div>
    );
};

export default Palette;