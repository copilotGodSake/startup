import React from "react";
import { Post } from "../types/Post";
import styles from "../css/Card.module.css";
import { useNavigate } from "react-router-dom";
interface CardProps {
  post: Post;
}

export const Card: React.FC<CardProps> = ({ post }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/posts/${post.id}`);
  };
  return (
    <div className={styles.card} key={post.id} onClick={handleClick}>
      <div className={styles.img}></div>
      <h2 className={styles.h2}>{post.title}</h2>
      <p className={styles.p}>{post.body}</p>
    </div>
  );
};
