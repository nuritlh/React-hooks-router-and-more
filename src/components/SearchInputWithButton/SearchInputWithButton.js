import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 250,
    border: `1px solid #d0cccc`,
    borderRadius: 4,
    backgroundColor: '#e7f0fe'
  },
  input: {
    flex: 1,
    marginLeft: 10
  },
  inputProps: {
    fontSize: 14,
    backgroundColor: '#e7f0fe'
  },
  divider: {
    height: 30,
    padding: 0.2
  },
  iconButton: {
    padding: 0,
    margin: "0 10px"
  },
  helpText: {
    padding: "4px 0"
  }
});

const SearchInputWithButton = ({ onSearch, placeholder, helpText, name, classes }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeValue = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const onClearText = useCallback(() => {
    setSearchTerm('');
  },[]);

  const onSearchTerm = useCallback((val) => {
    onSearch(val);
  },[onSearch]);

  const onKeyPress = useCallback((e) => {
    if (e.which === 13) {
      e.preventDefault();
      onSearchTerm(e.target.value);
    }
  }, [onSearchTerm]);

  return (
    <>
      <div className={classes.root} id={`searchInput_${name}`}>
        <TextField
          placeholder={placeholder}
          className={classes.input}
          onChange={onChangeValue}
          value={searchTerm}
          onKeyDown={onKeyPress}
          size="small"
          name={`searchInput_${name}`}
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.inputProps,
            }
          }}
        />
        { searchTerm !== '' &&
        <IconButton className={classes.iconButton} aria-label="clear" onClick={onClearText} name={`clearInputButton_${name}`}>
          <ClearIcon />
        </IconButton>
        }
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={() => onSearchTerm(searchTerm)}
          name={`searchInputButton_${name}`}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <Typography variant="caption" display="block" gutterBottom color="textSecondary" className={classes.helpText}>
        {helpText}
      </Typography>
    </>
  );
};

SearchInputWithButton.defaultProps = {
  onSearch: () => {},
  placeholder: 'Search',
  helpText: ''
};

SearchInputWithButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(SearchInputWithButton);
