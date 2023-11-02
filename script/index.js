document.getElementById('signUp').addEventListener('click', function() {
    var email = document.getElementById('exampleFormControlInput1').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Password Validation
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and be at least 8 characters long.');
      return;
    }

    // Confirm Password
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    // Store User Data in Local Storage
    var user = {
      email: email,
      password: password
    };
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to Home Page
    window.location.href = '/pages/home.html';
  });