# SearchInputWithButton Component

The SearchInputWithButton is a normal input usual for search trigger by onclick.

## Properties

| Name          | Type       | Default  | Description                                                            |
| :------------ | :--------- | :------- | :--------------------------------------------------------------------- |
| `helpeText`   | `string`   | ''       | the helper text content.                                               |
| `placeholder` | `string`   | 'Search' | the short hint displayed in the input before the user select a value.  |
| `onSearch`    | `function` | ()=>{}   | Callback fired when the search button been clicked / user press Enter. |
| `name`        | `string`   | ''       | target value.                                                          |

## Usage

```jsx
<SearchInputWithButton
  placeholder="placeholder"
  helpText="Help text will appear here"
  name="example_for_search_input_with_button"
/>
```
