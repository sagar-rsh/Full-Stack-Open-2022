const Notification = ({ message }) => {
  return message === null ? null : <div className='status'>{message}</div>;
};

export default Notification;
