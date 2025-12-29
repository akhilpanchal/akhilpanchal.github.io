---
title: "Drag and Drop libraries in React.js"
date: 2021-01-16
tags: ["react", "javascript", "dragdrop", "opensource", "react-dnd", "react-beautiful-dnd"]
---

![Cover image](/maria-teneva.jpg)
##### Image Credits:&nbsp;[Maria Teneva](https://unsplash.com/@miteneva)

In the world of React.js, there are some really amazing drag and drop libraries. Some of the popular ones are:

1. [react-dnd](https://github.com/react-dnd/react-dnd/)
1. [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
1. [react-draggable](https://github.com/react-grid-layout/react-draggable)
1. [dragula](https://github.com/bevacqua/dragula)

I recently had to look through the wild and decide which drag and drop library works best for our use-cases. After skimming through the APIs and the github pages of some of the popular libraries, I decided to explore and play around with [react-dnd](https://github.com/react-dnd/react-dnd/) and [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd). This post covers the contrast between the 2 really amazing libraries.

### TLDR;

1. Use `react-beautiful-dnd` if your use case is to build really simple drag drop interactions for lists, without much custom requirements.
1. Use `react-dnd` if you want to be in a lot more control of the drag drop interaction, and set yourself up in a better situation for any future customization.
1. Explore `react-draggable`, `dragula` for everything in between.

---


## Background

### react-dnd

`react-dnd` was created by Dan Abramov and he very well summarizes the goals of `react-dnd` in this [insightful post](https://medium.com/@dan_abramov/the-future-of-drag-and-drop-apis-249dfea7a15f). In it's implementation, `react-dnd` separates out the logic to build the drag and drop functionality into [**_backends_**](https://react-dnd.github.io/react-dnd/docs/overview). You have the liberty to decide which backend to use. By default, `react-dnd` provides HTML5 backend which uses the HTML5 drag-drop API, but you are free to use other backends available out there (touch, mouse, etc.)

### react-beautiful-dnd

`react-beautiful-dnd` is relatively newer, authored by Alex Reardon and supported by Atlassian. It aims at solving some of the common drag and drop interactions that are required for more 'real' world interactions, mainly with lists and cards. It has a very simple API and you will find that it is very easy to get started. It is built by listening to mouse events to provide the drag and drop experience. It gives you a lot of features out of the box. However, if you wish to change some of this behaviour you might quickly find yourself struggling with it.

## Custom Drag Preview:
Ability to customize the UI object being dragged.

### react-beautiful-dnd

This library allows you to style your component when the drag is in progress. _For ex_: You want to show a different `background-color` or a `border` on your draggable object while it is being dragged. The creator of this library shows how you can do this in [this video article](https://egghead.io/lessons/react-customise-the-appearance-of-an-app-during-a-drag-using-react-beautiful-dnd-snapshot-values). However, you cannot change the dimensions of your draggable or droppable object when the drag is in progress. In most cases, you might not even want to do that. In our use-case, we wanted to make rows in our table component draggable and the UX spec dictated that we show a custom UI component that has minimal data so that the user can identify the row being dragged instead of the entire row being dragged around. `react-beautiful-dnd` does not support this out of the box since it expects the dimension of the draggable object to remain the same, you will have a hard time getting this to work as you expect.

### react-dnd

`react-dnd` by default provides the `html5-backend`, meaning it builds the drag-drop interaction using the HTML5 drag and drop API. The HTML5 drag-drop API does not allow changing the drag preview or its behaviour once the drag has started. However, `react-dnd` provides a [useDragLayer](https://react-dnd.github.io/react-dnd/docs/api/use-drag-layer) API that works around this limitation. The way they recommend achieving this is by rendering an empty image in place of the drag preview, and then using the `useDragLayer` API to render whatever you want when the drag is in progress and position it based on your preferences. [This](https://react-dnd.github.io/react-dnd/examples/drag-around/custom-drag-layer) example shows how you can do that.

## Nested Drag Drop interactions

Since `react-dnd` is a much lower level library, it does not dictate how you place your draggable and droppable containers.
`react-beautiful-dnd` on the other hand does not gracefully support nested drag and drop interactions out of the box. There are posts which will guide you on how to overcome some of these limitations.

Hope this was helpful. Let me know if there are any other good promising drag drop libraries that are worth exploring.


> This post was originally written on [dev.to](https://dev.to/akhilpanchal/drag-and-drop-in-the-reactjs-1067)