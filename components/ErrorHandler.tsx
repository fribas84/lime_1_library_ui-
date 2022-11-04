import React from 'react'

type ErrorHandlerProps ={
    showError:boolean;
    tx: string;
    errorMsg: string;
    handleCleanErrors: ()=>void   
}




function ErrorHandler({showError,tx,errorMsg, handleCleanErrors} :ErrorHandlerProps ) {
    
    const handleClose = () =>{
        console.log(showError);
        showError = !showError;
        console.log(showError);
    }

    return (
        <div hidden={!showError}>
            <div>
                <div>
                    <h2>An error has occured</h2>
                </div>
                <div>
                    <p>Cannot process Transaction: {tx}</p>
                    <p>{errorMsg}</p>
                </div>
            </div>
            <div className="button-wrapper">
                <button onClick={handleCleanErrors}>Close</button>
            </div>
        </div>
    )
}

export default ErrorHandler;