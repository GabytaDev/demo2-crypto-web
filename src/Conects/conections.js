
import {useState} from 'react';
import {ethers} from 'ethers';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';

//update whit the contract address logged out the CLI when it was deployed
const gretterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const [greeting, setGreetingValue] = useState()

//request access to the user's metamask acount

export async function requestAcounts(){
  await window.ethereum.request({method:'eth_requestAccounts'});
}

//call the smart contract, read the current greeting value
export async function fetchGreeting(){
 
  if(typeof window.ethereum !== 'undefined'){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(gretterAddress, Greeter.abi, provider)
    try{
      const data = await contract.greet()
      console.log('data: ', data)
      upDateGreetInText(data)
    }
    catch(err){
      console.log('error: ', err)
    }
  }

}

let [greetText, setGreetText] = useState("")

export  const upDateGreetInText = (data) => {
    console.log('data funcion:', data)
    greetText = setGreetText(data)

}

  //call the smart contract, send on update

export  async function setGreeting(){
    if(!greeting) return
    if(typeof window.ethereum !== undefined){
      await requestAcounts()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(gretterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()
    }
}
