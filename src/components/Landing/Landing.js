import { LandingContainer } from './Landing.styles';

const Landing = () => {
  return (
    <LandingContainer>
      <h1 className="header">A simple App to organize your due date tasks.</h1>
      <p className="subheader">Store your daily/future tasks.</p>
      <p className="subheader">Follow up with deadlines.</p>
      <p className="subheader">
        Mark the task as completed once its marked as Done!
      </p>
    </LandingContainer>
  );
};

export default Landing;
