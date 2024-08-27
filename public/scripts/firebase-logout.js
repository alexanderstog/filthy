document.getElementById('logout-button').addEventListener('click', () => {
    signOut(auth).then(() => {
        // Delete the __session cookie by setting its expiration date to a past date
        document.cookie = '__session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        // Redirect to the login page
        window.location.href = '/login';
    }).catch((error) => {
        console.error('Error during sign-out:', error);
    });
});
