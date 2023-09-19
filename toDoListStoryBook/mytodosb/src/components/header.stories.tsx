import React from 'react';
import Header from './header';
import { any } from 'prop-types';

export default {
  title: 'Header',
  component: Header,
  argTypes: {
    onMenuClick: { action: 'menu clicked' },
  },
};

const Template = (args:any) => <Header {...args} />;

export const Default = Template.bind({});

