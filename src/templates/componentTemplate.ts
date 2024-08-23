export default `import React, { useState } from 'react';
import { templateTypes } from './typedir';

const index = (props : templatenameProps) => {
  const [state, setState] = useState<templateState>();
  return (
    <div data-testid="templatename">
      templatename Component
    </div>
  )
};

export default index;
`;
