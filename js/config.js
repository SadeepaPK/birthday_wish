/*
  PERSONALIZE YOUR WEBSITE HERE.
  You can change the names, messages, quiz questions, photos and captions.
  Keep the quotation marks and commas in place.
*/
window.BIRTHDAY_CONFIG = {
  girlfriendName: "Kavi",
  senderName: "Sadeepa",

  birthdayMessage:
    "May your days be filled with the kind of happiness you bring into my life. May every dream find its way to you, every smile stay a little longer, and every new year bring you more reasons to shine. You deserve every beautiful thing this world has to offer.",

  letterParagraphs: [
    "My dearest Kavi,",
    "I wanted to make something a little different for you — something you could open and explore, and something that reminds you how special you are to me. I may not always find the perfect words, but I hope you never doubt how much you mean to me.",
    "Thank you for being you. I hope this new chapter brings you peaceful days, big dreams, unexpected happiness and countless reasons to smile. I wish I could wrap all the good things in the world and place them in your hands.",
    "Keep shining in your own beautiful way. Whatever this year brings, I hope you always remember that you are appreciated, celebrated and loved.",
    "Happy Birthday, my love. Here's to more memories, more laughter and more little moments that become our favourite stories."
  ],

  /*
    These are playful questions, not a test with right or wrong answers.
    Edit the question, options and notes to add your own inside jokes or memories.
  */
  quizQuestions: [
    {
      question: "If I could pause one moment forever, which would I choose?",
      options: [
        { label: "A quiet hug", note: "Some hugs say everything without needing a single word. ♥" },
        { label: "A sunset together", note: "A beautiful view is even better when it is shared with you. ♥" },
        { label: "A laugh that won't stop", note: "Your laughter is one of my favourite sounds. ♥" },
        { label: "Any ordinary day with you", note: "Even an ordinary day can feel special when you're in it. ♥" }
      ]
    },
    {
      question: "What would make the sweetest little date?",
      options: [
        { label: "A cosy movie night", note: "Snacks, a movie and your company — a lovely plan. ♥" },
        { label: "A long evening walk", note: "I'd happily take the long way if it meant more time with you. ♥" },
        { label: "A surprise adventure", note: "The best adventures are the ones we get to remember together. ♥" },
        { label: "A quiet dinner for two", note: "Good food, warm smiles and my favourite person. ♥" }
      ]
    },
    {
      question: "Which little thing can make a day brighter?",
      options: [
        { label: "A thoughtful message", note: "A few sincere words can make the whole day glow. ♥" },
        { label: "An unexpected hug", note: "A hug from you could turn any day around. ♥" },
        { label: "A shared joke", note: "Our silly little laughs deserve their own place in history. ♥" },
        { label: "A simple 'I'm here'", note: "Being there for each other is its own kind of magic. ♥" }
      ]
    },
    {
      question: "If our story had a little soundtrack, what would it feel like?",
      options: [
        { label: "Soft and dreamy", note: "A gentle melody for a feeling that means so much. ♥" },
        { label: "Happy and playful", note: "A little chaos, a lot of laughter and a whole lot of love. ♥" },
        { label: "Warm and timeless", note: "The kind of song you never get tired of hearing. ♥" },
        { label: "A song only we understand", note: "Some stories have a rhythm that belongs only to two people. ♥" }
      ]
    },
    {
      question: "What should we collect more of in the years ahead?",
      options: [
        { label: "New places and adventures", note: "Let's leave room for new places and stories. ♥" },
        { label: "Little everyday moments", note: "The smallest moments often become the biggest memories. ♥" },
        { label: "Unforgettable celebrations", note: "More reasons to smile, celebrate and be grateful. ♥" },
        { label: "All of the above", note: "That sounds like a beautiful plan to me. ♥" }
      ]
    }
  ],

  /*
    Replace these sample SVG paths with your own photos.
    Example: image: "assets/kavi-and-me-1.jpg"
    Add your photo files inside the assets folder.
  */
  /*
    Your personal photos are stored in assets/images/.
    The first THREE photos below are also used by the Memory Match game.
    Each photo appears twice in the game, making three matching pairs.
  */
  /*
    MEMORIES GALLERY PHOTOS
    These three photos appear in the "Our Little Memories" gallery only.
    Replace the files inside assets/images/ or update these paths.
  */
  memories: [
    {
      image: "assets/images/gallery-photo-1.jpg",
      caption: "A little moment worth keeping",
      label: "MEMORY NO. 01",
      note: "A little piece of our story that I want to keep close to my heart."
    },
    {
      image: "assets/images/gallery-photo-2.jpg",
      caption: "One for the heart",
      label: "MEMORY NO. 02",
      note: "Some memories deserve to be replayed again and again. This is one of those."
    },
    {
      image: "assets/images/gallery-photo-3.jpg",
      caption: "More memories to come",
      label: "MEMORY NO. 03",
      note: "Here's to all the beautiful little moments still waiting for us."
    }
  ],

  /*
    MEMORY MATCH GAME PHOTOS — A SEPARATE SET
    Add THREE different photos for the game in assets/images/.
    Each photo is duplicated automatically to make six cards (three pairs).
    Replace the three placeholder SVGs with your photos, then update these paths.
    Example: image: "assets/images/game-photo-1.jpg"
  */
  /*
    MEMORY MATCH GAME PHOTOS — A SEPARATE SET
    These three photos are used only for the Memory Match game.
    Each photo is duplicated automatically to make six cards (three pairs).
  */
  memoryGamePhotos: [
    {
      image: "assets/images/game-photo-1.jpg",
      caption: "Game photo 1",
      label: "GAME PHOTO 01"
    },
    {
      image: "assets/images/game-photo-2.jpg",
      caption: "Game photo 2",
      label: "GAME PHOTO 02"
    },
    {
      image: "assets/images/game-photo-3.jpg",
      caption: "Game photo 3",
      label: "GAME PHOTO 03"
    }
  ],

  /*
    Add your own MP3 file as assets/our-song.mp3.
    The player will work after you add the file.
  */
  musicFile: ""
};
