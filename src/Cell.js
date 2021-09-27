import React, { useEffect, useState } from 'react';
import './Cell.css';

export default function Cell(props) {
    const [color, setColor] = useState('white')
    const [isFinalPath, setIsFinalPath] = useState(false)
    const [isVisited, setIsVisited] = useState(false)
    const [isWall, setIsWall] = useState(false)
    //const [isActive, setActive] = useState(false)

    //only runs if there is a change in props
    useEffect(() => {
        setIsFinalPath(props.isFinalPath)
        setIsVisited(props.isVisited)
        setIsWall(props.isWall)
        getColor()
        function getColor() {
            if(props.isFinalPath)
                setColor('yellow')
        
            if(props.isVisited)
                setColor('blue')

            if(props.isWall)
                setColor('grey')
            }
    }, [props])

    const getColour = () => {
        console.log("get colour called")
        if(isFinalPath)
            setColor('yellow')
        
        if(isVisited)
            setColor('blue')

        if(isWall)
            setColor('grey')
    }

    const handler = () => {
        console.log('CLICKED')
        console.log('1 ' + isWall)
        setIsWall(true)
        getColour()
        console.log('2 ' + isWall)
    }

    return (<div className = 'cell' onClick={handler} style = {{'backgroundColor': color}}>h</div> )
}