import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.less']
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    consoleText(['Dream it.', 'Build it.'], 'text', ['#1470b9', '#00bcd4', 'white']);

    function consoleText(words, id, colors) {
      if (colors === undefined) {colors = ['#fff']; }
      let visible = true;
      const con = document.getElementById('console');
      let letterCount = 1;
      let x = 1;
      let waiting = false;
      const target = document.getElementById(id);
      target.setAttribute('style', 'color:' + colors[0]);
      window.setInterval(function() {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function() {
            const usedColor = colors.shift();
            colors.push(usedColor);
            const usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function() {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);
      window.setInterval(function() {
        if (visible === true) {
          con.className = 'console-underscore hidden';
          visible = false;
        } else {
          con.className = 'console-underscore';
          visible = true;
        }
      }, 400);
    }
    (function() {
      'use strict';
      // define variables
      const items = document.querySelectorAll('.timeline li');
      // check if an element is in viewport
      // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
      function callbackFunc() {
        for (let i = 0; i < items.length; i++) {
          if (isElementInViewport(items[i])) {
            items[i].classList.add('in-view');
          }
        }
      }
      // listen for events
      window.addEventListener('loadload', callbackFunc);
      window.addEventListener('resize', callbackFunc);
      window.addEventListener('scroll', callbackFunc);
    })();
  }
}
