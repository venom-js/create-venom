import { useStateReducer } from '../basic-component/UseStateReducer';

const initState = {
  open: false,
  filterParams: {} as any
};

export type SearchTableState = typeof initState;

function useSearchTableState<T>(propsState): [T, (state: Partial<T>) => void] {
  const getInitState = () => ({
    ...initState,
    ...propsState
  });
  const [state, setState] = useStateReducer<T>(getInitState());
  return [state, setState];
}

export default useSearchTableState;
