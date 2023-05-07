import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span>app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            natus possimus nemo recusandae repudiandae reiciendis ad, dolorum
            repellendus, delectus expedita exercitationem, harum quasi! Sit,
            laudantium.
          </p>
          <Link className="btn btn-hero" to="/register">
            login/register
          </Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
