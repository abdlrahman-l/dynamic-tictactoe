import React, { useEffect, useRef, useState } from 'react'
import SelectBoardLength from './SelectBoardLength';


const initalState = () => [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]

const Test = () => {
    const [board, setBoard] = useState(initalState)
    const [isPlayer1, setIsPlayer1] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);

    const boardLength = useRef('3')
    const boardFilledCount = useRef(0)

    const lastIdx = board.length - 1
    const boardWide = board.length * board.length

    useEffect(() => {
        const checkGame = () => {
            let isFound = false

            // check row
            for (let i = 0; i < board.length; i++) {
                if (board[i].every((b) => b === board[i][0] && b !== 0)) return true
            }

            //check column
            for (let i = 0; i < board.length; i++) {
                isFound = board.reduce((acc, _, j) => {
                    //if prev val is false already or the value is still empty, return false
                    if (!acc || board[j][i] === 0) {
                        return false
                    }

                    // if j is last, return acc
                    if (j === lastIdx) {
                        return acc
                    }

                    //compare it to the next value
                    return board[j][i] === board?.[j + 1]?.[i]
                }, true)
                if (isFound) return isFound
            }

            //check diagonal up left to right down
            if (board.every((b, i) => board[i][i] !== 0 && board[i][i] === board[0][0])) return true

            //check diagonal down left to right up
            if (board.every((b, i) => board[i][lastIdx - i] !== 0 && board[i][lastIdx - i] === board[0][lastIdx])) return true


            return isFound

        }
        setIsCompleted(checkGame())
    }, [board])



    const onClickBoard = (idx1: number, idx2: number) => () => {
        if (isCompleted) {
            return false
        }
        if (board[idx1][idx2] === 0) {
            boardFilledCount.current = boardFilledCount.current + 1
            setBoard(prev => {
                const clonedPrev = [...prev]
                clonedPrev[idx1][idx2] = clonedPrev[idx1][idx2] === 0 ? (isPlayer1 ? 1 : 2) : 0
                return clonedPrev
            })
            setIsPlayer1(prev => !prev)
        }
    }

    const resetBoard = (length: number) => {
        const newBoard = [...Array(length).fill(0)]
        setBoard(() => newBoard.reduce((acc, curr, i) => {
            return [
                ...acc,
                [...newBoard]
            ]
        }, []))
    }

    return (
        <section className='w-full flex flex-col justify-center items-center space-y-4 mt-5'>
            <SelectBoardLength
                onValueChange={(v) => {
                    const length = Number(v)
                    boardLength.current = v
                    resetBoard(length)
                }}
                defaultValue={boardLength.current}
            />

            <button onClick={() => {
                boardFilledCount.current = 0
                resetBoard(Number(boardLength.current))
                setIsPlayer1(true)
            }}>Clear</button>
            {
                // check is draw
                boardFilledCount.current === boardWide && !isCompleted
                    ? 'Draw'
                    : (
                        <p>
                            {`Player ${isCompleted
                                ? isPlayer1
                                    ? '2'
                                    : '1'
                                : isPlayer1
                                    ? '1'
                                    : '2'} ${isCompleted ? 'win' : 'turn'}`}
                        </p>
                    )
            }
            <div>
                {
                    board?.map((b, i) => {
                        return (
                            <div className='flex' key={i}>
                                {b.map((v, j) => (
                                    <div className='border border-black w-20 h-20 flex items-center justify-center cursor-pointer' key={`${i}-${j}`} onClick={onClickBoard(i, j)}>
                                        <p className='text-2xl font-bold'>{
                                            v === 1 ? 'X' : v === 2 ? 'O' : ''
                                        }</p>
                                    </div>
                                ))}
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Test