//this function collects values from the form in login template and sends them to /api/users/login template
const signInForm = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (name && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    }
  };

  const signUpForm = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#newuser').value.trim();
    const password = document.querySelector('#newpass').value.trim();

    if (name && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ "name": name, "password": password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector('#signIn-form').addEventListener('submit', signInForm);
  document.querySelector('#signup-form').addEventListener('submit', signUpForm);

