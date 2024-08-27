import { useEffect } from 'react';
import { eventBus } from 'yaml-react-component';

interface PostListProps { posts: unknown[] }

const PostList = ( ) => {
  useEffect(() => {
    eventBus.publish('POST_SELECTED', {});
  }, []);

  return (
    <div data-testid="PostList">
      <h1>PostList Component</h1>
    </div>
  )
};

export default PostList;
