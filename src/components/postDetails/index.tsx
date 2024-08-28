interface PostDetailsProps {
  post: Record<string, unknown>;
}

const PostDetails = () => {
  return (
    <div data-testid="PostDetails">
      <h1>PostDetails Component</h1>
    </div>
  );
};

export default PostDetails;
