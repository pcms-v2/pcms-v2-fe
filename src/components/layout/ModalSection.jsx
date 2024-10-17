import Modal from '../common/Modal';
import { useModalStore } from '../../contexts/useModalStore';

const ModalSection = () => {
  const { modal, errMsg, warningMsg, closeModal } = useModalStore();

  const handleCloseModal = () => {
    if (modal.onClose) {
      modal.onClose();
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={modal.isOpen}
      title={modal.title}
      proceedBtnName={modal.proceedBtnName}
      errMsg={errMsg}
      warningMsg={warningMsg}
      onClose={handleCloseModal}
      onProceed={modal.onProceed}
      oneBtn={modal.oneBtn}
      isWarning={modal.isWarning}
      paddingSize={modal.paddingSize}
    >
      {modal.children}
    </Modal>
  );
};

export default ModalSection;
