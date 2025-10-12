---
title: "THETA: Triangulated Hand-State Estimation for Teleoperation and Automation in Robotic Hand Control"
date: "May 15, 2025"
excerpt: "Who knows when it'll come in 'handy'?<br/><img src='/images/portfolio/theta/logo.png' width='350px'>"
collection: portfolio
---
__Reading time: 6 min__
<div style="border-left: 6px solid #FFC107; background-color: #FFF8E1; padding: 1em; margin: 1em 0;">
  <strong>Authors:</strong> 
  <a href="https://alexhuang1029.github.io" style="color: #007BFF; text-decoration: underline;">Alex Huang</a>, 
  <a href="https://www.linkedin.com/in/akshay-karthik-a219a7311" style="color: #007BFF; text-decoration: underline;">Akshay Karthik</a>
</div>

<div style="border-left: 6px solid #007BFF; background-color: #EAF3FF; padding: 1em; margin: 1em 0;">
  <strong>TLDR (Too long, didn't/don't wanna read)?:</strong> 
  <a href="#video" style="color: #007BFF; text-decoration: underline;">
    Jump to the video here.
  </a>
</div>


Tony Stark was right - teleoperation (the remote control of robotic devices) is truly the future. 

<div style="display: flex; justify-content: center; width: 100%;">
  <div class="tenor-gif-embed"
       data-postid="22121327"
       data-share-method="host"
       data-aspect-ratio="1.78771"
       data-width="60%">
    <a href="https://tenor.com/view/i-am-iron-man-gif-22121327">I Am Iron Man GIF</a>
    from <a href="https://tenor.com/search/i+am+iron+man-gifs">I Am Iron Man GIFs</a>
  </div>
</div>
<script type="text/javascript" async src="https://tenor.com/embed.js"></script>
<br>
Specifically, the demand for robotic devices that mimic the dexterity and manipulative abilities of our biggest blessing—our human hand and fingers—will appreciate incredibly in the upcoming years. But for now, the effectiveness of robotic teleoperation limited by several factors, including: 
* The high costs and limitations of the current methods for teleoperation, like: 
    * High-end 4D motion-tracking camera systems like the __Vicon Valkyrie VK26 system__, which costs more than $10,000 per setup. 
        * Individual metallic sensors need to be placed on the subject/hand, which increase the invasiveness and complexity involved of such procedures for teleoperation.
    * Finger-tracking sensor gloves, like the __Manus Prime X__ ($5,000+) and __CyberGlove II__ ($10,000+) further increase expenses.
    * __Intel RealSense Depth Cameras__ (and Google MediaPipe landmark tracking) - $600+. 
        * This method is also prone to vision occlusion, where the camera cannot calculate the joint angles of a hand not directly facing the camera.
* As well as the difficult setups of these (and other) methods, highlighting the inconvenience for the average consumer.

<div style="border-left: 6px solid #208c02ff; background-color: #e1eddeff; padding: 1em; margin: 1em 0;">
  <strong>Therefore, we present THETA, a novel, cost effective method for the teleoperation of a dexterous robotic hand.</strong> 
    Through multi-view ("triangulated") camera tracking, image analysis, and reinforcement learning, THETA's 3-camera pipeline estimates the joint angles for the 15 finger joints in a human hand—all for an extremely cost-effective $45 per setup (for three 1080p web cameras.)
</div>

<!-- __Therefore, we present THETA, a novel, cost effective method for the teleoperation of a dexterous robotic hand.__ Through multi-view ("triangulated") camera tracking, image analysis, and reinforcement learning, THETA's 3-camera pipeline estimates the joint angles for the 15 finger joints in a human hand—all for an extremely cost-effective $45 per setup (for three 1080p web cameras.) -->

<h2 id="video">Quick Video Summary</h2>
<p>Video submission for participation in the 2025 International Science and Engineering Fair...</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/m4txAvVQ458?si=Iqf6bxr5arGc5WZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>