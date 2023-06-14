# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)


## Overview

### The challenge

Users should be able to:

- [x] View the optimal layout for the app depending on their device's screen size
- [x] See hover states for all interactive elements on the page
- [x] Create, Read, Update, and Delete comments and replies
- [x] Upvote and downvote comments
- [x] **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- [x] **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.


### Links

- Solution URL: [My Solution]()
- Live Site URL: [My Live Site](https://rodrfct.github.io/interactive-comments-section/)

## My process

### Built with

- [Vue](https://vuejs.org/) - JS library
- [Nuxt](https.//nuxt.com) - Vue SRR/SSG framework
- [Pinia](https://pinia.vuejs.org/) - Vue store



### What I learned

I started this challenge to learn Nuxt, in the process I learned the basics of the configuration file, and server APIs, though I 
used Pinia and `localStorage` after all because I couldn't work properly with Nitro storage (in the future I might rework this to use a database)

I discovered that you can call a component in itself just fine. I also learned to `JSON.parse()` dates.

I also learned to use the native `<dialog>` element.

```html
<dialog id="delete-modal" ref="deleteModal">
  <p>Delete comment</p>

  <form @submit="deleteCommentConfirmed" method="dialog">
    <p>
      Are you sure you want to delete this comment?
      This will remove the comment and can't be undone.
    </p>

    <fieldset>
      <button value="cancel">NO, CANCEL</button>
      <button id="confirm-btn" value="confirm">YES, DELETE</button>
    </fieldset>
  </form>
</dialog>
```

### Useful resources

- [MDN](https://developer.mozilla.org/en-US/)
- [This article](https://oliverjumpertz.com/dealing-with-date-serialization-and-deserialization-in-javascript/) on how to deserialize dates.

