import { FallingLines } from  'react-loader-spinner';


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
                Click to view transaction in Etherscan</a></p>
        </div>

    );

};

export default LoaderTransaction;