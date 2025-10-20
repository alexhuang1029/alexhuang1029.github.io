---
title: "THETA: Triangulated Hand-State Estimation for Teleoperation and Automation in Robotic Hand Control"
date: "May 15, 2025"
excerpt: "Who knows when it'll come in 'handy'?<br/><img src='/images/portfolio/theta/logo.png' width='350px' style='border-radius: 14px;'>"
collection: portfolio
read_time: 10
---

<div style="border-left: 6px solid #7e7e7eff; background-color: #f1f1f1ff; padding: 1em; margin: 1em 0;">
  <strong>Read my publication</strong> 
  <a href="/publication/theta" style="color: #007BFF; text-decoration: underline;">here.</a>
</div>
<div style="border-left: 6px solid #FFC107; background-color: #FFF8E1; padding: 1em; margin: 1em 0;">
  <strong>Authors:</strong> 
  <a href="https://alexhuang1029.github.io" style="color: #007BFF; text-decoration: underline;">Alex Huang</a>, 
  <a href="https://www.linkedin.com/in/akshay-karthik-a219a7311" style="color: #007BFF; text-decoration: underline;">Akshay Karthik</a>, in collaboration with 
  <a href="https://www.sunrobotics.lab.asu.edu" style="color: #007BFF; text-decoration: underline;">Sun Robotics Lab</a> at ASU.
</div>

<div style="border-left: 6px solid #007BFF; background-color: #EAF3FF; padding: 1em; margin: 1em 0;">
  <strong>TLDR (Too long, didn't/don't wanna read)?:</strong> 
  <a href="#video" style="color: #007BFF; text-decoration: underline;">
    Jump to the video here.
  </a>
</div>
<div style="border-left: 6px solid #fa3a00ff; background-color: #fddfdbff; padding: 1em; margin: 1em 0;">
  <strong>Curious about the code? </strong> 
  <a href="https://www.github.com/SmokyFishy/THETA" style="color: #007BFF; text-decoration: underline;">
    Access the GitHub here.
  </a>
</div>

Tony Stark was right—teleoperation (the remote control of robotic devices) is truly the future. 

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

* A [gesture joint angles ground truth dataset](https://drive.google.com/file/d/1cvmBKoHwGXdxwPT7tW2Ufd-ZZP5Q1pcT/view?usp=sharing) was used to train the ML pipeline. 
    * 15 features (15 joint angles of fingers) across 40 distinct hand gestures were measured manually with a protractor. In each finger: 
      * Metacarpophalangeal (MCP) joint: flexion/extension, abduction/adduction at the knuckle.
      * Proximal Interphalangeal (PIP) joint: mid-finger bending.
      * Distal Interphalangeal (DIP) joint: fingertip actuation.
    * RGB image capture (640x480p, 30FPS) from all three cameras (hence the triangulation) were synchronized while performing the selected hand gesture (see table). 
      * __In total, more than 48,000 images were captured for the dataset (~1,200 images per gesture).__
      * The corresponding joint angles were recorded, with a ±5-degree error threshold was added to account for any human error in the data collection process.

      |     Gesture ID    |     Gesture Name    |     Index MCP Angle |     Index PIP Angle |     Index DIP Angle |     Middle MCP Angle |
      |-------------------|---------------------|---------------------|---------------------|---------------------|----------------------|
      |     1             |     Closed Fist     |     90 (±5°)        |     90 (±5°)        |     110 (±5°)       |     90 (±5°)         |
      |     2             |     Open Palm       |     180 (±5°)       |     180 (±5°)       |     180 (±5°)       |     180 (±5°)        |
      |     3             |     Number One      |     180 (±5°)       |     180 (±5°)       |     180 (±5°)       |     90 (±5°)         |
      
      <center>Example entries from dataset.</center>

<div style="display: flex; justify-content: center; gap: 2em; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="/images/portfolio/theta/fig5.png" 
         alt="Constructed & modified" 
         style="max-height: 300px; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">Joint data collection diagram.</p>
  </div>
  <div style="text-align: center;">
    <img src="/images/portfolio/theta/fig6.png" 
         alt="Fingertip flexion" 
         style="max-height: 300px; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">Triangulation (multi-view) data collection setup.</p>
  </div>
</div>
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig7.png" 
         alt="Caption for Fig 7" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Triangulated, synchronized RGB images captured from webcams (right, left, and front). 
    </p>
  </div>
</div>
  * This same triangulation setup (see specific measurements above) is how the pipeline works in real-time inference.
    * __The hand input will be "scanned" by the three cameras simultaneously, and the 15x1 angle vector that is outputted from the CNN model will be fed into the robotic hand, enabling real-time teleoperation.__

__3. Segmentation Preprocessing & THETA Joint Angle Classification__
* The images are first __segmented__ (hand is cut out from the background) through the following process:
  * Images are preprocessed:
    * Resized to 224×224 to reduce size (Input tensor is a 224×224×3 vector).
    * Pixel values are normalized.
  * Image features are extracted, linked to angle vectors:
    * Image passed through DeepLabV3 with the ResNet-50 backbone. 
      * DeepLabV3 is a __semantic segmentation network__, which classifies every pixel in an image as a category (like "dog", "sky", etc).
      * ResNet-50 is a (lightweight) __pretrained deep residual network__ with 50 layers (hence the name), which processes the input image to produce feature mappings to that image's corresponding angle vectors.
      * Atrous-Spatial Pyramid Pooling is applied to extract features between multiple layers/pixels.
      * [Curious why we chose DeepLabV3 with ResNet-50?](https://docs.google.com/document/d/1sj1Y-YGme6bJ7TUa-s7DHwr22o6JEYRSMdulSoXbk1k/edit?usp=sharing)
  * Segmentation of the hand is predicted:
    * Masks (region of hand) optimized with BCEWithLogitsLoss
    * Erosion/dilation image touchups added for the removal of noise.
    * __The hand is segmented in red!__ (All the red in the original RGB images are masked over with blue to prevent unintended red masks in the images)

<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig8.png" 
         alt="Caption for Fig 8" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      End-to-end segmentation pipeline. 
    </p>
  </div>

</div>
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig9.png" 
         alt="Caption for Fig 9" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Red masks segmentating the hand, across triangulated views. 
    </p>
  </div>
</div>
__4. THETA Joint Angle Prediction, Real-Time Inference, & Results__

* After segmentation, the masked images are HSV processed (background = black, hand = red), and passed through a convolutional neural network (CNN), __MobileNetV2__.
  * During model training:
    * Joint angles are binned 1-9, where:
      * 1 corresponds to 80-90 degrees (our defined threshold of the smallest angle a finger joint is able to make)
      * 2 corresponds to 90-100 degrees... etc
      * 9 corresponds to 170-180 degrees (our defined threshold of the largest angle a finger joint is able to make)
    * Input data (multi-view HSV images) are classified into one of the 9 bins
    * Training is optimized:
      * Focal Loss (γ = 2.0)
      * Adam (LR = 0.001)
      * Trained on 10 epochs.
    * Last layer is modified: 
      * Reshaped to (batch, 15, 10)
      * T = 2.0 scaling
      * Softmax

<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig10.png" 
         alt="Caption for Fig 10" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      MobileNetV2 Inputs: 224×224×3 HSV image, angle vectors. 
    </p>
  </div>

</div>
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig12.png" 
         alt="Caption for Fig 11" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
  </div>
</div>
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig13.png" 
         alt="Caption for Fig 11" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      High training and validation accuracy with loss convergence to 0.0001, demonstrating strong generalization, minimal overfitting, and reliable joint angle classification.
    </p>
  </div>
</div>
* Overall, the CNN network was fairly accurate, with a __97.18%__ accuracy on the testing set, demonstrating high potential for strong generalization in predicting joint angles given multi-view images.
  * Other important metrics:
    * F1 score: 0.9274
    * Precision: 0.8906
    * Recall: 0.9872
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/theta/fig14.png" 
         alt="Caption for Fig 14" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Important metrics for MobileNetV2 model.
    </p>
  </div>
</div>

<div style="text-align: center; margin: 1.5em 0;">
  <img src="/images/portfolio/theta/demo.gif" 
       alt="THETA pipeline demo" 
       style="width: 80%; max-width: 800px; border-radius: 10px;">
  <p style="font-size: 0.9em; color: #555;">THETA pipeline demo
  <a href="https://imgflip.com/gif/a8uivn">(GIF not playing?)</a>
  </p>
</div>

Conclusion
---
__THETA’s simple setup and robustness has the potential to increase the accessibility of high-compliant teleoperated robotic hands, with implications for countless real-life fields, such as:__
* __Household prosthetics__ - improve automation and AI functionalities, especially for those with disabilities or difficult quality-of-life.
* __Linguistics__ - facilitate remote/automated sign language interpretation and gestures, like ASL (American Sign Language)
* __Medical field__ - support remote surgical procedures with precise joint angle control systems (once our robotic hands become built with industry standard!)
* __Inaccessible__ exploration - enable dexterous object manipulation during space missions or rescue missions in inaccessible places.
* __Manufacturing & agriculture__ - automate precise, perfect grasping and manipulation of consumer goods.

What's next? 
---
As with any good project, there is future research planned:
* Develop __adaptive learning models__ that continuously refine and enhance joint angle recognition through weighted user feedback.
* Optimize deep learning pipelines to __minimize latency__ and boost real-time responsiveness of physical robotic hand.
* __Integrate LLM reasoning, logic,__ and __image capabilities__ to enhance compliance and awareness for situational contexts.

---

{% include base_path %}

<p style="margin-top: 1em;">
  <a href="http://alexhuang1029.github.io/images/portfolio/theta/poster.pdf" target="_blank">
    Click here for full PDF Version of the official 48x48 ISEF poster
  </a>
</p>

<h2 id="video">Quick Video Summary</h2>
<p>Video submission for participation in the 2025 International Science and Engineering Fair...</p>

<iframe width="560" height="315" src="https://www.youtube.com/embed/m4txAvVQ458?si=Iqf6bxr5arGc5WZg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>