import React from 'react';
import '../App.css';
import { Dropdown, Icon } from 'semantic-ui-react';

function Settings(props) {
  const { settingOptions, handleSettingsChange } = props;
  const trigger = <Icon name='setting' size='large' />;

  const options = settingOptions.map(el => {
    const { mode, field, delay } = el;
    return {
      key: mode,
      text: mode,
      onClick: () => handleSettingsChange({ mode, field, delay })
    };
  });

  return (
    <Dropdown
      trigger={trigger}
      options={options}
      pointing='top left'
      icon={null}
    />
  );
}

export default Settings;
