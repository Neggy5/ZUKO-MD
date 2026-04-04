<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=500&color=00FF00&center=true&vCenter=true&width=600&lines=ZUKO+MD+WhatsApp+Bot;Multi-Command+WhatsApp+Bot;Always+Active+24%2F7" alt="Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/WhatsApp-Multi--Device-25D366?style=for-the-badge&logo=whatsapp" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ES%20Modules-Supported-ffd700?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Deploy-Katabump%20%7C%20Railway-9146ff?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Online-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Version-2.0.0-ff69b4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Commands-50+-orange?style=for-the-badge" />
</p>

---

## ⚡ ZUKO MD – Your Ultimate WhatsApp Assistant

**ZUKO MD** is a powerful, multi-command WhatsApp bot built with **@kelvdra/baileys** (ES Modules). It comes packed with **50+ commands** including group management, anti-spam, media tools, reactions, religious content, and much more.

> 🔥 **Always active 24/7** – ready to help you manage your groups and have fun!

---

## ✨ Key Features

| Category | Features |
|----------|----------|
| **🤖 General** | Ping, Uptime, Menu, Weather, News, Live Scores, Status |
| **🛡️ Anti-Spam** | Anti-Link, Anti-Tag, Anti-Delete, Anti-Group Mention, Anti-Sticker |
| **🔧 Group Management** | Kick, Promote, Demote, Mute/Unmute, TagAll, HideTag, SetName, SetDesc, SetGroupPP, Welcome/Goodbye, Join Requests |
| **📥 Downloader** | Instagram, Facebook, TikTok, YouTube Audio/Video, APK, Website Screenshot |
| **🎬 Reactions** | Slap, Hug, Kiss, Punch, Bonk, Kill, Cuddle, HighFive, Facepalm, Shrug, Clap, Wink, Blush, Love, Cry, Laugh, Dance, Random Reaction (25+ total) |
| **📖 Religious** | Bible (KJV/WEB/Search), Quran |
| **🖼️ Media Tools** | Sticker Creator, ToImage, Take (sticker metadata), EmojiMix, ToURL (CatBox upload), ViewOnce Saver |
| **👑 Owner** | AutoBio, Mode (Public/Private), Update from GitHub, SetBotPP, Broadcast Status |
| **🎮 Fun** | Facts, Jokes, Memes, Quotes, Trivia, Reaction GIFs |
| **📢 Status Tools** | Auto-Save Status, ToStatus (post to personal status), ToGroupStatus (broadcast to all groups) |

---

## 📸 Preview

<p align="center">
  <img src="https://via.placeholder.com/300x600?text=ZUKO+MD+Menu" width="30%" />
  &nbsp;&nbsp;&nbsp;
  <img src="https://via.placeholder.com/300x600?text=Reaction+Commands" width="30%" />
</p>

> *Replace the placeholder images with actual screenshots of your bot in action.*

---

## 🔑 Getting Your Session (Pairing)

ZUKO MD supports easy pairing – no QR code needed!

### Method 1: Using the Pairing Website (Easiest)

1. Visit our **official pairing site**:  
   🔗 **[ZUKO MD Pairing](https://zuko-md-web-pair-production.up.railway.app)**

2. Enter your **WhatsApp number** with country code (e.g., `234XXXXXXXXXX` – no `+` or spaces)

3. Click **"Generate Pair Code"**

4. You will receive an **8-digit pairing code** on your WhatsApp

5. Copy the code and paste it into the website

6. **Download the `creds.json` file** that appears

7. Place this `creds.json` file inside the **`session` folder** of your bot

8. Start the bot – it will connect automatically!

### Method 2: Manual QR Code

If you prefer QR code, simply run the bot and scan the QR code displayed in the terminal.

---

## 🚀 Deployment Options

### Deploy on Railway (Recommended)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/ZUKO-MD)

### Deploy on Katabump

You can easily deploy ZUKO MD on **Katabump** (a popular free panel):

1. Upload the bot files to your Katabump server
2. Make sure you have the `creds.json` file in the `session` folder
3. Install dependencies: `npm install`
4. Start the bot: `npm start`

> **Note for Katabump:** Ensure you have `ffmpeg` installed. If not, run:
> ```bash
> apt-get update && apt-get install ffmpeg -y
