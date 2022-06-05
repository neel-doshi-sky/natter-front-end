import Header from "../components/Header";
import Meta from "../components/Meta";

const MyProfile = () => {
  // page content
  const pageTitle = "My Profile";
  const pageDescription = "This is where user info will be!";

  return (
    <div>
      <Meta title={pageTitle} />
      <Header head={pageTitle} description={pageDescription} />
    </div>
  );
};

export default MyProfile;
