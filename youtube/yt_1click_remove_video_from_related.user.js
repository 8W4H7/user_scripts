// ==UserScript==
// @name        YouTube: 1 Click remove video from related
// @namespace   YouTube
// @description Move Remove (video from related) button to more CONVENIENT (for PC USERS WITH MOUSE AND KEYBOARD) location (over video thumb)
// @icon        https://www.youtube.com/yts/img/favicon_96-vflW9Ec0w.png
// @homepageURL https://github.com/8W4H7/user_scripts/
// @downloadURL https://github.com/8W4H7/user_scripts/raw/master/youtube/yt_1click_remove_video_from_related.user.js
// @version     2020-05-02
// @author      8W4H7
// @license     MIT
// @match       http*://*youtube.com/watch?v=*
// ==/UserScript==

"use strict";
(function() {
  const relatedItems = document.querySelectorAll('ul#watch-related a.content-link.spf-link.yt-uix-sessionlink.spf-link');
  const hideButtons = document.querySelectorAll('button.yt-ui-menu-item.yt-uix-menu-close-on-select.dismiss-menu-choice');
  
  for (let btn of hideButtons) {
    // Get ID of feed item...
    let btn_id = btn.getAttribute('data-innertube-clicktracking').substr(0, 21);
    // Create new remove button
    let clone_btn = btn.cloneNode(true);
    clone_btn.id = 'RemoveReleated';
    clone_btn.style.position = 'absolute';
    clone_btn.style.width = '21px';
    clone_btn.style.height = '21px';
    clone_btn.style.top = '2px';
    clone_btn.style.right = '2px';
    clone_btn.style.padding = '0';
    clone_btn.style.textAlign = 'center';
    clone_btn.style.lineHeight = '20px';
    clone_btn.style.color = "#333";
    clone_btn.style.backgroundColor = "#f8f8f8";
    clone_btn.style.borderRadius = '2px';
    clone_btn.innerHTML = 'X';
    clone_btn.style.zIndex = '3';
    clone_btn.style.visibility = "hidden";
    // Now find needed FI...
    for (let itm of relatedItems) {
      let fi_id = itm.getAttribute('data-visibility-tracking').substr(0, 21);
      if (fi_id === btn_id) {
        // ...and when we found it:
        // 1) attach onClick event to new remove button (remove placeholer "Video hidden")
        let main_parent = itm.parentElement.parentElement;
        clone_btn.addEventListener('click', function() {main_parent.parentElement.style.display = 'none';}, false);
        // 2) add new remove button to it`s :secondChild element
        let thumb_area = main_parent.querySelector('div:nth-child(2)');
        thumb_area.prepend(clone_btn);
        // 3) attach onMouse over/leave event to thumb area
        thumb_area.addEventListener('mouseover', function() {clone_btn.style.visibility = 'visible';}, false);
        thumb_area.addEventListener('mouseleave', function() {clone_btn.style.visibility = 'hidden';}, false);
        // 4) Remove old button (and it's access menu)
        main_parent.querySelector('div:last-child').remove();
      }
    }
  }
}) ();
