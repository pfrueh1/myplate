

async function newFormHandler(event) {
    event.preventDefault();
  
    const post_title = document.querySelector('input[name="file-path"]').value;
    const uploaded_file = document.querySelector('input[name="myImage"]');
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
         post_title,
        uploaded_file
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