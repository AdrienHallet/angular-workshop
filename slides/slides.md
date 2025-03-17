--- 
theme: default
class: lead
paginate: true
marp: true
---

# Angular Workshop

---

# Topics
* Reactivity with Observables and Signals
  * RxJS operators
* Domain / Business architecture
* Performance improvements

---

# Diving In
Users report dissatisfaction with the App's performance. You are aware that the back-end is slow to answer,
but that is outside the scope of your work. Instead, you investigate the front-end...

1. Run the app (available on [StackBlitz](https://stackblitz.com/github/AdrienHallet/angular-workshop))
2. The app's sole purpose is to download & display information
3. Freely explore causes & solutions to improve user satisfaction

---

# Investigation

There are two main slowdown issues. DevTools is helpful to pinpoint those:

1. Performance Analysis
   * Something is consuming power between the download & display (what? why?)
2. Network Analysis
   * Is a sequential load the best approach?

---

# Solutions

* User experience has useful metrics, but no universal truth
   * Time to ... interactive? first paint? etc.
* Performance as part of the design
   * Consider User Feedback (e.g., 'What is essential / optional?')
* Asynchronous data, asynchronous loading
* Data structures (temporal/spatial complexity)
