
import React from 'react';
//css
import '../assetss/css/Home.css'
import Header from '../template/Header';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Home() {
  //aca vamos a poner nuestros parametros a comparar
  const data = {
    labels: ['12', '13', '14', '15', '16', '17', '18'],
    datasets: [{
      label: 'Plástico',
      backgroundColor: '#3F7CAC',
      borderColor: '#154360',
      borderWidth: 2,
      hoverBackgroundColor: '#A9CCE3',
      hoverBorderColor: '#154360',
      data: [300, 785, 368, 984, 1255, 245, 745]
    },{
      label: 'Cartón',
      backgroundColor: '#A24936',
      borderColor: '#641E16',
      borderWidth: 2,
      hoverBackgroundColor: '#E6B0AA',
      hoverBorderColor: '#641E16',
      data: [30, 456, 456, 100, 469, 1234, 1467]    
    },{
      label: 'Papel',
      backgroundColor: '#909497',
      borderColor: '#626567',
      borderWidth: 2,
      hoverBackgroundColor: '#D7DBDD',
      hoverBorderColor: '#626567',
      data: [123, 586, 656, 400, 669, 334, 267]    
    },
  ]
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true
  }
  return (

    <React.Fragment>
      <Header />
      <div className="App" style={{ width: '80%', height: '400px', marginLeft: 100 }}>
        <br />
        <h4>Gráfica cantidad de material reciclado por rango de edad</h4>
        <br />
        <Bar data={data} options={options} />
      </div>


    </React.Fragment>
  );

}

export default Home;