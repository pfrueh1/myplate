

async function newFormHandler(event) {
    event.preventDefault();
  
<<<<<<< HEAD
    const title = document.querySelector('input[name="post-title"]').value;
=======
    const post_title = document.querySelector('input[name="file-path"]').value;
    const uploaded_file = document.querySelector('input[name="myImage"]');
>>>>>>> d152a12f60d9ae24605213cc3f25eba8110cc4be
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
<<<<<<< HEAD
        title,
=======
         post_title,
        uploaded_file
>>>>>>> d152a12f60d9ae24605213cc3f25eba8110cc4be
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      console.log("uploaded file begin",uploaded_file, "uploaded file end")
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);