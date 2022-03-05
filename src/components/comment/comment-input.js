import { useState } from 'react';
import { Modal, Button } from 'antd';
import { useRouter } from 'next/router';

const CommentInput = ({
  type,
  onPostComment,
  postingComment,
  user,
}) => {
  const [value, setValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const handleOk = () => {
    setIsModalVisible(false);
    router.push('/auth/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePostComment = () => {
    onPostComment(value, type, setValue);
  };

  const handleFormInputClick = () => {
    if (!user) {
      setIsModalVisible(true)
    }
  }

  return (
    <>
    <div className="comment-input" onClick={handleFormInputClick}>
      <div className="cmt-input-avatar">
        <img
          src={user && user?.avatar_url ? user?.avatar_url : '/no-avatar.png'}
        />
      </div>
      <div className="cmt-input-body">
        <textarea
          className="cmt-input"
          value={value}
          placeholder={type === 'comment' ? 'Bình luận gì đó' : 'Trả lời'}
          onChange={(e) => setValue(e.target.value)}
          disabled={!user}
        ></textarea>
        <div className="cmt-input-meta">
          {value && (
            <button className="cmt-input-action" onClick={handlePostComment}>
              {postingComment === type && <span>Posting..</span>}
              {postingComment === '' && <span>Đăng</span>}
            </button>
          )}
        </div>
      </div>
    </div>
    <Modal title="Yêu cầu đăng nhập" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn phải đăng nhập để bình luận</p>
    </Modal>
    </>
  );
};

export default CommentInput;
