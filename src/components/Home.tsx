import React from "react";
import { Post } from "../types/Post";
import { useGetPostsQuery } from "../services/posts";
import { Navbar } from "./Navbar";
import { Card } from "./Card";
import styles from "../css/Card.module.css";

const Home: React.FC = () => {
  const { data, error, isLoading } = useGetPostsQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <Navbar />
      <div>
        <ul className={styles.postContainer}>
          {data?.map((post: Post) => {
            return <Card key={post.id} post={post} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
