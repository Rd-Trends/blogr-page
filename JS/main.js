"use strict";

// elements
import { navLinks } from "./data.js";
const navLinksBtn = document.getElementsByClassName("nav-links-btn");
const toggleNavbarBtn = document.querySelector(".toggle-navbar-btn");
const navBtnIcon = document.querySelector(".nav-btn-icon");
const sideBar = document.querySelector("#sidebar");
const mobileSubLinkBtns = document.querySelectorAll("#sidebar .nav-links-btn");
const subLinksmenu = document.querySelector(".sublinks");
const nav = document.querySelector(".hero-section-texts");
const main = document.querySelector("main");

//convert links data in array to anchor tags and then append it (for desktop, ipad view)
const subLinksToHtml = (subLinks, center, bottom) => {
  subLinks.map((linkObj) => {
    const { label, url } = linkObj;
    subLinksmenu.innerHTML += `<a href="${url}">${label}</a>`;
    subLinksmenu.style.left = `${center}px`;
    subLinksmenu.style.top = `${bottom}px`;
    subLinksmenu.style.display = "flex";
  });
};

//show sublinks when the nav links buttons are clicked/hovered
const showSubLinks = (e) => {
  subLinksmenu.innerHTML = "";
  let navLinkBtn = e.target;
  const navLinkBtnIcon = navLinkBtn.childNodes[1].childNodes[0];
  navLinkBtnIcon.classList.toggle("rotate-icon");
  const navLinkBtnPosition = navLinkBtn.getBoundingClientRect();
  const center = (navLinkBtnPosition.left + navLinkBtnPosition.right) / 2;
  const bottom = navLinkBtnPosition.bottom + 9;
  const link = navLinks.find((navItem) => navItem.link === e.target.id);
  const { subLinks } = link;
  subLinksToHtml(subLinks, center, bottom);
};

const hideSubLinks = () => {
  subLinksmenu.style.display = "none";
};

const toggleNavBar = () => {
  sideBar.classList.toggle("showsidebar");
  navBtnIcon.src = navBtnIcon.src.includes("/images/icon-hamburger.svg")
    ? "./images/icon-close.svg"
    : "./images/icon-hamburger.svg";
};

const closeSideBar = () => {
  if (sideBar.className.includes("showsidebar")) {
    toggleNavBar();
  }
};

const showMobileSubLinks = (e) => {
  let parentElement = e.target.parentElement;
  let sublink = parentElement.childNodes[2].nextElementSibling;
  sublink.classList.toggle("show-mobile-sublinks");
};

//eventlisteners
for (let i = 0; i < navLinksBtn.length; i++) {
  navLinksBtn[i].addEventListener("mouseenter", (e) => showSubLinks(e));
}

nav.addEventListener("mouseenter", hideSubLinks);

toggleNavbarBtn.addEventListener("click", toggleNavBar);

for (let i = 0; i < mobileSubLinkBtns.length; i++) {
  mobileSubLinkBtns[i].addEventListener("click", (e) => showMobileSubLinks(e));
}

main.addEventListener("click", closeSideBar);