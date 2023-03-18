import React,{useEffect, useState} from 'react'

const App= ()=>{
    const [items, setItems] = useState([
       [ {id:11, value: '',occupiedBy: null},
        {id:12, value: '',occupiedBy: null},
        {id:13, value: '',occupiedBy: null},],

        [{id:21, value: '',occupiedBy: null},
        {id:22, value: '',occupiedBy: null},
        {id:23, value: '',occupiedBy: null},],

        [{id:31, value: '',occupiedBy: null},
        {id:32, value: '',occupiedBy: null},
        {id:33, value: '',occupiedBy: null},]
    ])
    const [turn, setTurn] = useState(1)
    const [toggle, setToggle] = useState(false)
    const [win, setWin] = useState(null)

    const handleClick =(arID,objID)=> {
        if(turn ==1){
            setItems(items=>items.map((ele,index)=>index==arID?ele.map((e,i)=>i===objID?{...e,value:'❌', occupiedBy:1}:e):ele))
            setTurn(2)
        }else{
            setItems(items=>items.map((ele,index)=>index==arID?ele.map((e,i)=>i===objID?{...e,value:'⭕', occupiedBy:2}:e):ele))
            setTurn(1)
        }
        setToggle(!toggle)
    }
useEffect(()=>{
checkPattern()
},[toggle])

useEffect(()=>{
    if(win){
       setTimeout(()=>{
        alert(win)
        handleReset()
        setTurn(1)
       }, 100)
    }
},[win])

const checkPattern =()=>{
    let allFilled = 0
    for(let i=0; i<3; i++){
        if(isAllEqual(items[i][0], items[i][1], items[i][2])){
            setWin(`Congratulations! Player ${isAllEqual(items[i][0], items[i][1], items[i][2])} won.`)
        }
        if(isAllEqual(items[0][i], items[1][i], items[2][i])){
            setWin(`Congratulations! Player ${isAllEqual(items[0][i], items[1][i], items[2][i])} won.`)
        }
        if(isAllEqual(items[0][0],items[1][1],items[2][2] )){
            setWin(`Congratulations! Player ${isAllEqual(items[0][0],items[1][1],items[2][2])} won.`)
        }
        if(isAllEqual(items[0][2],items[1][1],items[2][0] )){
            setWin(`Congratulations! Player ${isAllEqual(items[0][2],items[1][1],items[2][0])} won.`)
        }
        if(items[i][0].value && items[i][1].value && items[i][2].value){
            allFilled++
        }
    }
    if(allFilled ===3){
        setWin('Match Draw!!')
    }
}

   const isAllEqual = (obj1, obj2, obj3)=>{
    if(obj1.occupiedBy === 1 && obj2.occupiedBy ===1 && obj3.occupiedBy ===1){
        return obj1.occupiedBy
    }
    if(obj1.occupiedBy === 2 && obj2.occupiedBy === 2 && obj3.occupiedBy === 2){
        return obj1.occupiedBy
    }
    return false
   }
   const handleReset = ()=>{
    setItems(items=>items.map((ele,index)=>ele.map((e,i)=>({...e,value:'', occupiedBy:null}))))
    setWin(null)
}

    return <div className="container">
        <div className="card">
            <div className="card-header">
                <div className="card-title">
                    <div style={{display:'flex' , justifyContent:'center'}}>
                        <h1>Tic Tac Toe</h1>
                    </div>
                    <h4>Turn: Player {turn}</h4>
                    <buton style={{float:'right'}} className={`btn ${win? "btn-success":"btn-primary"}`} onClick={handleReset}>{win?'Re-Play' :'Reset'}</buton>
                </div>
            </div>
            <div className="card-body">
                {items.map((item, index)=><div className="row">
                    {

                        item.map((i, ndx)=>{
                            return <div className='col-4 box btn'
                            onClick={()=>i.value?null: handleClick(index, ndx)}
                            style={{background: `${(ndx + index%2)%2 ==0 ? '#d6e0f0':'white'}`}}>
                                <span style={{fontSize: 80}}>{i.value}</span>
                                </div>
                            
                        })
                    }
                </div>)}
            </div>
            <div className="footer">
                <span style={{color:'GrayText'}}>Created By Sanghmitra Rathore</span>
            </div>
        </div>
    </div>
}

export default App;
