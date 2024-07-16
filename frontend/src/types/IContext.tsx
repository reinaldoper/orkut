import { Dispatch, SetStateAction } from 'react';


export interface ContextProps {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}
