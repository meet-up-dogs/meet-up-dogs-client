import react from 'react';
import logoPaw from '../images/pawfree.png';
import logoScript from '../images/logoscript.png'
import logoFree from '../images/logofree.png'
import './HeaderLogoPaw.css';


export default function HeaderLogoPaw() {

  console.log('test')
console.log('logo', logoPaw)

  return (
    <>
        <img className="logo-paw" src={logoFree} alt="logo mit Paw" />
        {/* <img className="logo-script"  src={logoScript} alt="logo mit Schriftzug" /> */}

    </>
  );
};