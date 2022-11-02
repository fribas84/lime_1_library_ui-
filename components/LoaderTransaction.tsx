import { FallingLines } from  'react-loader-spinner';
import { useState } from 'react';

type LoaderTransactionProps ={
    visible: boolean;
    txHash: string
}

const LoaderTransaction = ({visible, txHash}: LoaderTransactionProps) =>{


    return(
        <div hidden={!visible}>
            <FallingLines
                color="#4fa94d"
                width="100"
                visible={visible}
                
            />
            <p>Trasaction hash: {txHash}</p>
            <p><a href={"https://goerli.etherscan.io/tx/" + txHash} target="_blank" rel="noopener noreferrer">
                View Tx in Etherscan!</a></p>
        </div>

    );

};

export default LoaderTransaction;