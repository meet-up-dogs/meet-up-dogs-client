import Alert from "@mui/material/Alert";
import "./alert.css"

const AlertComp  = (props) => {



  return (
    <>
    <Alert 
    style={{fontFamiliy: "system-ui !important", fontWeight: "bold !important"}}
    onClose={() => {props.setAlertOn({status: false})}}  severity="error" >{props.alertOn.error} </Alert>

    </>
  );
};

export default AlertComp