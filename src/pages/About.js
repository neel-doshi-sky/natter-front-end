import Header from "../components/Header";
import Meta from "../components/Meta";

const About = () => {
  // page content
  const pageTitle = "About";
  const pageDescription =
    "This is a demo twitter clone made by Neel Doshi! Hope you like it!";

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
    </div>
  );
};

export default About;
