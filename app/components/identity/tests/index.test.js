import React from 'react';
import { mount } from 'enzyme';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Identity from 'components/identity';
import IdentityActions from 'actions/identity';

describe('Identity', () => {
  const IdentityComponent = mount(<Identity identities={ [{id: "1", uid: "facebook", provider: "facebook"}] } />);

  beforeAll(() => {
    spyOn(IdentityActions, 'delete');
  });

  it('renders identitites', () => {
    expect(IdentityComponent.find('p').length).toEqual(1);
  });

  it("deletes identity", () => {
    IdentityComponent.find('p a').simulate('click');

    expect(IdentityActions.delete).toHaveBeenCalled();
  });
});
