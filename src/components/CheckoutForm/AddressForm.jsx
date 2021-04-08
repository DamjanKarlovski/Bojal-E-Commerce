import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField'
import { Link } from 'react-router-dom';

import {commerce } from '../../lib/commerce';

const AddressForm = ({checkoutToken, next}) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

const countries = Object.entries(shippingCountries).map(([code, name]) => ( { id: code, label: name}));
console.log("COUNTRIES" ,countries);
const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ( { id: code, label: name}));

//const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted})`}));



    const methods = useForm();

    const fetchShippingCountries = async(checkoutTokenId) => {

        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
        console.log(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
        
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});

        setShippingOptions(options);
        setShippingOptions(options[0].id);

    }

useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
}, [])  //it is from type ComponentDidMount

useEffect(() => {
if(shippingCountry) fetchSubdivisions(shippingCountry); //If it exists shipping country, then call fetchSubdivisions
}, [shippingCountry])

useEffect(() =>{
if(shippingSubdivision) fetchShippingOptions( checkoutToken.id, shippingCountry, shippingSubdivision);
}, [shippingSubdivision])


    return (
        <>
            <Typography variant="h6" gutterBottom>Адреса за испорака</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput required name="firstName" label="Име"/>
                        <FormInput required name="lastName" label="Презиме"/>
                        <FormInput required name="address1" label="Адреса"/>
                        <FormInput required name="email" label="Е-маил"/>
                        <FormInput required name="city" label="Град"/>
                        <FormInput required name="zip" label="Поштенски број"/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Земја</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country)=> (
                                    <MenuItem key={country.id} value={country.id} >
                                   {country.label}
                                </MenuItem>
                                ))}
                               
                            </Select>
                        </Grid>
                          <Grid item xs={12} sm={6}>
                            <InputLabel>Градови на испорака</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdevision) => (
                                    <MenuItem key={subdevision.id} value={subdevision.id} >
                                    {subdevision.label}
                                </MenuItem>

                                ))}
                                
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Опции за испорака</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id} >
                                    {option.label}
                                </MenuItem>

                                ))}
                                
                            </Select>
                        </Grid>*/}
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to='/cart' variant="outlined" color="secondary">Назад кон кошничката</Button>
                        <Button type="submit" variant="contained" color="primary">Следно</Button>

                    </div>
                </form>


            </FormProvider>
        </>
    )
}

export default AddressForm
