import React from 'react';
import { mount } from 'enzyme';
import EmailConfirmation from 'components/email_confirmation';

describe('EmailConfirmation', () => {
  describe('when emails is confirmed', () => {
    const EmailConfirmationComponent = mount(<EmailConfirmation confirmed={ true } location={ {query: {confirmation_token: []}} } />);

    it('renders success message', () => {
      expect(EmailConfirmationComponent.text()).toContain('Email succesfully confirmed.');
    });
  });

  describe('when emails is unconfirmed', () => {
    const EmailConfirmationComponent = mount(<EmailConfirmation unconfirmed={ true } location={ {query: {confirmation_token: []}} } />);

    it('renders failed message', () => {
      expect(EmailConfirmationComponent.text()).toContain('Could not confirm email');
    });
  });

  describe('when token is present', () => {
    const EmailConfirmationComponent = mount(<EmailConfirmation location={ {query: {confirmation_token: "token"}} } />);

    it('renders confirming in process message', () => {
      expect(EmailConfirmationComponent.text()).toContain('Confirming email, please wait...');
    });
  });
});
