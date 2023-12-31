import React,{useContext,useState} from 'react'
import { Card, Image,Icon } from 'semantic-ui-react'
import { CartContext } from '../App'
import { useSpring,animated } from '@react-spring/web';

export default function BookCard({data}) {
    const {addToCart}=  useContext(CartContext); 
    // const context = useContext(CartContext)
    // context.addToCart
    const [anim,setAnim]= useState(false)
    const props = useSpring({to: {x: anim ? 0 :1 }});

    function handleAddToCart(data){
      setAnim(!anim);
      addToCart(data);
    }

  return (
    <Card style={{height:"100%"}}>
    <Image src={data.image} wrapped ui={false} style={{width: 120}} />
    <Card.Content>
      <Card.Header>{data.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{data.year}</span>
      </Card.Meta>
      <Card.Description>
       
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {/* <Icon name='add to cart' size='big'
       onClick={()=>addToCart(data)} 
      style={{cursor:"pointer"}}

      /> */}
      <animated.div style={{
        transform: props.x
        .to({
          range: [0,0.25,0.35,0.45,0.65,0.75,1],
          output: [1,0.97,0.95,1.1,0.95,1.1,1.3,1]
        })
        .to(x =>`scale($(x))`)
      }}>
      <Icon name='add to cart' size='big'
       onClick={()=>handleAddToCart(data)} 
      style={{cursor:"pointer"}}

      />

      </animated.div>
    </Card.Content>
  </Card>
  )
}
