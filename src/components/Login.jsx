import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
//css
import '../assetss/css/Home.css'
import '../assetss/css/Login.css';
//imagenes
import logoApp from '../assetss/img/logoApp.png'
//servicio
import topTechApi from '../services/topTechApi';
//librerias

import { saveItem } from "../utils/localStorage";

const Login = (props) => {
    const history = useHistory();
    const [state, setState] = useState({
        form: {
            userName: "",
            password: ""
        },
        error: false,
        errorMsg: ""
    });

    const manejadorSubmit = e =>{
        e.preventDefault()
    }

    const manejadorChange = e=>{
        setState({
            ...state,
            form: {
                ...state.form,
                [e.target.name]: e.target.value
            }
        });  
    }

    const manejadorBtn=()=>{
        let url = "user/authenticate";
        topTechApi.post(url,state.form)
        .then( response=> {
            // saveTokenInLocalStorage(response.data.token);   
            saveItem('token',JSON.stringify(response.data.token));         
            console.log('token', response.data.token);
            history.push('/home');
        /*el metodo catch se utiliza para controlar los errores que no estan incluidos en la api
         * como por ejemplo que la api este caida o que no tengas internet
         */                
        }).catch( error => {
            console.log(error);
            setState({
                ...state,
                error : true,
                errorMsg : "Error: Password o usuario incorrectos"
            });
        })
    }

    return(
        <React.Fragment> 
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                    <br/><br/>
                    </div>

                    <div className="fadeIn first">
                    <img src={logoApp} width="150px" alt="User Icon" /><br/><br/>
                    </div>

                    <form onSubmit={manejadorSubmit}>
                        <input type="text" className="fadeIn second" name="userName" placeholder="Nombre" onChange={manejadorChange}/>
                        <input type="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={manejadorChange}/><br/><br/>
                        <button type="button" className="btn btn-success btn-lg" onClick={manejadorBtn}>Ingresar</button><br/><br/>
                    </form>

                {state.error === true &&
                    <div className="alert alert-danger" role="alert">
                        {state.errorMsg}
                    </div>
                } 
                </div>
            </div>

        </React.Fragment>

    );
}

export default Login