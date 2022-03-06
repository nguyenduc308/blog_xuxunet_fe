import Head from 'next/head';
import { useEffect, useState } from 'react';
import BlockHtml from '../../components/blogs/block';
import {CommentInput, CommentItem} from '../../components/comment';
import { ContentLayout } from '../../components/layouts'
import http from '../../libs/http';
import { wrapper } from '../../store';
import { serverSideRedirect } from '../../helpers/auth';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const BlogDetail = ({ blog, comments: initcomments }) => {

  const [conversation, setConversation] = useState({
    comment_id: 0,
    content: '',
  });
  const [comments, setComments] = useState(initcomments);

  const [postingComment, setPostingComment] = useState('');
  const user = useSelector(state => state.auth?.user);

  const onReplyComment = (id) => {
    setConversation({
      comment_id: id,
      content: '',
    });
  }

  const onPostComment = (value, type, setValue) => {
    if (type === 'comment') {
      http.post('/comments', {
        blog_id: blog._id,
        content: value,
      }).then((res) => {
        setValue('');

        setComments([
          res.data,
          ...comments
        ])
      })
    } else {
      http.post('/comments', {
        blog_id: blog._id,
        content: value,
        comment_id: conversation.comment_id
      }).then((res) => {
        setValue('');
        setComments(comments.map((cmt) => {
          if (cmt._id === conversation.comment_id) {
            return {
              ...cmt,
              children: [...cmt.children, res.data]
            }
          }
          return cmt
        }))
      })
    }
  }

  const router = useRouter();

  useEffect(() => {
    const code = router.query.t;
    const campaign = localStorage.getItem('campaign');

    if (code && !campaign) {
      http.get(`/tracking/${code}`)
        .then(() => {
          localStorage.setItem('campaign', JSON.stringify({
            code,
            date: Date.now()
          }))
        });
    }
  }, [])

  return (
  <>
    <Head>
      <title>{blog.title}</title>
    </Head>
    <article className="blog-detail">
      <h2 className="blog-detail__title">{blog.title}</h2>
      <div className="blog-detail__content">
        {blog.blocks.map(block => {
          return <BlockHtml key={block.id} block={block} />
        })}
      </div>

      <div className="comment-list">
        <CommentInput
          user={user}
          postingComment={postingComment}
          type="comment"
          onPostComment={onPostComment}
        ></CommentInput>
        <div className="list">
          {comments &&
            comments.map((cmt) => {
              return (
                <CommentItem
                  key={cmt._id}
                  data={cmt}
                  onReplyComment={onReplyComment}
                  user={user}
                >
                  {cmt.children &&
                    cmt.children.map((child) => {
                      return (
                        <CommentItem
                          user={user}
                          key={child._id}
                          parentId={cmt._id}
                          data={child}
                          onReplyComment={onReplyComment}
                        ></CommentItem>
                      );
                    })}
                  {(conversation.comment_id === cmt._id ||
                    cmt.children?.some(
                      ({ _id }) => conversation.comment_id === _id,
                    )) && (
                      <CommentInput
                        user={user}
                        postingComment={postingComment}
                        type="reply"
                        onPostComment={onPostComment}
                      ></CommentInput>
                    )}
                </CommentItem>
              );
            })}
        </div>
      </div>
    </article>
  </>
  );
};

BlogDetail.Layout = ContentLayout;

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, res, req, params }) => {
  try {
    const result = await http.get('/blogs/' + params.slug, {
      params: {
        from: 'client'
      }
    });

    return {
      props: {
        blog: result.data.blog,
        comments: result.data.comments
      }
    }
  } catch {
    serverSideRedirect(res, '/404')
  }


});


export default BlogDetail;
