import { useEffect } from 'react';
import { eventBus } from 'yaml-react-component';
import UserMenu from '../userMenu';
import './style.css';

interface HeaderProps { title: string; user: Record<string, unknown> }

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
