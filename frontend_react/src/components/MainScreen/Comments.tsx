import React, { useContext, useEffect, useState } from 'react';
import './Comments.css';
import { Spinner } from 'react-bootstrap';
import { AxiosContext } from '../context/AxiosProvider/AxiosProvider';
import SingleComment from './SingleComment';
import CommentButton from './CommentButton';

interface CommentsProps {
  id: number;
}

const Comments: React.FC<CommentsProps> = ({ id }) => {
  const { publicAxios } = useContext(AxiosContext);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const result = await publicAxios.get(`/posts/postcomments/${id}`);
      if (result) {
        setLoading(false);
        setComments(result.data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const formatDate = (isoDateString: string) => {
    const months = [
      'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
      'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
    ];

    const date = new Date(isoDateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${months[monthIndex]} ${year}`;
  };

  const calcRating = (exercise: any) => {
    let rating = 0;
    let counter = 0;

    if (exercise.posts_reviews && Array.isArray(exercise.posts_reviews)) {
      for (let i = 0; i < exercise.posts_reviews.length; i++) {
        counter++;
        rating += exercise.posts_reviews[i].reviews.rate;
      }
      return counter > 0 ? rating / counter : 0;
    } else {
      return 0;
    }
  };

  return (
    <div className="comments-container">
      <h2 className="bold-text">Odpowiedzi</h2>
      <div>
        {loading ? (
          <Spinner color="gray" style={{ margin: 15 }} />
        ) : null}

        {comments.length > 0 ? (
          comments.map((comment) => {
            const rating = calcRating(comment);
            const isoDateString = comment.date;
            const formattedDate = formatDate(isoDateString);
            return (
              <SingleComment
                key={comment.id}
                user_data={comment.users_posts}
                id={comment.id}
                title={comment.title}
                description={comment.content}
                rate={rating}
                date={formattedDate}
                posts_images={comment.posts_images}
              />
            );
          })
        ) : (
          <p style={{ fontSize: 18, color: 'gray', fontWeight: '900', margin: 10 }}>
            Nic tu nie ma. Bądź pierwszy, który skomentuje!
          </p>
        )}

        <CommentButton id={id} handleRefresh={fetchPosts} />
      </div>
    </div>
  );
};

export default Comments;
