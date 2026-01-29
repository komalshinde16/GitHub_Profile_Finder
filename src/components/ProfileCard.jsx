import { motion } from "framer-motion";

const ProfileCard = ({ user }) => {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={user.avatar_url} alt="avatar" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio || "No bio available"}</p>

      <div className="stats">
        <span>Repos: {user.public_repos}</span>
        <span>Followers: {user.followers}</span>
        <span>Following: {user.following}</span>
      </div>

      <a href={user.html_url} target="_blank">View Profile</a>
    </motion.div>
  );
};

export default ProfileCard;
