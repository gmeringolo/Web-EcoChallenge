import React, { useState, useEffect } from 'react';
//imagenes
import Header from '../template/Header';
//css
import '../assetss/css/App.css'
//servicio
import topTechApi from '../services/topTechApi';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { getItem } from "../utils/localStorage";


const Faq = (props) => {

    const [state, setState] = useState({
        preguntas: [],
        modalInsertar: false, //estado para abrir y cerrar el modal 
        form: {
            id: '',
            descripcion: '',
            respuesta: '',
            tipoModal: ''
        }
    });

    // Un efecto se usa para ejucutar algo mientras el componente se carga
    useEffect(() => {
        peticionGet();
    }, []);

    const peticionGet = () => {
        let url = "preguntas";
        const token = JSON.parse(getItem('token'));
        topTechApi.get(url, { headers: { "Authorization": `Bearer ${token}` } }
        ).then(response => {
            console.log('token', response.data.token);
            setState({
                ...state,
                preguntas: response.data,
                modalInsertar: false
            });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //es asincrono porque se esta ejecutando en segundo plano
    //Para agregar pregunta
    const peticionPost = async () => {
        let url = "preguntas";
        delete state.form.id;
        const token = JSON.parse(getItem('token'));
        await topTechApi.post(url, state.form,
            {
                headers:
                    { "Authorization": `Bearer ${token}` },
            })
            .then(response => {
                getItem('token', JSON.stringify(response.data.token));
                modalClose();// al momento que el usuario inserte cerramos el modal
                peticionGet(); //y actualizamos los datos en la tabla
            }).catch(error => {
                console.log(error.message);
            })
    }

    //modificar todos los campos de la pregunta
    const peticionPut = () => {
        let url = "preguntas/";
        const token = JSON.parse(getItem('token'));
        topTechApi.put(url + state.form.id, state.form,
            {
                headers:
                    { "Authorization": `Bearer ${token}` },
            })
            .then(response => {
                getItem('token', JSON.stringify(response.data.token));
                modalClose();
                peticionGet();
            })
    }


    const seleccionarPregunta = (pregunta) => {
        setState({
            ...state,
            tipoModal: 'actualizar',
            form: {
                id: pregunta.id,
                descripcion: pregunta.descripcion,
                respuesta: pregunta.respuesta
            },
            modalInsertar: !state.modalInsertar
        })
    }

    //capturamos lo que el usuario escribe en los imputs
    //para esto necesitamos los atributos adentro de el form en el estado
    //es asincrono porque se esta ejecutando en segundo plano
    const handleChange = e => {
        e.persist();
        setState({ //cambiamos el estado cuando el usuario este escribiendo en el imput
            ...state,
            form: {
                ...state.form, //es para heredar todos los atributos que ya existan en el form y no se borren al momento queel usuario escriba
                [e.target.name]: e.target.value
            }
        });
    }

    // Mostrar el modal de adicionar un pregunta
    const agragarPregunta = () => {
        setState({
            ...state,
            form: null,
            tipoModal: 'insertar',
            modalInsertar: !state.modalInsertar
        });
    }

    const modalClose = () => {
        setState({
            ...state,
            modalInsertar: false
        });
    }

    const form = state.form;

    return (
        <>
            <Header />
            <div className="App">
                <div className="buscar-desafio-container">
                    <br /><br /><br />
                    <button className="btn btn-success" onClick={agragarPregunta}>Agregar Pregunta</button>
                    <br /><br /><br /><br /><br />
                </div>

                <div className="container table-responsive">
                    <table className="table table-hover table-light align-middle">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">DESCRIPCIÓN</th>
                                <th scope="col">RESPUESTA</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.preguntas.map(pregunta => {
                                return (
                                    <tr key={pregunta.id}>
                                        <td>{pregunta.id}</td>
                                        <td>{pregunta.descripcion}</td>
                                        <td>{pregunta.respuesta}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => { seleccionarPregunta(pregunta); }}><FontAwesomeIcon icon={faEdit} /></button>
                                            {"   "}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Modal isOpen={state.modalInsertar} fullscreen="lg">
                        <ModalHeader style={{ display: 'block' }}>
                            {state.tipoModal === 'insertar' ? <span>Insertar Pregunta</span> : <span>Modificar Pregunta</span>}
                            <span style={{ float: 'right', cursor: 'pointer' }} onClick={modalClose}>x</span>
                        </ModalHeader>
                        <ModalBody style={{ width: 560, padding: 30 }}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="col-md-12 control-label"> Descripción</label>
                                        <div className="col-lg-12">
                                            <input className="form-control" name="descripcion"
                                                placeholder="descripción" type="text"
                                                value={form ? form.descripcion : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="col-md-2 control-label"> Respuesta</label>
                                        <div className="col-lg-12">
                                            <input className="form-control" name="respuesta"
                                                placeholder="respuesta" type="text"
                                                value={form ? form.respuesta : ''}
                                                onChange={handleChange} />
                                        </div>
                                    </div>                                   
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            {state.tipoModal === 'insertar' ? //con esto le decimos a los botones que si el modal lo vamos a usar para insertar tiene que llamar a la peticion post, pero si es para actualizar tiene que llamar a la peticion put
                                <button className="btn btn-success" onClick={() => peticionPost()}>
                                    Insertar
                                </button> : <button className="btn btn-success" onClick={() => peticionPut()}>
                                    Actualizar
                                </button>
                            }
                            <button className="btn btn-danger" onClick={() => modalClose()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Faq;
