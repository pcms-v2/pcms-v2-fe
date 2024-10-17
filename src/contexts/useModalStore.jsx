import { create } from 'zustand';

const INIT_MODAL = {
  isOpen: false,
  title: '',
  proceedBtnName: '추가',
  children: '',
  onClose: () => {},
  onProceed: () => {},
  oneBtn: false,
};

export const useModalStore = create(set => ({
  modal: INIT_MODAL,
  errMsg: '',
  warningMsg: '',
  setModal: modal => set({ modal: { ...INIT_MODAL, ...modal } }),
  setErrMsg: msg => set({ errMsg: msg }),
  setWarningMsg: msg => set({ warningMsg: msg }),
  closeModal: () => set({ modal: INIT_MODAL, errMsg: '', warningMsg: '' }),
}));
