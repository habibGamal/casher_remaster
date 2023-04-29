type ModelForm = ({
    modelToEdit,
    closeModal,
}: {
    modelToEdit?: any;
    closeModal: () => void;
}) => JSX.Element;

export default ModelForm;
