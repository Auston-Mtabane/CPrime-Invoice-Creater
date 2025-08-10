# Custom Themed Invoice Generator

This project creates invoices as HTML emails, applying a customized touch of colors and themes.

---

## Tech-Stack

- React  
- Node.js + Vite  
- CSS  
- Flask (future iterations)

---

## Problem & Solution

### Problem

As a graphic designer, when sending invoices or quotes to my clients, I often had to use well-designed PDFs from a template I created. Editing PDFs every time was exhausting because I had to start a heavy graphics app like Adobe Illustrator. The design was fragile, the PDF export took time, and the file sizes were large (2MB–20MB). After all this, I still had to compose an email to deliver the invoice.

### Solution

Have everything in HTML. This makes rendering much faster and easier, and decreases file sizes to kilobytes since HTML files are lightweight. It also enables easy theme changes by pushing buttons. The dashboard will not only create but also send invoice emails to clients with improved load times.

---

## Features

- Client details input fields (Full Name, Email, Mobile/Tel)  
- Single invoice item with fields for Item name, Quantity, Amount  
- Live subtotal calculation for the invoice item  
- Basic styling structure ready for customization  

---

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)  
- npm or yarn  

### Installation

1. Clone this repository:

```bash
git clone git@github.com:Auston-Mtabane/CPrime-Invoice-Creater.git
cd CPrime-Invoice-Creater
```

2. Install dependencies:

```bash
npm install
# or
yarn install

```
3. Start the development server: (Front End)

```bash
npm run dev
# or
yarn dev
```
