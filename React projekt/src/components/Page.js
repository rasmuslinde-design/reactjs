import React, { useContext } from 'react';
import ThemeContext from '../store/theme-context';

const Page = () => {
  const ctx = useContext(ThemeContext);

  return (
    <div className={ctx.theme}>
      <div className="content">
        <h1>{ctx.theme === 'light' ? 'Hele teema' : 'Tume teema'}</h1>
        <p>See on näidisleht Context API kasutamise kohta.</p>
      </div>
    </div>
  );
};

export default Page;