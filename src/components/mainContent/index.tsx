import { useState, useEffect, lazy, Suspense } from 'react';
import { eventBus } from 'yaml-react-component';
const PostList = lazy(() => import('../postList'));
const PostDetails = lazy(() => import('../postDetails'));

interface MainContentProps { user: Record<string, unknown> }

const MainContent = ( ) => {
  const [posts, setPosts] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    const loadPosts = () => {
      console.log('loadPosts');
    };

    eventBus.subscribe('LOAD_POSTS', loadPosts);

    return () => {
      eventBus.unsubscribe('LOAD_POSTS', loadPosts);
    };
  }, []);

  return (
    <div data-testid="MainContent">
      <h1>MainContent Component</h1>
      <Suspense fallback={<div>Loading PostList...</div>}>
         <PostList />
      </Suspense>
      <Suspense fallback={<div>Loading PostDetails...</div>}>
         <PostDetails />
      </Suspense>
    </div>
  )
};

export default MainContent;
