document.addEventListener('DOMContentLoaded', () => {
    const editAccountModal = document.getElementById('editAccountModal');
    const deleteAccountModal = document.getElementById('deleteAccountModal');
    const closeButtons = document.querySelectorAll('.modal .close-button');
    const cancelDeleteBtn = document.querySelector('#deleteAccountModal .cancel-delete-btn');
    const editAccountForm = document.getElementById('editAccountForm');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

    console.log('modalHandler.js loaded and DOMContentLoaded fired.');
    console.log('Edit Account Modal Element:', editAccountModal);
    console.log('Delete Account Modal Element:', deleteAccountModal);

    // Event delegation for edit and delete account buttons
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-account-btn')) {
            console.log('Edit Account button clicked.');
            editAccountModal.style.display = 'flex';
            // Fetch current username to pre-fill the form
            fetch('../../2be/get_current_username.php') 
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('editUsername').value = data.username;
                    } else {
                        console.error('Failed to fetch username:', data.message);
                    }
                })
                .catch(error => console.error('Error fetching username:', error));
        } else if (event.target.classList.contains('delete-account-btn')) {
            console.log('Delete Account button clicked.');
            deleteAccountModal.style.display = 'flex';
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Close button clicked.');
            button.closest('.modal').style.display = 'none';
        });
    });

    cancelDeleteBtn.addEventListener('click', () => {
        console.log('Cancel Delete button clicked.');
        deleteAccountModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editAccountModal) {
            console.log('Clicked outside Edit Account modal.');
            editAccountModal.style.display = 'none';
        } else if (event.target === deleteAccountModal) {
            console.log('Clicked outside Delete Account modal.');
            deleteAccountModal.style.display = 'none';
        }
    });

    // Handle Edit Account Form Submission
    editAccountForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Edit Account form submitted.');

        const formData = new FormData(editAccountForm);
        const response = await fetch('../../2be/update_account.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            editAccountModal.style.display = 'none';
            location.reload(); // Reload to reflect changes
        } else {
            alert(result.message);
        }
    });

    // Handle Delete Account Confirmation
    confirmDeleteBtn.addEventListener('click', async () => {
        console.log('Confirm Delete button clicked.');
        const response = await fetch('../../2be/delete_account.php', {
            method: 'POST',
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.href = '../login/index.html'; // Redirect to login or homepage
        } else {
            alert(result.message);
        }
    });
});
