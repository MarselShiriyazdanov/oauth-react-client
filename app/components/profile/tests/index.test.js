import React from 'react';
import { mount } from 'enzyme';
import Profile from 'components/profile';
import ProfileActions from 'actions/profile';
import { Alert } from 'react-bootstrap';

describe('Profile', () => {
  const ProfileComponent = mount(<Profile current_user={ {first_name: "", last_name: "", email: "", current_password: "", password_confirmation: ""} } errorMessage="123" successMessage="312" />);

  beforeAll(() => {
    spyOn(ProfileActions, 'get')
  });

  describe('when Profile is loaded and messages present', () => {
    beforeAll(() => {
      ProfileComponent.setState({current_user: {first_name: "123", last_name: "312", email: "asd", password: "", current_password: "", password_confirmation: "", identities: []}});
    });

    it('renders Alert component', () => {
      expect(ProfileComponent.find(Alert).length).toEqual(2);
    });
  });

  describe('when Profile is not loaded', () => {
    beforeAll(() => {
      ProfileComponent.setState({current_user: {} });
    });

    it('renders waiting message', () => {
      expect(ProfileComponent.text()).toContain('Please wait');
    });
  });
});
