import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { logger } from "ethers";
import { useEffect, useState } from "react";
import useUSElectionContract from "../hooks/useUSElectionContract";
import ErrorHandler from "./ErrorHandler";
import LoaderTrasaction from "./LoaderTransaction";


type USContract = {
  contractAddress: string;
};

export enum Leader {
  UNKNOWN,
  BIDEN,
  TRUMP
}

const USElection = ({ contractAddress }: USContract) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const usElectionContract = useUSElectionContract(contractAddress);
  const [currentLeader, setCurrentLeader] = useState<string>('Unknown');
  const [name, setName] = useState<string | undefined>();
  const [votesBiden, setVotesBiden] = useState<number | undefined>();
  const [votesTrump, setVotesTrump] = useState<number | undefined>();
  const [stateSeats, setStateSeats] = useState<number | undefined>();
  const [txHash, setTxHash] = useState<string>();
  const [loaderVisible, setLoaderVisible] = useState<boolean>(false);
  const [bidenSeats, setBidenSeats] = useState<number | undefined>();
  const [trumpSeats, setTrumpSeats] = useState<number | undefined>();
  const [electionEnded,setElectionEnded] = useState<boolean>();
  const [errorMessage,setErrorMessage] = useState<string>();
  const [showError,setShowError] = useState<boolean>(false);


  useEffect(() => {
    updateData();
  },[])

  const updateData = () => {
    try {
      getCurrentLeader();
      getBidenSeats();
      getTrumpSeats();
      getElectionStatus();
    }
  
    catch(err){
        if(err.message){
          setErrorMessage(err.message + err.data.message);
        }
        else{
          setErrorMessage(err);
        }
        
        setShowError(true);
    }
  }
  const handleCleanErrors= () => {
    setShowError(false);
    setErrorMessage("");
  }

  const getElectionStatus = async () => {
    try{
      const status = await usElectionContract.electionEnded();
      setElectionEnded(status);
    }
    catch(err){
      if(err.message){
        setErrorMessage(err.message + err.data.message);
      }
      else{
        setErrorMessage(err);
      }
      setShowError(true);
    }
  }
  const getCurrentLeader = async () => {
    try{
    const currentLeader = await usElectionContract.currentLeader();
    setCurrentLeader(currentLeader == Leader.UNKNOWN ? 'Unknown' : currentLeader == Leader.BIDEN ? 'Biden' : 'Trump');
    }
    catch(err){
      if(err.message){
        setErrorMessage(err.message + err.data.message);
      }
      else{
        setErrorMessage(err);
      }
      setShowError(true);
    }
  }

  const getBidenSeats = async () =>{
    try{
    const bidenSeats = await usElectionContract.seats(Leader.BIDEN);
    setBidenSeats(bidenSeats);
    }
    catch(err){
      if(err.message){
        setErrorMessage(err.message + err.data.message);
      }
      else{
        setErrorMessage(err);
      }
      setShowError(true);
    }
  }
  
  const getTrumpSeats = async () =>{
    try{
    const TrumpSeats = await usElectionContract.seats(Leader.TRUMP);
    setTrumpSeats(TrumpSeats);
    }
    catch(err){
      if(err.message){
        setErrorMessage(err.message + err.data.message);
      }
      else{
        setErrorMessage(err);
      }
      setShowError(true);
    }
  }

  const stateInput = (input) => {
    setName(input.target.value)
  }

  const bideVotesInput = (input) => {
    setVotesBiden(input.target.value)
  }

  const trumpVotesInput = (input) => {
    setVotesTrump(input.target.value)
  }

  const seatsInput = (input) => {
    setStateSeats(input.target.value)
  }

  const submitEndElection = async () => {
    try{
    const tx = await usElectionContract.endElection();
    setTxHash(tx.hash);
    setLoaderVisible(true);
    await tx.wait();
    setLoaderVisible(false);
    updateData();

    }
    catch(err){
      if(err.message){
        setErrorMessage(err.message + err.data.message);
      }
      else{
        setErrorMessage(err);
      }
      setShowError(true);
    }   

  }

  const submitStateResults = async () => {
    const result:any = [name, votesBiden, votesTrump, stateSeats];
    try {
      const tx = await usElectionContract.submitStateResult(result);
      setTxHash(tx.hash);
      setLoaderVisible(true);
      const txReceipt = await tx.wait();
      setLoaderVisible(false);
      resetForm();
      updateData();
    }
    catch(err){
      if(err.message){
        setErrorMessage(err.message);
      }
      if(err.data.message){
        setErrorMessage(err.data.message)
      }
      else{
        setErrorMessage(err);
      }
      setShowError(true);
    }
        
  }

  const resetForm = async () => {
    setName('');
    setVotesBiden(0);
    setVotesTrump(0);
    setStateSeats(0);
  }
  if(electionEnded){
    return(
      <div>
        <h1>The election has ended!!</h1>
        <h2>The winner is: <strong>{currentLeader}</strong></h2>
        <h3>Results:</h3>
          <p>Biden seats: {bidenSeats} </p>
          <p>Trump seats: {trumpSeats} </p>
      </div>
    )   
  }else {
    return (
    
      <div className="results-form">
      <p>
        <strong>Current Leader is: </strong>{currentLeader}
      </p>
      <p>
        <span className="seats"><strong>Biden Seats: </strong>{bidenSeats}</span>
        <span className="seats"><strong>Trump Seats: </strong>{trumpSeats}</span>
      </p>
  
      <p><span><strong>Election ended: </strong> {String(electionEnded)} </span></p>
    
      <form>
        <label>
          State:
          <input onChange={stateInput} value={name} type="text" name="state" />
        </label>
        <label>
          BIDEN Votes:
          <input onChange={bideVotesInput} value={votesBiden} type="number" name="biden_votes" />
        </label>
        <label>
          TRUMP Votes:
          <input onChange={trumpVotesInput} value={votesTrump} type="number" name="trump_votes" />
        </label>
        <label>
          Seats:
          <input onChange={seatsInput} value={stateSeats} type="number" name="seats" />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
      <div className="button-wrapper">
        <button onClick={submitStateResults}>Submit Results</button>
      </div>
  
      <div className="button-wrapper">
        <button onClick={submitEndElection}> End Election</button>
      </div>
      <LoaderTrasaction visible={loaderVisible} txHash={txHash} />
      <ErrorHandler showError={showError} tx={txHash} errorMsg={errorMessage} handleCleanErrors = {handleCleanErrors} />
    
      
      <style jsx>{`
          .results-form {
            display: flex;
            flex-direction: column;
          }
  
          .button-wrapper {
            margin: 20px;
          }
  
          .seats {
            margin: 15px;
          }
          
        `}</style>
      </div>
    )  
  }
  
  
};

export default USElection;
