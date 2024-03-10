import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

// client.interceptors.request.use(function (config) {
//     // Retrieve and set the CSRF token here
//     config.headers['X-CSRFToken'] = Cookies.get('csrftoken');
// 
//     const csrfToken = Cookies.get('csrftoken');
// 
//     console.log("XXX axios interceptors:" + csrfToken);    
//     return config;
// });


function App() {



  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

/*
    // Retrieve the CSRF token from the cookie
    const csrfToken = Cookies.get('csrftoken');
    console.log("XXX /api/user csrfToken:" + csrfToken);    
    // Set the CSRF token in the Axios default headers
    axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
*/
    // client.get("/api/user")
    // .then(function(res) {
    //   setCurrentUser(true);
    // })
    // .catch(function(error) {
    //   setCurrentUser(false);
    // });
    // 


    const axiosInstance = axios.create({
       baseURL: "http://127.0.0.1:8000",
       withCredentials: true
    })

    const csrfToken = Cookies.get('csrftoken');
    console.log("XXX /api/user csrfToken:" + csrfToken);    
    // Set the CSRF token in the Axios default headers
    axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfToken;
    axiosInstance.defaults.xsrfCookieName = 'csrftoken';
    axiosInstance.defaults.xsrfHeaderName = 'X-CSRFToken';
    axiosInstance.defaults.withCredentials = true;    

    axiosInstance.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });


  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {

      // Retrieve the CSRF token from the cookie
      const csrfToken = Cookies.get('csrftoken');
      console.log("XXX /api/register csrfToken:" + csrfToken);    
      // Set the CSRF token in the Axios default headers
      axios.defaults.headers.common['X-CSRFToken'] = csrfToken;      

      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {

        // Retrieve the CSRF token from the cookie
        const csrfToken = Cookies.get('csrftoken');
        console.log("XXX /api/login after register csrfToken:" + csrfToken);    
        // Set the CSRF token in the Axios default headers
        axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();

    const axiosInstance = axios.create({
       baseURL: "http://127.0.0.1:8000",      
       withCredentials: true
    })
    axiosInstance.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {

      // Retrieve the CSRF token from the cookie
      const csrfToken = Cookies.get('csrftoken');
      console.log("XXX /api/login csrfToken:" + csrfToken);    
      // Set the CSRF token in the Axios default headers
      axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

      setCurrentUser(true);
    });    


// Example: Updating CSRF token explicitly after login
// client.post("/api/login", { email, password }).then((response) => {
//   That ensures we read the CSRF token after the response is processed
//   const csrfToken = Cookies.get('csrftoken');
//   axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
//   console.log("Updated CSRF Token after login:", csrfToken);
//   setCurrentUser(true);
//   Additional logic here if needed
// });

//     client.post(
//       "/api/login",
//       {
//         email: email,
//         password: password
//       }
//     ).then(function(res) {
// 
//       // Retrieve the CSRF token from the cookie
//       const csrfToken = Cookies.get('csrftoken');
//       console.log("XXX /api/login csrfToken:" + csrfToken);    
//       // Set the CSRF token in the Axios default headers
//       axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
// 
//       setCurrentUser(true);
//     });

//     client.post(
//       "/api/login",
//       {
//         email: email,
//         password: password
//       }
//     ).then(function(res) {
// 
//       // Retrieve the CSRF token from the cookie
//       const csrfToken = Cookies.get('csrftoken');
//       console.log("XXX /api/login csrfToken:" + csrfToken);    
//       // Set the CSRF token in the Axios default headers
//       axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
// 
//       setCurrentUser(true);
//     });    
  }

  function submitLogout(e) {
    e.preventDefault();


    const axiosInstance = axios.create({
       baseURL: "http://127.0.0.1:8000",      
       withCredentials: true
    })
    axiosInstance.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });    


    // client.post(
    //   "/api/logout",
    //   {withCredentials: true}
    // ).then(function(res) {
    //   setCurrentUser(false);
    // });
  }

  if (currentUser) {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>HS WIM</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
        </div>
    );
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>HS WIM</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <Form onSubmit={e => submitRegistration(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>        
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );
}

export default App;
