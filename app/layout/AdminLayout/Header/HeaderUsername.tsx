import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../../Layout';
import { getSession } from 'next-auth/react';
import { useStore } from 'zustand';
import axios from 'axios';

// type Props = {
//   params: {
//     id: string;
//   };
// };

const HeaderUsername = () => {
  // const { user, isAuthenticated, isLoading } = useAuth0();
  const [ authUser, setAuthUser ] = useState({});
  const [refetch, setRefetch] = useState(false);
// console.log('user >>>', user);
  const [message, setMessage] = useState('');
  const [auth, setAuth] = useState(false);

  const username = () => {
    (async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user', {
          credentials: 'include',
        });
        console.log('response++', response);

        const content = await response.json();

        setMessage(`Hi ${content.name}`);
        setAuth(true);
      } catch (e) {
        setMessage('You are not logged in');
        setAuth(false);
      }
    })();
  };

  // console.log('auth++++++', auth);
  // console.log('message++++++', message);

  // const username = 'hello';

  // const [username, setUsername] = useState('');
  // console.log('username++++++', username);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       try {
  //         const response = await fetch('http://localhost:4000/api/user', {
  //           credentials: 'include',
  //         });
  //         console.log('response++++++', response);

  //         const content = await response.json();
  //         console.log('content++++++', content);

  //         setMessage(`Hi ${content.name}`);
  //         setAuth(true);

  //         // const response = await fetch('http://localhost:4000/api/user', {
  //         //   headers: {
  //         //     Authorization: `Bearer ${token}`,
  //         //   },
  //         // });
  //         // const { username } = response.result;
  //         // setUsername(username);
  //       } catch (error) {
  //         setMessage('You are not loggin yet!');
  //         setAuth(false);
  //         console.error(error);
  //       }
  //     }
  //   };
  // });

  //   fetchUserData();
  // }, []);

  // const MyComponent = () => {
  //   const store = useStore();
  //   const user = store.getState().user;

  //   // Dynamically display username based on user data
  //   const username = user ? user.name : 'Guest';

  //   // Conditional rendering based on username
  //   if (username === 'Guest') {
  //     return <div>Please log in to display your username.</div>;
  //   }

  //   return <div>Welcome, {username}!</div>;
  // };

  // const session = getSession();
  // const user = session?.user;

  // console.log('isAuthenticated++++++++++++', isAuthenticated);
  // console.log('user++++++++++++', user);
  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  // async function username() {
  //   const response = await fetch('http://localhost:4000/api/user', {
  //     credentials: 'include',
  //   });
  //   console.log('response++++++', response);

  //   const content = await response.json();
  //   console.log('content++++++', content);

  //   if (response.ok) {
  //     setMessage(`Hi ${content.name}`);
  //     setAuth(true);
  //   } else {
  //     setMessage('You are not loggin yet!');
  //     setAuth(false);
  //   }
  // }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000/api/user'), {
  //         credentials: 'include',
  //       });
  //       const content = await response.json();

  //       setMessage(`Hi ${content.name}`);
  //       setAuth(true);
  //     } catch (e) {
  //       setMessage('You are not loggin yet!');
  //       setAuth(false);
  //     }
  //   })();
  // });
  // [refetch]);

  // useEffect(() => {
  //   fetch('http://localhost:4000/all')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setTodos(data);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setRefetch(false));
  // }, [refetch]);

  useEffect(() => {
    const getUser = async () => {
      // const response = await fetch('http://localhost:4000/api/user', {
      //   credentials: 'include',
      // });
      // console.log('response >>', response);
      setAuthUser({ id: 1, name: 'abssssc' });
    };

    getUser();
  }, [authUser]);

  return (
    // isAuthenticated && (
    //   <div>
    //     <h2>{user.name}</h2>
    //   </div>
    // )
    // <Layout auth={auth}>{message}</Layout>
    // <div>
    //   props: {user},
    //   <div>
    //     {session ? (
    //       <p>Welcome, {session.user.name}!</p>
    //     ) : (
    //       <p>Please sign in to see your username.</p>
    //     )}
    //   </div>
    //   <Layout auth={auth}>{message}</Layout>
    //   <h6 style={{ marginTop: 10 }}>Username</h6>
    <p>Welcome, {authUser?.name}!</p>
    //    {username && <p>Welcome, {username}!</p>}
    // </div>
  );
};

export default HeaderUsername;
