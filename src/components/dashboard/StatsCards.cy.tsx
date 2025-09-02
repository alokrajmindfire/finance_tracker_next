import React from 'react';
import { StatsCards } from './StatsCards';

describe('<StatsCards />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<StatsCards />);
  });
});
