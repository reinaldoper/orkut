import { createContext, Dispatch, SetStateAction } from 'react';

interface ContextProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

export default Context;
