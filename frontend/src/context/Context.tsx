import { createContext } from 'react';
import { ContextProps } from '../types/IContext';

const Context = createContext<ContextProps | undefined>(undefined);

export default Context;
