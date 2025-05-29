"use client";
import axios from "axios";
import { Edit, Eye } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useNavigate } from "react-router-dom";
import { BaseURL, mediaUrl } from "../../assets/helper/Urls";
import UserContext from "../../context/UserContext";
import styles from "./masonry.module.css";
import NoData from "../../components/NoData";

const MyPosts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  const [submitLoading, setSubmitLoading] = useState(false);
  const fetchPosts = async () => {
    const apiUrl = BaseURL(`blogs/my-blog/1`);

    setSubmitLoading(true);
    try {
      const response = await axios.get(apiUrl);
      if (response) {
        setPosts(response?.data);
      }
    } catch (err) {
      console.log(err);
    }

    setSubmitLoading(false);
  };
  useEffect(() => {
    if (user) fetchPosts();
  }, [user]);
  return (
    <div className={styles.wrapper}>
      {/* Header Section */}
      <div className={styles.header}>
        <p className={styles.exploreLabel}>Your Blogs</p>
        <h2 className={styles.mainTitle}>Be a part of our community</h2>
        <p className={styles.subText}>Share your stories with the world</p>
      </div>

      {submitLoading ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 650: 1, 800: 2, 900: 3 }}>
          <Masonry>
            {Array(10)
              .fill(0)
              .map((item, i) => {
                const height = i % 2 === 0 ? 200 : 300;
                return (
                  <div
                    key={i}
                    className={styles.card}
                    style={{ height: `${height}px` }}
                  >
                    <div className={styles.cardImageSkeleton}></div>
                  </div>
                );
              })}
          </Masonry>
        </ResponsiveMasonry>
      ) : posts?.length === 0 ? (
        <NoData text="No Post found" />
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={{ 650: 1, 800: 2, 900: 3 }}>
          <Masonry>
            {posts.map((item, i) => {
              const height = i % 2 === 0 ? 200 : 300;
              return (
                <div
                  key={i}
                  className={styles.card}
                  style={{ height: `${height}px` }}
                >
                  <img
                    src={mediaUrl(item?.image)}
                    alt={`Blog ${i}`}
                    className={styles.cardImage}
                  />
                  {user?.user_id === item?.user_id && (
                    <div
                      className={styles.bookmarkWrapper1}
                      onClick={() => navigate(`/edit-post/${item?.id}`)}
                    >
                      <Edit size={24} className="text-white cursor-pointer" />
                    </div>
                  )}
                  <div
                    className={styles.bookmarkWrapper}
                    onClick={() => navigate(`/posts/${item?.id}`)}
                  >
                    <Eye size={24} className="text-white cursor-pointer" />
                  </div>
                  <div className={styles.overlay}>
                    <h3 className={styles.overlayTitle}>{item?.title}</h3>
                  </div>
                  <div className={styles.authorWrapper}>
                    <img
                      src={mediaUrl(item?.image)}
                      alt="Author"
                      width={30}
                      height={30}
                      className={styles.authorImage || "Unknown"}
                    />
                    <span className={styles.authorName}>
                      {user?.user_id === item?.user_id
                        ? "You"
                        : item?.author_name || "Unknown"}
                    </span>
                  </div>
                </div>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
};

export default MyPosts;
const options = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "cinema",
    label: "Cinema",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "food",
    label: "Food",
  },
];
