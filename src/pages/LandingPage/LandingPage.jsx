import {useNavigate} from "react-router-dom";
import create_form from "../../assets/create_form.png";
import "./landingPage.css";

const LandingPage = () => {

  const navigateTo = useNavigate();

  return (
    <main className="landingPage">
        <section className='createClick' onClick={()=>{
            navigateTo("/createForm");
          }}>
          <h1>Create Form</h1>
          <img src={create_form} alt="" />
        </section>
    </main>
  )
}

export default LandingPage;