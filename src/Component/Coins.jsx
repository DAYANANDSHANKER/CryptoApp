import React, { useEffect, useState } from 'react'
import axios from "axios"
import {server} from "../index";
import Loader from './Loader';
import {Container,HStack,Button, RadioGroup,Radio,VStack,Image,Text, Heading} from "@chakra-ui/react"
import CoinCards from './CoinCards';
const Coins = () => {
    const [coins,setcoins] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [page,setpage] = useState(1);
    const [currency,setcurrency] = useState("inr");

    const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

     const changePage=(page)=>{
          setpage(page);
          setLoading(true);
     };
    
      const btns = new Array(132).fill(1)

    useEffect(()=>{
       const fetchcoins= async()=>{
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        console.log(data);
        setcoins(data);
        setLoading(false);
       }
      fetchcoins();
    },[currency,page]);
  return (
    <Container maxW ={"container.xl"}>
     {loading? <Loader/> : 
     <>
     <RadioGroup value={currency} onChange={setcurrency} p={"8"}>
      <HStack spacing={"4"}>
         <Radio value={"inr"}>INR</Radio>
         <Radio value={"usd"}>USD</Radio>
         <Radio value={"eur"}>EUR</Radio>
      </HStack>
     </RadioGroup>
       
     <HStack wrap ={"wrap"} justifyContent={"space-evenly"}>
      {
        coins.map((i)=>(
          <CoinCards
            id = {i.id}
            key = {i.id}
            name = {i.name}
            price = {i.current_price}
            img = {i.image}
            symbol = {i.symbol}
            currencySymbol={currencySymbol}
          />
        ))
      }
     </HStack>
     <HStack w={"full"} overflow={"auto"}p={"8"}>
      {
        btns.map((item,index)=>(
          
            <Button 
              key={index}
              bgColor={"blackAlpha.900"} 
              color = {"white"} 
              onClick={()=>changePage(index+1)}
              >
                {
                 index+1
                } 
             </Button>
    
        ))
      }
     </HStack>
     </>}
    </Container>  
  );
};



export default Coins
