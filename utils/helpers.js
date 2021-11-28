// const upload = () => {
//     if(err) {
//         res.render('./layouts/main.handlebars', {
//             msg: err
//         });
//     } else {
//         if(req.file === undefined){
//             res.render('./layouts/main.handlebars', {
//                 msg: 'Error: No File Selected!'
//             });
//         } else {
//             console.log(req.file);
//             res.render('./layouts/main.handlebars', {
//                 msg: 'File Uploaded!',
//                 file: `uploads/${req.file.filename}`
//             });
//             const image = `uploads/${req.file.filename}`
//                 return image;
//         }
        
//     }
// };

module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date
      ).getFullYear()}`;
    },
    format_url: url => {
      return url
        .replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .split('/')[0]
        .split('?')[0];
    },
    format_plural: (word, amount) => {
      if (amount !== 1) {
        return `${word}s`;
      }
  
      return word;
    }
};

// module.exports = upload;