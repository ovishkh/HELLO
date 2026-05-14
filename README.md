# Ovi Shekh Wiki Clone 🌐

[![Update Wiki Content](https://github.com/ovishkh/HELLO/actions/workflows/update_wiki.yml/badge.svg)](https://github.com/ovishkh/HELLO/actions/workflows/update_wiki.yml)

A high-end, Wikipedia-style replication of [ovishekh.com/wiki](https://ovishekh.com/wiki). This project features a premium design with modern typography, dark mode support, and an automated synchronization system that keeps the content in sync with the source.

## ✨ Features

- **Premium Design**: A modern take on the classic Wikipedia aesthetic using **Inter** and **Playfair Display** typography.
- **Automated Scraping**: Built-in Node.js scraper that pulls the latest content, sections, and references from the live site.
- **Continuous Sync**: GitHub Actions workflow that runs daily to ensure your copy is always up to date.
- **Dark Mode**: Sleek, high-contrast dark theme for better readability.
- **Dynamic TOC**: Automatically generated Table of Contents based on live content.
- **Issue Templates**: Structured templates for bug reports and feature requests.

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Backend/Scraper**: Node.js, Axios, Cheerio
- **Automation**: GitHub Actions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:ovishkh/HELLO.git
   cd HELLO
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Usage
- **Preview locally**:
  ```bash
  npm start
  ```
- **Manual content sync**:
  ```bash
  npm run update
  ```

## 🤖 How it Works

1. **Scrape**: The `update_wiki.js` script fetches the HTML from `ovishekh.com/wiki`.
2. **Parse**: Using `cheerio`, it extracts section titles, body content, and references.
3. **Store**: The structured data is saved into `data.json`.
4. **Render**: The `script.js` in the frontend fetches `data.json` and dynamically builds the page, including the Table of Contents.
5. **Automate**: A GitHub Action (`update_wiki.yml`) triggers this process every midnight and commits any changes back to the repository.

## 📝 License

This project is open-source and available under the MIT License. Text content follows the Creative Commons Attribution-ShareAlike License as per Wikipedia standards.

---
Created with ❤️ by Antigravity AI for Ovi Shekh.
