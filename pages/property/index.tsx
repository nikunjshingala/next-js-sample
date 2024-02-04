import React from 'react';
import BasicContainer from '@components/basic-container';
import { useGlobalContext } from 'contexts';
import Link from 'next/link';

const PropertyListing = () => {
  const { toggleHamBurger, isHamburgerOpen } = useGlobalContext();
  return (
    <BasicContainer
      loggedin={true}
      isHamburgerOpen
      toggleHamBurger={() => toggleHamBurger(!isHamburgerOpen)}
    >
      <Link href={`property/add`}>Add Property</Link>
    </BasicContainer>
  )
}

export default PropertyListing;