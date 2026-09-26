In react-router-dom, useParams is a built-in React hook used to read the dynamic parameters (variables) from the current URL path. It returns an object of key/value pairs where the keys are the placeholders you defined in your route definitions, and the values are the actual data passed in the URL segment. [1, 2, 3, 4] 
## How It Works## 1. Define a Route with Parameters
When you configure your routes, you mark a segment of the path as dynamic by prefixing it with a colon (:). This colon tells React Router that this section of the URL is a variable. [5, 6] 

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ":userId" is a placeholder for a dynamic parameter */}
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

## 2. Extract the Parameter with useParams
Inside the component rendered by that route, you call useParams() to extract the actual value from the URL. You will usually use object destructuring to unpack the specific parameter directly. [1, 5, 7] 

import { useParams } from 'react-router-dom'; // 1. Import the hook

function UserProfile() {
  // 2. Call the hook and destructure the variable matching your route path
  const { userId } = useParams(); 

  return (
    <div>
      <h1>User Profile Page</h1>
      {/* 3. Use the dynamic data (e.g., to fetch data from an API) */}
      <p>Now viewing user with ID: <strong>{userId}</strong></p>
    </div>
  );
}

export default UserProfile;

## Key Behaviors to Keep in Mind

* Exact Matching: The key name inside your destructured object must exactly match the variable identifier you named in your <Route> definition (e.g., path /:userId requires { userId } = useParams()). [4, 5] 
* Multiple Parameters: You can extract multiple parameters from a single URL if the route is deeply nested (e.g., route path /blog/:postId/comments/:commentId returns { postId, commentId }). [5, 8] 
* Component Constraints: useParams can only be used inside functional components that are rendered within the context of a <Routes> block. If called outside of a matching route tree, it returns an empty object {}. [2, 9] 


[1] [https://www.geeksforgeeks.org](https://www.geeksforgeeks.org/reactjs/reactjs-useparams-hook/)
[2] [https://medium.com](https://medium.com/@sanae.s.soma/useparams-hook-react-router-7fab77d8bbd2)
[3] [https://refine.dev](https://refine.dev/blog/react-router-useparams/)
[4] [https://medium.com](https://medium.com/geekculture/how-to-use-react-router-useparams-436851fd5ef6)
[5] [https://jessica-delgrande.medium.com](https://jessica-delgrande.medium.com/react-router-an-introduction-to-useparams-5fb3c7903c04)
[6] [https://dev.to](https://dev.to/priya_k_9427a2e692abd3ddb/useparams-in-react-3bbb)
[7] [https://www.youtube.com](https://www.youtube.com/watch?v=UJbtnNsILjI)
[8] [https://reactrouter.com](https://reactrouter.com/api/hooks/useParams)
[9] [https://stackoverflow.com](https://stackoverflow.com/questions/58548767/react-router-dom-useparams-inside-class-component)
