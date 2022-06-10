import NatterList from "../components/natter/NatterList";
import UserDetails from "../components/user/UserDetails";

const MyProfile = (props) => {
  // page content
  const pageTitle = "NATR";
  const pageDescription = "what's the latest natter?";

  return (
    <>
      <UserDetails />
      <NatterList></NatterList>
    </>
  );
};

export default MyProfile;
