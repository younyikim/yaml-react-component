import { program } from 'commander';

// Utils
import { initGenerateComponent } from './utils/initGenerateComponent';

initGenerateComponent(program);
program.parse(process.argv);

export { eventBus } from './utils/eventBus';
