---
title: "NeuroTrace: A Novel Machine-Powered System to Detect Neurodegeneration through Handwriting Kinematics Analysis"
date: "March 30, 2024"
excerpt: "Could this be the 'write' approach?<br/><img src='/images/portfolio/neurotrace/logo.png' width='350px' style='border-radius: 14px;'>"
collection: portfolio
read_time: 10
---
<div style="border-left: 6px solid #7e7e7eff; background-color: #f1f1f1ff; padding: 1em; margin: 1em 0;">
  <strong>Read my paper</strong> 
  <a href="/publication/neurotrace" style="color: #007BFF; text-decoration: underline;">here.</a>
</div>

<div style="border-left: 6px solid #FFC107; background-color: #FFF8E1; padding: 1em; margin: 1em 0;">
  <strong>Authors:</strong> 
  <a href="https://alexhuang1029.github.io" style="color: #007BFF; text-decoration: underline;">Alex Huang</a>, for the <a href="https://www.azscience.org/visit/events/arizona-science-engineering-fair-azsef/awards/" style="color: #007BFF; text-decoration: underline;">2024 Arizona Science and Engineering Fair</a> (AzSEF).
</div>

<div style="border-left: 6px solid #007bffff; background-color: #EAF3FF; padding: 1em; margin: 1em 0;">
  <strong>TLDR (Too long, didn't/don't wanna read)?:</strong> 
  <a href="#poster" style="color: #007BFF; text-decoration: underline;">
    Jump to the summary poster here.
  </a>
</div>
<div style="border-left: 6px solid #fa3a00ff; background-color: #fddfdbff; padding: 1em; margin: 1em 0;">
  <strong>Curious about the code? </strong> 
  <a href="https://www.github.com/alexhuang1029/NeuroTrace" style="color: #007BFF; text-decoration: underline;">
    Access the GitHub here.
  </a>
</div>


__Neurodegenerative diseases (NDs), like Parkinson's and Alzheimer's, affect more than 62 million people worldwide, especially seniors.__ Most NDs share the common pattern of damaging the motor system, which leads to the loss of hand control. Hand motions can become segmented and jagged, and daily activities, like writing, can be seriously affected.

<div style="border-left: 6px solid #208c02ff; background-color: #e1eddeff; padding: 1em; margin: 1em 0;">
  <strong>NeuroTrace is a low-cost, non-invasive screening tool that utilizes handwriting kinematics and machine learning to identify the early signs that indicate neurodegenerative disorders. </strong> 
    Through a WACOM drawing tablet, a lightweight HTML webpage and a <a href="https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html" 
    style= "color: #007BFF;">Random Forest classification backend</a>, NeuroTrace is an effective remote diagnostic and medical monitor to reduce the troubles that neurodegenerative diseases—before they become serious.
</div>

Experimental Design & Methodology
---
__1. Dataset Preparation__
* The training handwritten dataset (n=174) used was the [DARWIN dataset](https://archive.ics.uci.edu/dataset/732/darwin) from the [UCI Machine Learning Repository](https://archive.ics.uci.edu/). 
    * There were 25 tasks for handwriting and 18 metrics produced from each task (avg. speed, acceleration, jerk, pressure in x,y,z, etc).
    * Unnecessary tasks and metrics were removed using the _feature_importance_ function in _scikit-learn_.
    * 6 out of the 25 original handwriting tasks in DARWIN were chosen for training and testing, based on the most distinctive features (line, circle, cursive, etc):
      * Test 1: Tracing horizontal lines
      * Test 2: Tracing vertical lines
      * Test 3: Tracing a large circle (6cm)
      * Test 4: Tracing a small circle (3cm)
      * Test 5: Writing l's in cursive
      * Test 6: Writing la's in cursive


<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 400px;">
    <img src="/images/portfolio/neurotrace/fig9.png" 
         alt="Caption for Fig 10" 
         style="max-width: 400px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      The different 6 NeuroTrace tasks.
    </p>
  </div>
</div>
  * 12 metrics out of the 18 were used to reduce the number of dimensions.  

__2. Random Forest Model Training & Optimization__

* Scikit-learn's  [__Random Forest Classifier__](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html) was used to train the NeuroTrace model. 
    * The Random Forest classification model was chosen since it overfits less, generalizing well to unseen data.
      * Inputs: The metrics (features) of each of the 6 tasks of a patient
      * Outputs: The classification of the patient (healthy/patient), as well as analyzable metrics which are used to tune the model's hyperparameters.
      * 75%/25% training/testing split
<div style="display: flex; justify-content: center; gap: 2em; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/neurotrace/fig1.png" 
         alt="Caption for Fig 1" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Hyperparameter Tuning process. 
    </p>
  </div>
</div>
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/neurotrace/fig2.png" 
         alt="Caption for Fig 2" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Performance metrics vs. parameters (# of features & max depth). The 5-fold CV (Cross-validation) score is highlighted, and drops after certain parameters.
    </p>
  </div>
</div>
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 800px;">
    <img src="/images/portfolio/neurotrace/fig3.png" 
         alt="Caption for Fig 3" 
         style="max-width: 700px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Average performance metrics and confusion matrix for trained NeuroTrace RF model.
    </p>
  </div>
</div>
  * The model has __high accuracy (90%)__ and __precision (94%)__, and __fairly good recall (84%)__, with an __F1 score__ (weighted avg. of precision/recall) of __88%__.
  * 5-fold cross-validation score (80%) and ROC-AUC (Area under curve) score (90%) signal that __NeuroTrace generalizes well across unknown (real-life) data__.
  * Results are statistically significant, meaning that NeuroTrace's predictions are better than random chance.

__3. NeuroTrace Frontend Development__
* Developed portable & interactive HTML/JavaScript program that collects handwriting kinematics data (12 features) over the chosen 6 tasks.
  * A WACOM Intuos Tablet collects handwriting data with an electronic pen.
  * Captures pen kinematics (x, y, pressure, tilt, pen-up/pen-downs) from a calibrated WACOM tablet at 120 Hz, and exports kinematics CSV file.
  * There is a paper pad printed with the corresponding mapped tasks (n=6) on the program. Participants traced the paper with the electronic pen, testing hand-eye coordination.
  * The raw testing data can be found [here](https://github.com/alexhuang1029/NeuroTrace/tree/main/TestData). All participants are anonymous per signed informed consent forms.

    | Time (cycle) |     Pendown |     X Position |     Y Position |     Pressure |     TiltX |     TiltY |
    |--------------|-------------|----------------|----------------|--------------|-----------|-----------|
    | 1            | 0           |     530        |     277        |     0.001    |     0     |     0     |
    | 2            |     1       |     533        |     276        |     0.215    |     0     | 0         |
    | 3            |     0       |     536        |     270        |     0.222    |     0     |     0     |
    
    <center>Example entries from 1 of 6 task csv files from dataset.</center>

<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 400px;">
    <img src="/images/portfolio/neurotrace/fig4.png" 
         alt="Caption for Fig 4" 
         style="max-width: 400px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Data collection device - WACOM Intuos Tablet (120hz).
    </p>
  </div>
</div>
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 600px;">
    <img src="/images/portfolio/neurotrace/fig5.png" 
         alt="Caption for Fig 5" 
         style="max-width: 600px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      NeuroTrace webpage program, with annotations on page by drawing on tablet.
    </p>
  </div>
</div>

* The CSV file outputted from the HTML program is processed & normalized to DARWIN dataset scaling and then analyzed by the trained NeuroTrace Random Forest model.
  * The central difference approximation formulas for parametric/kinematics equations are below, which calculated the tested handwriting kinematics (Dividing by 120^n due to WACOM tablet operating at 120 Hz):

$$\begin{align*} \small
\text{avg. speed} &= \small \frac{1}{n} \sum_{i=0}^{n} 
\sqrt{(x_i - x_{i+1})^2 + (y_i - y_{i+1})^2} \\[1em]
\small
\text{avg. acceleration} &= \small \frac{1}{n} \sum_{i=0}^{n} 
\frac{\sqrt{(x_{i+1} - 2x_i + x_{i-1})^2 + (y_{i+1} - 2y_i + y_{i-1})^2}}{120} \\[1em]
\small
\text{avg. jerk} &= \small \frac{1}{n} \sum_{i=0}^{n} 
\frac{\sqrt{(x_{i+2} - 3x_{i+1} + 3x_i - x_{i-1})^2 + (y_{i+2} - 3y_{i+1} + 3y_i - y_{i-1})^2}}{120^2}
\end{align*}$$

__4. Real-life NeuroTrace Prototype Testing & Data Analysis__

* Randomly recruited seniors (n=18, mean age=80) from nearby senior facilities (Chandler & Gilbert, Arizona) participated in NeuroTrace testing
  * All subjects signed informed consent forms explaining purpose of study and data protection policies.
* Subjects completed two tasks, in about 10 minutes: 
  1. Completed quick demographics survey bout subjects' history neurodegenerative diseases and their educational & vocational (job) history.
    * __This survey was used to determine if subjects were positive _(Patient)_ or negative _(Control)_ ground truth for data collection.__
  2. Utilized the calibrated WACOM tablet, digital pen, and software to complete the 6 NeuroTrace tracing tasks.
<div style="display: flex; justify-content: center; gap: 2em; flex-wrap: wrap;">
  <div style="text-align: center;">
    <img src="/images/portfolio/neurotrace/fig6.png" 
         alt="WACOM" 
         style="max-height: 200px; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">Participant completeing vertical dots task</p>
  </div>
  <div style="text-align: center; max-width: 340px;">
    <img src="/images/portfolio/neurotrace/fig7.png" 
         alt="Program" 
         style="max-height: 400px; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">Different participant completing cursive 'l' task.</p>
  </div>
</div>


<div style="display: flex; justify-content: center; align-items: flex-start; gap: 2em; flex-wrap: wrap; text-align: center;">
  <div style="flex: 1 1 350px; max-width: 330px;">
    <img src="/images/portfolio/neurotrace/fig8.png" 
         alt="WACOM" 
         style="width: 100%; height: auto; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">
      Data collection WACOM tablet, set up w/ tracing assignment. The subject traces the ring with the pen, which is recorded on the NeuroTrace software.
    </p>
  </div>

  <div style="flex: 1 1 300px; max-width: 340px;">
    <img src="/images/portfolio/neurotrace/fig9.png" 
         alt="Program" 
         style="width: 100%; height: auto; border-radius: 14px;">
    <p style="font-size: 0.9em; color: #555;">
      Each of the 6 NeuroTrace tasks for subjects to trace.
    </p>
  </div>
</div>
  * __Data Analysis__
    * According to the confusion matrix for participant testing, the model was __88% accurate__ at identifying positives and negatives for neurodegenerative diseases (Alzheimer's, Parkinson's, MS, etc), with an __80% F1 score__.
    * __This proves that a distinct difference between healthy control subjects' and patients' subjects handwriting kinematic exists.__
      * Limitations: statistics based on very limited sample size (n=18), needs additional testing.
<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 300px;">
    <img src="/images/portfolio/neurotrace/fig10.png" 
         alt="Caption for Fig 4" 
         style="max-width: 300px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      Confusion matrix for NeuroTrace model evaluation (n=18).
    </p>
  </div>
</div>

<div style="display: flex; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; max-width: 400px;">
    <img src="/images/portfolio/neurotrace/fig11.png" 
         alt="Caption for Fig 4" 
         style="max-width: 400px; border-radius: 14px; height: auto; width: 150%">
    <p style="font-size: 0.9em; color: #555;">
      NeuroTrace training and real-life testing accuracy metrics.
    </p>
  </div>
</div>
Conclusion
---
__NeuroTrace ensures early neurodegenerative disease detection with a 80%+ accuracy. NeuroTrace ultimately will create a future where the burden of neurodegenerative diseases is alleviated, with implications and applications:__
* Quick, accurate, and non-invasive screening tool
* Cost-effective, efficient application for low-resource groups
* Effective remote diagnostic and medical monitor
* Useful longitudinal study tool due to its quick & simple tasks

What's next? 
---
As with any good project, there is future research planned:
* __Multimodal Expansion:__ Combine handwriting with speech or facial expression analysis for higher diagnostic sensitivity.
* __Personalization:__ Train adaptive models that consider demographic, vocational, and medical background data.
* __Longitudinal Tracking:__ Utilize NeuroTrace regularly long-term as a checkup tool through repeated handwriting sessions.
* __Clinical Integration:__ Partner with neurology labs to deploy NeuroTrace as a pre-diagnostic screening application.

<h2 id="poster">Summary Poster</h2>
<p>Presented at the 2024 Arizona Science and Engineering Fair, placing 3rd for the Translational Medical Sciences category.</p>
<iframe width="800" height="600" src="/images/portfolio/neurotrace/poster.pdf" frameborder="0" ></iframe>
<p style="font-size: 0.9em; color: #555; text-align: center; margin-top: 0.5em;">
  <a href="/images/portfolio/neurotrace/poster.pdf" 
     target="_blank" 
     style="color: #007BFF; text-decoration: underline;">
    Open PDF in a separate window
  </a>
</p>