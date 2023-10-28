export default function ModalContent({ onClose, text, type }) {
  //vars
  const className = type + " modal";

  return (
    <div className={className}>
      <div>{text}</div>
      <button onClick={onClose}> OK </button>
    </div>
  );
}
