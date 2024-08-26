import { useState, useEffect } from 'react';
import { eventBus } from 'yaml-react-component';
import { UserMenuProps } from '../types';

const UserMenu = ( ) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const toggleMenu = () => {
      console.log('toggleMenu');
    };

    eventBus.subscribe('TOGGLE_MENU', toggleMenu);
    eventBus.publish('MENU_TOGGLED', {});

    return () => {
      eventBus.unsubscribe('TOGGLE_MENU', toggleMenu);
    };
  }, []);

  return (
    <div data-testid="UserMenu">
      <h1>UserMenu Component</h1>
    </div>
  )
};

export default UserMenu;
