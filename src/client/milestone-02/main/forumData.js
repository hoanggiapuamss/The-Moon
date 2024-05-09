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
      },
      {
        id: 3,
        title: "Tech Stocks Rally Today",
        author: "TechInvestor",
        date: Date.now(),
        content: "Major gains in tech sector today.",
        comments: [
            {
                author: "SiliconFan",
                date: Date.now(),
                content: "Great news for our portfolio!"
            },
            {
                author: "GrowthHawk",
                date: Date.now(),
                content: "Riding the wave!"
            }
        ]
    },
    {
        id: 4,
        title: "International Markets React to Trade Talks",
        author: "GlobalTrader",
        date: Date.now(),
        content: "Trade negotiations impact global markets.",
        comments: [
            {
                author: "WorldWatcher",
                date: Date.now(),
                content: "Always keeping an eye on these developments."
            },
            {
                author: "EconBuff",
                date: Date.now(),
                content: "Economics at play!"
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
  