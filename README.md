# Kavi Birthday Surprise Website

A mobile-responsive romantic birthday website for Kavi, made by Sadeepa. The project is split into HTML, CSS and JavaScript files and is ready for GitHub Pages.

## Project structure

```text
kavi-birthday-website-project/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── script.js
└── assets/
    ├── images/
    │   ├── gallery-photo-1.jpg
    │   ├── gallery-photo-2.jpg
    │   ├── gallery-photo-3.jpg
    │   ├── game-photo-1.svg
    │   ├── game-photo-2.svg
    │   └── game-photo-3.svg
    └── audio/
        ├── romantic-background.mp3
        └── birthday-music.mp3
```

## Two separate sets of photos

The website now uses TWO independent photo sets:

### A. Our Little Memories gallery

Your three latest uploaded photos are already installed:

- `assets/images/gallery-photo-1.jpg`
- `assets/images/gallery-photo-2.jpg`
- `assets/images/gallery-photo-3.jpg`

They are configured in the `memories` array in `js/config.js`.

### B. Memory Match game

The game has its own three image slots, separate from the gallery. It duplicates each photo to create six cards (three matching pairs).

Currently the game slots contain attractive labelled placeholder illustrations, so the cards will not show blank white spaces. Replace these placeholders when you have three other photos:

1. Add your three game photos to `assets/images/`.
2. Open `js/config.js`.
3. Find `memoryGamePhotos`.
4. Change each `image` path to your new photo filename.

Example:

```js
memoryGamePhotos: [
  {
    image: "assets/images/game-photo-1.jpg",
    caption: "Our first adventure",
    label: "GAME PHOTO 01"
  },
  {
    image: "assets/images/game-photo-2.jpg",
    caption: "A special day",
    label: "GAME PHOTO 02"
  },
  {
    image: "assets/images/game-photo-3.jpg",
    caption: "A favourite moment",
    label: "GAME PHOTO 03"
  }
],
```

You can either overwrite the placeholder files using the same names and extensions (keep SVG if replacing with SVG), or add JPG files and update the three paths as shown above. Use JPG, PNG or WebP for personal photos.

**Important:** Keep exactly three valid entries in `memoryGamePhotos` for the three-pair game. Each photo is automatically added twice to the shuffled deck.

## Personalize names and messages

Open `js/config.js` and edit:

- `girlfriendName`
- `senderName`
- `birthdayMessage`
- `letterParagraphs`
- Gallery captions and notes
- Game photo captions

## Change music

The MP3 files are in `assets/audio/`:

- `romantic-background.mp3` — romantic background music.
- `birthday-music.mp3` — final birthday music.

Replace a file while keeping the same filename, or update the audio `src` in `index.html`. Browsers may require the visitor to tap the page before audio can play; this is normal autoplay protection.

## Customize the design and interactions

- `css/style.css` — colours, typography, layout, animations and mobile responsiveness.
- `js/script.js` — stage navigation, Memory Match game, music, gift and emoji interactions.
- `js/config.js` — names, messages, gallery photos and separate game photos.
- `index.html` — page structure and section content.

## Preview locally

1. Extract the ZIP.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in Chrome, or use the Live Server extension.

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this project folder to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish.

Keep folder names and relative paths unchanged (`css`, `js`, `assets`).

## Privacy reminder

A public GitHub Pages website can be viewed by anyone who has its URL. Only publish photos and personal details that you are both comfortable sharing.


## Memory Match photos are now included

The three Memory Match game photos are already installed:

- `assets/images/game-photo-1.jpg`
- `assets/images/game-photo-2.jpg`
- `assets/images/game-photo-3.jpg`

They are already connected in `js/config.js` under `memoryGamePhotos`.
You do not need to change anything unless you want to replace them later.
