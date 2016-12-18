import React from 'react';
import { mount } from 'enzyme';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import SocialLinks from 'components/socialLinks';

describe('SocialLinks', () => {
  const SocialLinksComponent = mount(<SocialLinks googleLinkText="Google" facebookLinkText="Facebook" />);

  it('renders social links', () => {
    expect(SocialLinksComponent.find('a').at(0).text()).toContain("Google");
    expect(SocialLinksComponent.find('a').at(1).text()).toContain("Facebook");
  });
});
