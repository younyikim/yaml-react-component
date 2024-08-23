export default `import React, { useState } from 'react';
import { templateTypes } from './typedir';
import './style.css';

const index = (props : templatenameProps) => {
  const [state, setState] = useState<templateState>();
  return (
    <div data-testid="templatename" className="templateclass">
      templatename Component
    </div>
  )
};

export default index;
`;
