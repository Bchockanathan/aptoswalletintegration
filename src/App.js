// Importing modules
//import React,
//{ useState,useEffect } from "react";
import logo from './logo.svg';
//import { PontemWallet } from './PontemWallet';
//import { ethers } from "ethers";
import "./App.css";
//import ERC from "./contractabi";
//import { Button, Card } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
//import web3 from "./web3";

function App() {
//Provider Browser Detection
if (typeof window.pontem !== 'undefined') {
console.log('Pontem Wallet is installed!');
}
const connectwallet=async()=>{
//Connection to the wallet
window.pontem.connect()
.then(address => console.log(`Access for address ${address} allowed by user`))
.catch(e => console.log('Access denied by user', e))
//Change active Account
window.pontem.onChangeAccount((address) => {
if(address) {
console.log('New selected account: ', address);
} else {
console.log('The user has selected an account that is not allowed to access');
}
})
}

const signAndSubmit=async()=>{
//Get Current Account 
window.pontem.account()
.then(address => {
if(address) {
console.log('Account address: ', address);
} else {
console.log('The user has selected an account that is not allowed to access');
}
})
//Sign and Submit Transaction
const payload = {
type: "entry_function_payload",
function: "0x1::coin::transfer",
type_arguments: ["0x1::aptos_coin::AptosCoin"],
arguments: ["0x2e6a58676d92c78c693336ef67a5139db68adcb793a6dc3b992006287f22ce6a", "1"]
};
const otherOptions = {
max_gas_amount: '1000',
gas_unit_price: '1',
expiration_timestamp_secs: '1662448126',
sequence_number: '10'
}
window.pontem.signAndSubmit(payload, otherOptions)
.then(tx => {
console.log('Transaction', tx)
})
.catch(e => console.log('Error', e))
//Sign Message
window.pontem.signMessage('My super secret message for sign')
.then(result => {
console.log('Transaction', result)
})
.catch(e => console.log('Error', e))
}

const SignTransaction=async(event)=>{
    const payload = {
        type: "entry_function_payload",
        function: "0x1::coin::transfer",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
        arguments: ["0x2e6a58676d92c78c693336ef67a5139db68adcb793a6dc3b992006287f22ce6a", "10"]
      };
      const otherOptions = {
        max_gas_amount: '1000',
        gas_unit_price: '1',
        expiration_timestamp_secs: '1662446763',
        sequence_number: '10'
      }
      window.pontem.signTransaction(payload, otherOptions)
        .then(tx => {
          console.log('Transaction', tx)
        })
        .catch(e => console.log('Error', e))
}


return(
<div className="App">
{/* <Card className="text-center"> */}
{/* <Card.Body> */}

<button onClick={()=>connectwallet()} variant="primary">
Connect to wallet
</button>
<br/>
<button onClick={()=>signAndSubmit()} variant="primary">
signAndSubmit
</button>
<br/>
<button onClick={()=>SignTransaction()} variant="primary">
Transaction
</button>


{/* <button onClick={()=>signmessage()} variant="primary"> */}
{/* Sign Message */}
{/* </button> */}
{/* </Card.Body> */}
{/* </Card> */}
</div>
);
}
export default App;