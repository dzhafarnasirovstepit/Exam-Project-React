type ModalContentProps = {
	onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalContent = ({ onClose }: ModalContentProps) => {
	return (
		<div className="modal">
			<div>I'm a modal dialog</div>
			<button onClick={onClose}>Close</button>
		</div>
	);
}

export default ModalContent;