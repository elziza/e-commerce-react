import React,{useContext} from 'react'
import { CartContext } from '../App'
export default function CardSummary() {
  const { countCartArticles } = useContext(CartContext)
  return (
    <>
      <span> Caddie ({countCartArticles()}) </span>
    </>
  )
}
