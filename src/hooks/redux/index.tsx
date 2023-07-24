import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'shared/redux/store';

export const customDispatch: () => Dispatch = useDispatch;
export const customSelector: TypedUseSelectorHook<RootState> = useSelector;
