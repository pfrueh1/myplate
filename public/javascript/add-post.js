

async function newFormHandler(event) {
    event.preventDefault();
<<<<<<< HEAD
  
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
=======
    
    const post_title = document.querySelector('input[name="file-path"]').value;
    const uploaded_file = document.querySelector('input[name="myImage"]').value;
    console.log("uploaded file", uploaded_file)
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        body: post_title,
>>>>>>> 1c2e2644c4c027da145533286e08bb415489dd65
      }),
      file: JSON.stringify({uploaded_file}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      // console.log("uploaded file begin",uploaded_file, "uploaded file end")
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
}
  
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);