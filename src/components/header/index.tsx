import { useEffect } from 'react';
import { eventBus } from 'yaml-react-component';
import UserMenu from '../userMenu';
import { HeaderProps } from '../types';
import './style.css';

const Header = ( ) => {
  useEffect(() => {
    eventBus.publish('HEADER_CLICKED', {});
  }, []);

  return (
    <div data-testid="Header" className="header">
      <h1>Header Component</h1>
      <UserMenu />
    </div>
  )
};

export default Header;
