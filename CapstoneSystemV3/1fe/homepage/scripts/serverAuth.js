fetch('../../2be/auth.php')
.then(res => res.json())
.then(data => {
console.log('Status:', data.status);
console.log('Message:', data.message);
if (data.status === 'error' && data.message === 'Unauthorized') {
window.location.href = './entry.html'; // Redirect to entry.html
}
})
.catch(err => {
console.error('Fetch error:', err);
});