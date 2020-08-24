import React from 'react';
import createMount from '@material-ui/core/test-utils/createMount';
import SearchInputWithButton from './SearchInputWithButton';

const mockProps = {
  onSearch: jest.fn(),
  placeholder: "Search",
  name: "searchInputWithButton",
  helpText: "Help text will appear here"
};

describe('should test SearchInputWithButton component', () => {
  let mount = createMount();
  let wrapper;
  let onClick;

  wrapper = mount(<SearchInputWithButton { ...mockProps} onClick={onClick}/>);

  it('should render the SearchInputWithButton Component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render SearchInputWithButton button', () => {
    const searchInputWithButton = wrapper.find('#searchInput_searchInputWithButton');
    expect(searchInputWithButton.length).toEqual(1);
  });

  it('should render value and check clear button appears', () => {
    expect(wrapper.find('button[name="clearInputButton_searchInputWithButton"]').exists()).toBeFalsy();
    const SearchInput = wrapper.find('input[name="searchInput_searchInputWithButton"]');
    SearchInput.simulate('change', { target: { value: 'Hello' } });
    wrapper.update();
    expect(wrapper.find('button[name="clearInputButton_searchInputWithButton"]').exists()).toBeTruthy();
  });

  it('should check click on search button', () => {
    const SearchInputSearchButton = wrapper.find('button[name="searchInputButton_searchInputWithButton"]');
    SearchInputSearchButton.simulate('click');
    wrapper.update();
    expect(mockProps.onSearch).toBeCalled();
  });
});