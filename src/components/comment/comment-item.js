import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import vi from 'date-fns/locale/vi';
import { useState } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';

const CommentItem= ({
  children,
  onReplyComment,
  data,
  parentId,
  user,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const handleOk = () => {
    setIsModalVisible(false);
    router.push('/auth/login')
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onClickReply = () => {
    if (!user) {
      setIsModalVisible(true);
      return;
    }

    onReplyComment && onReplyComment(parentId ? parentId : data._id);
  };

  return (
    <>
    <div className="comment-item">
      <div className="cmt-avatar">
        <img src={data?.user?.avatar_url || '/no-avatar.png'} />
      </div>
      <div className="cmt-body">
        <div className="cmt-header">
          <span className="name">
            {data?.user?.last_name
              ? data?.user?.last_name + ' ' + data?.user?.first_name
              : 'Chưa có tên'}
          </span>
        </div>
        <div className="cmt-content">{data.content}</div>
        <div className="cmt-meta">
          <span className="action" onClick={onClickReply}>
            Trả lời
          </span>
          {data.created_at && <span className="time">
            {formatDistanceToNowStrict(new Date(data.created_at), {
              locale: vi,
            })}{' '}
            trước
          </span>}
        </div>
        <div className="children">{children}</div>
      </div>
    </div>

    <Modal title="Yêu cầu đăng nhập" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>Bạn phải đăng nhập để bình luận</p>
    </Modal>
    </>
  );
};

export default CommentItem;
