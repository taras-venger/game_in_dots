import React from 'react';
import '../App.css';
import { Dropdown, Icon } from 'react-bootstrap';

function Settings(props) {
  const { settingOptions, handleSettingsChange } = props;

  const options = settingOptions.map(el => {
    const { mode, field, delay } = el;
    return (
      <Dropdown.Item
        key={mode}
        onSelect={() => handleSettingsChange({ mode, field, delay })}
      >
        {el.mode}
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle variant='success' id='dropdown-basic'>
        Pick game mode
      </Dropdown.Toggle>
      <Dropdown.Menu>{options}</Dropdown.Menu>
    </Dropdown>
  );
}

export default Settings;
