
import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid'
function App() {

function allNewDice(){
  const arr = []

  for (let i = 0; i<10; i++){
    arr.push({value: Math.ceil(Math.random()*6), isHeld: false, id: nanoid()});
  }
  return arr
}



console.log(allNewDice())

const [dice, setdice] = useState(allNewDice())

const [tenzies, settenzies] = useState(false)



const dices = dice.map(items =>{
  return(
    <Die key={items.id} value = {items.value} isHeld = {items.isHeld} hold={() => hold(items.id)}/>
  )
})

function Roll(){

  // setdice(allNewDice())


  setdice(()=>
  {
  
     return  dice.map(item=>
      {
        if(item.isHeld === true){
          return item
        }else{
          return {...item, value: Math.ceil(Math.random()*6)}
        }
      })

  })
}

function hold(id){
  
   setdice(oldValue =>
    {   
    return oldValue.map(die =>
    {return die.id === id ? 
      {...die, isHeld: !die.isHeld} : die
    })})

}




useEffect(()=>{
 
  function helperheld(){
    let val = true
    for(let i = 0; i< dice.length; i++){
      if(dice[i].isHeld === true && dice[i].value === dice[0].value){
        continue
      }else{
        val = false
        break
      }
    }
    return val
  }

  if(dice.every(helperheld)){
    settenzies(true)
  }
  
 
},[dice])



  return (
   <main>
    <h1 className="title">Tenzies</h1>
            <p className="were">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
   {tenzies ? <h1>Tenzies Congrats!</h1> : <div className='die--container'>
      {dices}
    </div>}
    <button className='roll'><h2 className='rolltext' onClick={Roll}>Roll</h2></button>
   </main>
  );
}

export default App;
