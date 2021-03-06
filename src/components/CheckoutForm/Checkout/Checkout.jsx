import React, {useState, useEffect} from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";

import { commerce } from '../../../lib/commerce';
import useStyles from "./styles";
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
const steps = ["Адреса за испорака", "Детали за наплата"];
const Checkout = ({cart}) => {

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] =useState(null);
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(() => {
        const generateToken = async () => {
            try {
const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
console.log(token);
setCheckoutToken(token);

            }
            catch (error){

            }
        }
        generateToken();
    }, [cart])

const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

const next = (data) => {
    setShippingData(data);
    nextStep();
}

    const Confirmation = () => (
    <div>
        Confirmation
    </div>
    )
    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm shippingData={shippingData} />
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Кон Наплата
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/*This means If we are on the last step, then procedure to Confirmation */}
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}  {/* --> THIS MEANS ONLY IF WE HAVE THE CHECKOUT TOKEN THEN RENDER THE FORM  */}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
