# Tri-Angular

## [Click Here To Visit Site](https://roman-octavian.github.io/Tri-Angular/)

---
## Project Description
This is a (semi) responsive SPA (Single Page Application) that detects whether a user-generated triangle is equilateral, isosceles, scalene and more. The intention behind this simple project is to get familiar with AngularJS through the use of lifecycle hooks, components, directives, etc.

---
## Tech Stack
<div id="stack">
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular Logo"/>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Logo"/>
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Logo"/>
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Logo"/>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJS Logo"/>
</div>

---
## Why "Tri-Angular"?
The are three reasons behind this name (one for each side of a triangle :P):

1. Tri-Angular is read as "triangular", which is rather fitting for a project related to triangles.
2. The hyphen separates "Tri" from "Angular" which is the framework this project relies on.
3. I'm literally "trying" (tri) "angular" (angular) for the first time.

---
## How to Use
The user can drag the vertices of a triangle with their mouse, trackpad, or finger. The triangle will adjust the size
of each side accordingly, and compute aforementioned sizes to determine whether the triangle is equilateral, isosceles or scalene. Two panels will inform the user at all times of the current size of each side, and of the triangle type. 

It is also possible to toggle between three accent colours (RGB) by selecting the logo on the left side of the header. All of this information can be obtained as an alert in the app; additionally, a GitHub icon can be selected to return to my profile. (GitHub READMEs do not support target="_blank")

---
## How it Works
Very briefly:
 - The triangle is actually a Scalable Vector Graphic (SVG) containing three lines (triangle sides) and three circles (vertices)
 - The vertices have an onDrag event associated which transforms their position and forces the two converging lines to follow their movement
 - Every time a vertex moves, the length of each line is obtained using a simple formula and displayed in one pane
 - The type of triangle is determined based on the length of all three lines and displayed in another pane
 - The triangle is positioned initially in accordance to the viewport using a lifecycle hook

 ---
## How to Improve
As this is my first time using Angular, certain issues have arised, mainly:

- Perhaps the biggest problem is that there are no boundaries for the triangle. The user can move its vertices outside of the container where they belong. I tried to implement boundaries, but the library from which the cdkDrag property is imported does not seem to like FlexBox or margins. The boundaries are never accurate, taking into account elements which should, in theory, be completely unrelated to the element which is being selected to designate the bounds. I tried to change the way I style the elements, add extra divs, and nothing seems to work.

- Resizing the window does not mean that the triangle will adjust. All of the containers will, but to get the triangle to fit the new size, a manual refresh is required.

Therefore, to improve this app, one should focus on:

 - Implement boundaries to the triangle container; probably requires creating a custom "onDrag" event handler.
 - Make triangle re-adjust if the window is too small for it
 - Add ways to manipulate the triangle with more control. Getting something other than "Scalene" is rather hard.
 - Improve visual aesthetics and responsivity