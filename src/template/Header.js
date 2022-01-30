import React from 'react'
import { useHistory } from "react-router-dom";

//imagenes
import logoApp from '../assetss/img/logoB2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { removeItem } from "../utils/localStorage";

const Header = (props) => {

    const history = useHistory();

    const manejadorSubmit = () => {
    }

    const logout = (e) => {
        e.preventDefault();
        removeItem('token');
        history.push("/");        
    };

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="">
                    <img src={logoApp} width="80" height="50" className="d-inline-block align-top" alt=""/>                    
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse navigation" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active" onSubmit={manejadorSubmit}>
                            <a className="nav-link" href="/home">
                                Home<span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active" onSubmit={manejadorSubmit}>
                            <a className="nav-link" href="/desafios">
                                Desafíos<span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item active" onSubmit={manejadorSubmit}>
                            <a className="nav-link" href="/preguntas">
                                FAQ<span className="sr-only"></span></a>
                        </li>

                    </ul>
                    <form className="form-inline my-2 my-lg-0">                            
                         <button className="btn btn-outline-success" type="submit" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</button>
                    </form>


                </div>
            </div> 
        </nav>
    );
}

export default Header;