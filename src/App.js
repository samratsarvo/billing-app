import React,{useState , useEffect} from 'react'
import NavBar from './components/NavBar'
import Container from '@material-ui/core/Container'

export default function App(){
  const [toggle , setToggle] = useState(false)
  const [showBill, setShowBill] = useState(false)

  const handleToggle = ()=>{
    setToggle(!toggle)
  }

  const handleShowBill = () => {
    setShowBill(!showBill)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleToggle()
    }
  },[])

  return (
    <Container component='main'>
    <div>
      <h1  style={{color:'purple', textAlign : "center"}}>BILLING APPLICATION</h1>
      <NavBar handleToggle ={handleToggle} toggle ={toggle} handleShowBill={handleShowBill} showBill={showBill}/>
    </div>
    </Container>
  )
}
