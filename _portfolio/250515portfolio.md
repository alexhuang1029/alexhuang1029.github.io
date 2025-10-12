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
    * Finger-tracking sensor gloves, like the __Manus Prime X__ ($5,000+) and __CyberGlove II__ ($10,000+) further increase expenses.
    * __Intel RealSense Depth Cameras__ (and Google MediaPipe landmark tracking) - $600+. 
        * This method is also prone to vision occlusion, where the camera cannot calculate the joint angles of a hand not directly facing the camera.
* As well as the difficult setups of these (and other) methods, highlighting the inconvenience for the average consumer.

<div style="border-left: 6px solid #208c02ff; background-color: #e1eddeff; padding: 1em; margin: 1em 0;">
  <strong>Therefore, we present THETA, a novel, cost effective method for the teleoperation of a dexterous robotic hand.</strong> 
    Through multi-view ("triangulated") camera tracking, image analysis, and reinforcement learning, THETA's 3-camera pipeline estimates the joint angles for the 15 finger joints in a human hand—all for an extremely cost-effective $45 per setup (for three $15 1080p web cameras.)
</div>

<!-- __Therefore, we present THETA, a novel, cost effective method for the teleoperation of a dexterous robotic hand.__ Through multi-view ("triangulated") camera tracking, image analysis, and reinforcement learning, THETA's 3-camera pipeline estimates the joint angles for the 15 finger joints in a human hand—all for an extremely cost-effective $45 per setup (for three 1080p web cameras.) -->

<div style="text-align: center; margin: 1.5em 0;">
  <img src="/images/portfolio/theta/demo.gif" 
       alt="THETA pipeline demo" 
       style="width: 60%; max-width: 600px; border-radius: 10px;">
  <p style="font-size: 0.9em; color: #555;">THETA pipeline demo
  <a href="https://imgflip.com/gif/a8uivn">(GIF not playing?)</a>
  </p>
</div>

Experimental Design & Methodology
---
__1. Robotic Hand Development & ROS2 Control__
* The constructed hand and wrist mechanism was mostly taken from the [DexHand CAD model](https://github.com/TheRobotStudio/V1.0-Dexhand) by [TheRobotStudio](https://www.youtube.com/@therobotstudio). 
    * The hand was comprised entirely of 3D-prints, fishing line, bearings, springs, mini servos, and screws.
    * The phalanges, knuckle joints, and metacarpal bones fastened w/ 80-lb fishing line and 2mm springs.
    * 3x Emax ES3352 12.4g mini servos and spring actuates each finger.
        * 2x servos for abduction/adduction and finger base flexion.
        * 1x servo for fingertip flexion.
    * 1 spring for fingertip (distal) and base (proximal) extension.
<div style="display: flex; justify-content: center; gap: 2em; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="/images/portfolio/theta/fig2.png" 
         alt="Constructed & modified" 
         style="max-height: 400px; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">Constructed & modified DexHand.</p>
  </div>
  <div style="text-align: center; max-width: 300px;">
    <img src="/images/portfolio/theta/fig3.png" 
         alt="Fingertip flexion" 
         style="max-height: 400px; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">Fingertip flexion by pulling on ligament. Sprint (tip extension) circled.</p>
  </div>
</div>
* To control the DexHand: 
    * Ubuntu VM w/ USB passthrough used as ROS2 environment.
    * The Arduino pipeline relied on two main ROS2 nodes to faciliate robotic hand movement. 
        * High-level commands converted into serial messages which Arduino interprets to control robotic hand servos.
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig4.png" 
         alt="Caption for Fig 4" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      ROS 2-Arduino Joint Angle Transmission pipeline for robotic hand servos actuation.
    </p>
  </div>
</div>
        

__2. Multi-View Data Collection & Annotation__

__3. Segmentation Preprocessing & THETA Joint Angle Classification__

__4. THETA Joint Angle Prediction & Real-Time Inference__


<h2 id="video">Quick Video Summary</h2>
<p>Video submission for participation in the 2025 International Science and Engineering Fair...</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/m4txAvVQ458?si=Iqf6bxr5arGc5WZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>