import { NAME } from './constants';

export const getContent = (state) => state[NAME].children;
export const getError = (state) => state[NAME].error;
export const hasCloseDisabled = (state) => state[NAME].disableClose;
export const isModal = (state) => state[NAME].modal;
export const isOpened = (state) => state[NAME].opened;
