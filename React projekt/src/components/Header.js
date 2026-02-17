import React, { useContext } from 'react';
import ThemeContext from '../store/theme-context';

const Header = () => {
  const ctx = useContext(ThemeContext);

  return (
    <header>
      <button onClick={ctx.toggleTheme}>
        {ctx.theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </header>
  );
};

export default Header;