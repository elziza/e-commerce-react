import './App.css';
import { Container, Menu,Icon } from 'semantic-ui-react';
import BookList from './components/BookList';
import CardSummary from './components/CardSummary';
import { createContext,useState, useEffect } from 'react';
import { BrowserRouter,Routes ,Route,Link } from 'react-router-dom';
import CardDetails from './components/CardDetails';

export const CartContext= createContext();
const CART_KEY = "react-shop";
function App() {
  const [cart,setCart]= useState({});
  const [nbrArticles,setNbrArticles] = useState(0);
  useEffect(()=>{
    const cartFromStorage = localStorage.getItem(CART_KEY);
    if (cartFromStorage !== null) {
      setCart(JSON.parse(cartFromStorage));
    }
  },[]);
  useEffect(()=>{
    // only string in localstorage
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
    document.title= `caddie (${nbrArticles})`
  },[cart,nbrArticles]);

  function addToCart(item){

    console.log("item",item)
    // setCart([...cart, item]);
    if(!cart[item.id]){
      cart[item.id] = item;
      cart[item.id].quantity = 1;

    }else{
      cart[item.id].quantity += 1
    }
    setCart({...cart})
    console.log("cart", cart); 
  }
  function countCartArticles(){
    let total = 0;
    Object.keys(cart).map(key =>(total += cart[key].quantity));
     setNbrArticles(total);
    return total;
  }

  function removeFromCart(item){
    if (cart[item.id].quantity !== 1){
      cart[item.id].quantity = cart[item.id].quantity - 1;

    } else{
      delete cart[item.id];
    }
      setCart({...cart});
      console.log("cart",cart);
  }

  function emptyCart(){
    const response = window.confirm("Etes-vous sur de vouloir vider le caddie ?");
    if (response){
      setCart({});
    }
  }

  const contextValue = {cart,addToCart,countCartArticles,removeFromCart ,emptyCart};
  return (
    <>
    <BrowserRouter>
      <CartContext.Provider value={contextValue}>
        <Container>
            <Menu stackable>
                <Menu.Item>
                  <Link to="/">Campus shop </Link>{""}
                </Menu.Item>
                <Menu.Item>
                <Link to="/cart"> 
                 <Icon name='cart' size='small'/>
                  <CardSummary/>
                </Link>
                </Menu.Item>
            </Menu>
        </Container>
        <Routes>
        <Route path='/cart' Component={CardDetails} />
        <Route path='/' Component={BookList} />
        </Routes>

        </CartContext.Provider>
    </BrowserRouter>
   
      
    </>
  );
}

export default App;
