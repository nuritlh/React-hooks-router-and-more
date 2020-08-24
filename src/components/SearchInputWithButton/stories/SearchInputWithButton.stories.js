import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme';
import SearchInputWithButtonReadme from '../README.md';
import SearchInputWithButton from '../SearchInputWithButton';

const stories = storiesOf('SearchInputWithButton', module);
stories.addDecorator(addReadme);
stories.addParameters({
  readme: {
    sidebar: SearchInputWithButtonReadme,
    highlightSidebar: true,
    highlightContent: true,
  },
});
stories.addParameters({
  options: { theme: {} }
});

stories
  .add('SearchInputWithButton', () => (
    <div style={{ margin: '50px' }}>
      <SearchInputWithButton
        placeholder="placeholder"
        helpText="Help text will appear here"
        name="example_for_search_input_with_button"
        onSearch={action("onSearch")}
      />
    </div>
  ));
