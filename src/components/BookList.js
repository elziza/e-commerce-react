import React,{useState,useEffect} from "react";
import axios from "axios";
import { Grid,GridColumn,Segment } from "semantic-ui-react";
import Book from "./BookCard"
export default function BookList(){
    const [books,setBooks] = useState([])
    //useeFFECT PREND UN CALLBACK ET UN TABLEAU DE DEPENDANCE

    useEffect(()=> {
        axios.get("http://localhost:3001/products").then(res =>{
            const retrievedBooks = res.data
            setBooks(retrievedBooks)
        })
    },[])
    return (
        <>
            <h3>Livres</h3>
            {books.length === 0 ? (
                <div>loading...</div>
            ) :(
                /* <code>{JSON.stringify(books,null,4)}</code> */
                <div> 
                <Grid columns={3} doubling stackable>

                    {books.map(b =>(
                <GridColumn key={b.id}>
                        <Segment style={{height:"26em"}}>
                        <Book data={b} key={b.id}/>
                        </Segment>
                </GridColumn>
                    ))}

                </Grid>
                </div>
            )}
        </>
    )
}