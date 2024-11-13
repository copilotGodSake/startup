import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AppDispatch } from "../store/store";
import {
  fetchPostDetails,
  fetchComments,
} from "../store/slices/postDetailsSlice";
import stylesPostDetails from "../css/PostDetails.module.css";
import { Navbar } from "./Navbar";

export const PostDetails: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const dispatch: AppDispatch = useDispatch();
  const post = useSelector((state: RootState) => state.postDetails.post);
  const comments = useSelector(
    (state: RootState) => state.postDetails.comments
  );
  const isLoading = useSelector(
    (state: RootState) => state.postDetails.isLoading
  );
  const error = useSelector((state: RootState) => state.postDetails.error);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostDetails(postId));
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error}</div>;

  return (
    <>
      <Navbar />
      <div className={stylesPostDetails.container}>
        {post && (
          <>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h2>Comments</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p>
                    <strong>{comment.name}</strong>: {comment.body}
                  </p>
                </li>
              ))}
            </ul>
            <button
              className={stylesPostDetails.previousBtn}
              onClick={() => navigate("/")}
            >
              Return
            </button>
          </>
        )}
      </div>
    </>
  );
};
