import Alert from "@mui/material/Alert";


const AlertComp  = (props) => {



  return (
    <>
    <Alert onClose={() => {props.setAlertOn({status: false})}}  severity="error" >{props.alertOn.error} </Alert>

    </>
  );
};

export default AlertComp