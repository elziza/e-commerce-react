import React ,{useContext}from 'react'
import { Table,Icon } from 'semantic-ui-react'
import { CartContext } from '../App'
export default function CardDetails() {
    const {cart,removeFromCart,addToCart,emptyCart} = useContext(CartContext)
  return (
    <>
      <button onClick={emptyCart}>vider le caddie</button>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine textAlign='center'> Quantité </Table.HeaderCell>
            <Table.HeaderCell>Titre </Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign='right'> prix unitaire </Table.HeaderCell>
            <Table.HeaderCell singleLine textAlign='right'>prix total </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(cart).map(key =>(
            <Table.Row key={cart[key].id}>
              <Table.Cell>
                <Icon name='minus square outlnie'
                  onClick={()=>{removeFromCart(cart[key])}}
                  style={{cursor: "pointer"}}
                />
                {cart[key].quantity}
                <Icon name='plus square outlnie' 
                  onClick={()=>{addToCart(cart[key])}}
                  style={{cursor: "pointer"}}
                />
              </Table.Cell>
                  <Table.Cell singleLine>{cart[key].title}</Table.Cell>
                  <Table.Cell textAlign='right'>{cart[key].price}  £</Table.Cell>
                  <Table.Cell textAlign='right'>
                  {(cart[key].quantity * cart[key].price).toFixed(2)}  £
                  </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
