---
title: "Optimizing Large Language Models: Learning from Mistakes in Gameplay"
date: "August 19, 2024"
excerpt: "How can tic-tac-toe be so difficult...<br/><img src='/images/portfolio/shtem/logo.png' width='350px' style='border-radius: 14px;'>"
collection: portfolio
read_time: 10
---

<div style="border-left: 6px solid #7e7e7eff; background-color: #f1f1f1ff; padding: 1em; margin: 1em 0;">
  <strong>Read my publication</strong> 
  <a href="/publication/shtem" style="color: #007BFF; text-decoration: underline;">here.</a>
</div>
<div style="border-left: 6px solid #FFC107; background-color: #FFF8E1; padding: 1em; margin: 1em 0;">
  <strong>Authors:</strong> 
  <a href="https://alexhuang1029.github.io" style="color: #007BFF; text-decoration: underline;">Alex Huang</a>, Niv Levy, Federica D’Alvano Kirakidis, Lily Gao, and Aaron George, in collaboration with 
  <a href="https://compression.stanford.edu/" style="color: #007BFF; text-decoration: underline;">Compression Forum</a> at Stanford University.
</div>

<div style="border-left: 6px solid #007BFF; background-color: #EAF3FF; padding: 1em; margin: 1em 0;">
  <strong>TLDR (Too long, didn't/don't wanna read)?:</strong> 
  <a href="#video" style="color: #007BFF; text-decoration: underline;">
    Jump to the video here.
  </a>
</div>

---

## **Abstract**
This paper investigates how **Large Language Models (LLMs)**, such as Google Gemini 1.5 Flash, can **learn from previous mistakes** through **prompt engineering** in gameplay scenarios—specifically Tic-Tac-Toe. We introduce a benchmark for evaluating LLM learning and analyze how various prompt strategies affect performance. We explore implications for **multi-agent systems (MAS)**, focusing on coordination and communication, and identifies paths toward **Artificial General Intelligence (AGI)** through mistake-based learning.

---

## **1. Background**

### **1.1. NLP and LLM Development**
LLMs like GPT-4, BERT, and Gemini have transformed **Natural Language Processing (NLP)** by enabling machines to understand and generate human-like text. They are trained on large datasets to capture linguistic patterns, grammar, and context for various text-based tasks.

### **1.2. Techniques for Improving NLP Models**
- **Adversarial Attacks:**  
  Introduce small, imperceptible data perturbations (e.g., FGSM – Fast Gradient Sign Method) to improve robustness and accuracy.  
- **Data Augmentation:**  
  Enhances generalization using techniques such as synonym replacement and paraphrasing.  
- **Regularization Methods:**  
  Techniques like dropout, weight decay, and batch normalization help prevent overfitting.

### **1.3. Shift Toward Prompt Engineering**
Unlike traditional retraining, **prompt engineering** improves performance by **modifying model instructions** rather than architecture. Because LLMs operate on text-only inputs, prompt optimization becomes key for enhancing reasoning and robustness. This study focuses on how prompts referencing **past mistakes** affect LLM learning in gameplay.

---

## **2. Methods**

### **2.1. Experimental Setup**
- A **Gemini-based Agent** (non-optimal player, “X”) competes against an **Optimal Agent** (“O”) hard-coded to play perfectly.  
- Each method is tested over 5 trials, each with 10 games, recording:  
  - Final board states  
  - Move order  
  - Number of optimal moves  
  - Patterns of repeated mistakes  

A baseline trial (without prompt optimization) yielded a 100% loss rate.

### **2.2. Optimal Agent Validation**
Each of the nine Tic-Tac-Toe cells was numerically indexed. The Optimal Agent was confirmed perfect after 50 games versus a human opponent.

### **2.3. Base Prompt**
Included:
- The board state  
- Rules of Tic-Tac-Toe  
- The Agent’s role and valid response format  
This prompt formed the foundation for all subsequent prompt-engineering variations.

---

## **3. Prompt Engineering Methods**

### **Method 1: Complexity**
- **Goal:** Test if increasing prompt detail (more text, no past data) improves gameplay.  
- **Structure:** Elaborated instructions on strategy (e.g., “block the other player horizontally or diagonally”).  
- **Result:** Minimal improvement; ties and optimal moves did not increase consistently.  
- **Conclusion:** More complex language **did not enhance learning**—the Agent lacked exposure to past mistakes.

---

### **Method 2: Past Game Data – List Form**
- **Goal:** Include **past game data** as a **numbered list** to help the Agent learn from mistakes.  
- **Prompt Example:**  
  “Utilize the following sequence of events from past games to develop a winning strategy…”  
- **Result:**  
  - Probability of Agent Tie → **1.0 by Trial 5**  
  - Probability of Optimal Move → **1.0 by Trial 5**  
  - Losses dropped to zero.  
- **Conclusion:** Clear correlation between **listed past data** and **optimized gameplay**. The Agent effectively learned from mistakes.

---

### **Method 3: Past Game Data – Long-Form**
- **Goal:** Provide **narrative-style descriptions** of past games instead of lists.  
- **Example:**  
  “Game 1: You lost after playing grid 4 and failing to block your opponent’s winning move…”  
- **Result:** Minimal improvement; no consistent trend in tie probability or optimal moves.  
- **Conclusion:** The verbose format **reduced prompt clarity** and hindered comprehension.

---

### **Method 4: Near-Optimal Agent**
- **Goal:** Use **Method 2’s list-based prompts**, but have the Agent face a **Near-Optimal opponent** (chooses random optimal moves).  
- **Result:**  
  - Probability of Agent Win → **1.0 by Trial 5**  
  - Gameplay diversity increased.  
- **Conclusion:** Exposure to **unpredictable opponents** and **structured data** yielded full optimization and adaptability.

---

## **4. Results Summary**

| Method | Prompt Style | Opponent Type | Performance Trend | Outcome |
|:-------|:--------------|:--------------|:------------------|:---------|
| **1** | Long, complex instructions | Optimal Agent | Minimal improvement | No optimization |
| **2** | Listed past data | Optimal Agent | Continuous improvement | Full optimization |
| **3** | Paragraph (long-form) past data | Optimal Agent | Inconsistent | No optimization |
| **4** | Listed past data | Near-Optimal Agent | Strong improvement | Full optimization |

**Key Finding:**  
LLMs learn best when given **structured lists of past mistakes**—not complex narratives—allowing them to identify and replicate optimal strategies.

---

## **5. Conclusions**

- **Effective Prompt Engineering:**  
  Methods 2 and 4 show that concise, structured prompts referencing previous errors significantly enhance LLM gameplay.
- **Ineffective Strategies:**  
  Complex or verbose instructions (Methods 1 and 3) did not yield measurable learning gains.
- **Core Insight:**  
  LLMs can “learn” from past gameplay through **text-based feedback loops**—a form of *externalized self-learning* without retraining.

This demonstrates how prompt-based optimization can enhance LLM reasoning efficiency and opens new opportunities for applications in **game logic**, **education**, **assistive agents**, and **simulation training**.

---

## **6. Future Research**
- **Generalization:** Apply mistake-learning frameworks to **complex games** such as Chess or Monopoly.  
- **Emotion and Sentiment Integration:** Allow LLMs to adapt strategy dynamically based on emotional cues for **human-like gameplay**.  
- **Broader Applications:** Extend to real-world problem-solving—particularly in **assistive AI for the elderly or disabled**—through adaptive reasoning and self-improvement loops.  

 >**Artificial intelligence presents an exciting future. However, to improve our lives, AI must begin by improving itself.**

---


<h2 id="video">Quick Video Summary</h2>
<p>Video presentation for culmination talk for the 2024 SHTEM program.</p>

<iframe width="560" height="315" src="https://www.youtube.com/embed/ky7LpNgwXBc?si=ph4RSy2Q560jsbkG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<p style="font-size: 0.9em; color: #555; text-align: center; margin-top: 0.5em;">
  <a href="https://youtu.be/ky7LpNgwXBc" 
     target="_blank" 
     style="color: #007BFF; text-decoration: underline;">
    Playback not working? Open YouTube
  </a>
</p>
