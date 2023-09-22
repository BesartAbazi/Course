Heap:
=====
The heap provides dynamic memory allocation at runtime for data types that don’t have a fixed size, like objects and functions. 
These are reference values and we keep track of where to find them in the unstructured heap using a fixed-size reference in the stack.
If you modify an object, you are modifying a reference to the object and not the object itself.
The heap is a block of memory where we store objects in an unordered manner.
JavaScript variables and objects that are currently in use are stored in the heap.

Stack:
======
The stack is used for static storage, where the size of an object is known when the code is compiled. 
Since the size is known, a fixed amount of data is reserved for the object, and the stack remains ordered.
The stack has a finite amount of space provided by the operating system, which you typically only exceed when you have problems in your code, like infinite recursion or memory leaks.
Primitive values, references to non-primitive values, and function call frames are stored in the stack. 
You can think of references as a parking space number in a massive (but disordered) parking garage telling JavaScript where to find objects and functions. 


Releasing Memory: Garbage Collection

Garbage collection refers to the process of clearing memory. The JavaScript engine manages garbage collection using two key algorithms:

    Reference-counting
    Mark-and-sweep


Garbage collection:
===================
Garbage collection algorithms use different approaches to detect if some piece of memory is no longer needed by the program.
Once memory is no longer needed, it is released and can be reused. (Remember that we mentioned all memory relates back to RAM, so space is finite.) 
When you consider the idea of whether or not some piece of memory is still needed, it can get pretty complicated. 
Let’s take a quick look at how the reference-counting and mark-and-sweep algorithms work.


Reference-Counting:
===================
As we learned about in the stack and heap section, all of the objects you make in your program have references and memory allocated to them.

Reference-counting makes use of the references to variables that live on the stack. When an object is created, it’s reference count is one. 
If you make a second variable point to that object, the reference count is two. 
If a function makes use of an object, the reference count is increased by one. 
Usually, inner elements from function calls are garbage collected when a function is done executing, unless the inner elements are still referenced.

let obj = new Object(); // reference count of one
let obj2 = obj; // reference count of two
obj2 = "string"; // obj has a reference count of one again

With the reference-counting algorithm, if the reference count drops down to zero, there are no more references to the object in your program, so the JavaScript engine can mark that memory block as free to use so future allocations can utilize and overwrite the block.

let monument = {
   name: "Eiffel Tower"
};
monument = "Golden Gate Bridge";

In the example, the monument variable is reassigned to the string value “Golden Gate Bridge,” so the name property can be garbage collected as it has a reference count of zero.
This type of algorithm does have some shortcomings. We’ll look into the concept of circular references in the memory leak section below and how reference counting doesn’t always cut it.


Mark-and-Sweep:
===============
The Mark-and-Sweep algorithm runs periodically and starts at the root of your code, the global object.
From the root, it’ll “sweep” across your code to find and mark anything that is “reachable” by traversing across all of the variables.
The mark is generally something like a boolean.
After that process, any of the variables that are unmarked (i.e. they were not marked in the first step and therefore were not reachable) will be garbage collected during the sweep phase.
That process is repeated over and over again during code execution.




=====================================
Debugging Memory Issues in JavaScript
=====================================

How memory issues can impact performance and end-user experience
----------------------------------------------------------------
When your code has memory leaks or you try to use more memory than is available for your program, it can cause websites to slow down and crash. Accidentally introducing memory leaks into your application can be as easy as either of these scenarios:

    Adding an event listener but never removing it
    Adding variables to the global object

When you set objects as data on a DOM element, it can lead you to use more memory than is available, or can even lead to a memory leak if you never remove the DOM object. (For example, you might render a modal box off-screen and keep it there.) When that happens in production, your end users experience the impact.

To find the source of memory issues, we have to consider questions like:

    From where was memory allocated?
    Why wasn’t some piece of memory garbage collected?
    How is memory usage growing over time?

Browser tools provide options for answering these questions.


Developer Tools that can help you debug memory issues
----------------------------------------------------------------
Most browsers, including Google Chrome, Firefox, and Safari, have built-in tools you can use to debug and test your code. While those tools all have feature parity, here we’ll look specifically at the Memory Panel in Chrome’s Developer Tools, “DevTools”, which provides information on how memory is being used.

There are a few different tools available in the Memory Inspector:

    Heap Snapshot: This tool shows you how memory is distributed among a page’s JavaScript objects and related DOM nodes.
    Allocation instrumentation on timeline: This tool shows JavaScript memory allocations over time, and can be used to isolate memory leaks.
    Allocation sampling: We can use this to record memory allocations using a sampling method. This tool is best for long-running operations.

Heap Snapshot

	Heap snapshots are great to use when debugging memory issues, because you can see what is taking up memory at a given time and compare between times. This view shows:

		What objects are in memory
		Details about the objects that are in memory, like the constructor function that was used to make the object
		How objects reference each other
		The size of memory objects are using
		What’s been added or failed to be garbage collected between snapshots

	The Heap Snapshot tab has 4 different views:

		Summary view: This view groups objects by constructor and can be used to track down DOM leaks.
		Comparison view: This displays the difference between Heap snapshots. So if you use more memory or have memory garbage collected between snapshots, you can identify if you have a memory leak based on reference counts and change in freed memory. Note that this view will only be available if you have 2 or more heap snapshots saved in the DevTools Memory Panel.
		Containment view: This view is helpful for analyzing objects referenced in the global namespace (Window) to track down why they are not being garbage collected.
		Statistics view: This shows a breakdown of how memory is being used based on various categories, like Code, Strings, and JS arrays.

Allocation Instrumentation on Timeline

	You can use the allocation timeline to identify objects that aren’t being garbage collected when they should be and therefore remain in memory. It is a combination of details you’d find in the heap snapshot, but with the addition of timeline tracking that takes updated snapshots as frequently as every 50 ms. You can use the allocation timeline by making a recording and performing page actions while the recording is underway.

	This view shows:

		Where objects were allocated during code execution
		How often garbage is being collected

Allocation Sampling

	Allocation sampling is similar to the allocation timeline, but has lower performance overhead. Snapshots are taken as a sample of the stack trace rather than with a regular cadence as they are when using the allocation timeline. You can use allocation sampling when you need to record snapshots for long-running operations and use the stack trace to identify where allocations are originating.

This view shows:

    What lines of code are creating garbage for the garbage collector
    What lines of code are allocating new heap memory
