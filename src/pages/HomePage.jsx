import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Welcome to neog food ordering app</h1>
      <Link to="/menu">
        <button>Menu</button>
      </Link>
    </>
  );
};
export default HomePage;
