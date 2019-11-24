import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import { Button, Icon, Input, Menu } from 'semantic-ui-react';

function Navbar(props) {
  const {
    inputName,
    start,
    restart,
    gameStatus,
    settingOptions,
    handleSettingsChange
  } = props;

  const renderBtn = () =>
    gameStatus.end ? (
      <Button color='linkedin' content='Play again' onClick={restart} />
    ) : (
      <Button color='linkedin' content='Play' onClick={start} />
    );

  return (
    <Menu attached='top' className='Menu'>
      <Menu.Item>
        <Input
          icon='user'
          placeholder='Enter your name'
          onChange={e => inputName(e.target.value)}
        />
      </Menu.Item>
      <Menu.Item>{renderBtn()}</Menu.Item>
      <Menu.Item>
        <Settings
          settingOptions={settingOptions}
          handleSettingsChange={handleSettingsChange}
        />
      </Menu.Item>
      <Menu.Item as={Link} to='/winners'>
        <Icon name='trophy' size='large' color='black' />
      </Menu.Item>
      <Menu.Item as={Link} to='/'>
        <Icon name='home' size='large' color='black' />
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
