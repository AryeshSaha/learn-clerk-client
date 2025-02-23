import { useUser } from "@clerk/clerk-react";

const AccountDetails = () => {
  const { isLoaded, user } = useUser();
  if (!isLoaded) return <div>Loading...</div>;
  else console.log(user);

  const { firstName, fullName, primaryEmailAddress, imageUrl } = user

  return (
    <>
      <h1>Hello {firstName}</h1>
      <h3>Your Details are below: </h3>
      <ul>
        <li>Your Full Name: {fullName}</li>
        <li>Your Primary Email Address: {primaryEmailAddress.emailAddress}</li>
        <li>Your Avatar: <img src={imageUrl} alt="Clerk default avatar" /></li>
      </ul>
    </>
  );
};
// TODO: Add a logout button with clerk's functionality

export default AccountDetails;
