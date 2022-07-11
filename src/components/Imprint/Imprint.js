import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';




 const Imprint  = (props) => {

  const margin = { m: 1 };

  return (

    <>

      <Header
        login={props.login}
        handleChange={props.handleChange}
        margin={margin}
        user={props.user}
      />

    </>
  );
};

export default Imprint;