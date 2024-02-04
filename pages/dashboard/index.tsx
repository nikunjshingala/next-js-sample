import BasicContainer from '@components/basic-container';
import { useGlobalContext } from 'contexts';

const Dashboard = () => {
  const { toggleHamBurger, isHamburgerOpen } = useGlobalContext();

  return (
    <>
      <BasicContainer
        loggedin={true}
        isHamburgerOpen
        toggleHamBurger={() => toggleHamBurger(!isHamburgerOpen)}
      >
        <h2 className="font-bold text-2xl mb-4">
          Welcome to the Admin Dashboard
        </h2>
        <p>Here you can manage orders, customers, and settings.</p>
      </BasicContainer>
    </>
  );
};

export default Dashboard;
