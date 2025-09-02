import React from 'react';
import NavLinks from './NavLinks';

describe('<NavLinks />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NavLinks />);
  });
});
