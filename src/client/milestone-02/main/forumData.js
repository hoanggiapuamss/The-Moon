export var threads = [
    {
      id: 1,
      title: "NVIDIA IS GOING UP",
      author: "MESSI",
      date: Date.now(),
      content: "Thread content",
      comments: [
        {
          author: "Jack",
          date: Date.now(),
          content: "Hey there"
        },
        {
          author: "Arthur",
          date: Date.now(),
          content: "Hey to you too"
        }
      ]
    },
    {   
        id: 2,
        title: "JP MORGAIN HAS BANKRUPT",
        author: "ZAP",
        date: Date.now(),
        content: "Thread content",
        comments: [
          {
            author: "BTC",
            date: Date.now(),
            content: "Hey there"
          },
          {
            author: "DODGE",
            date: Date.now(),
            content: "Hey to you too"
          }
        ]
      }
  ];
  //   ///Local storage part to store user states
//  var defaultThreads = threads;
//   if (localStorage && localStorage.getItem('threads')) {
//     threads = JSON.parse(localStorage.getItem('threads'));
//   } else {
//     threads = defaultThreads; // Ensure defaultThreads is defined elsewhere in your code
//     localStorage.setItem('threads', JSON.stringify(defaultThreads));
//   }
  