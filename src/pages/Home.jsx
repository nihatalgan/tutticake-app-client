import { useContext } from "react"; // <== ADD
import { ThemeContext } from "./../context/theme.context"; // <== ADD

function HomePage() {
  const value = useContext(ThemeContext);
  return (
    <section className={"hero-section" + value}>
      <h1 className="hero-title">Tutti Cake</h1>
    </section>
  );
}

export default HomePage;
