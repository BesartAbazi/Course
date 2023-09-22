Node has a global process object with useful methods and information about the current process.
The process.env property is an object which stores and controls information about the environment in which the process is currently running. For example, the process.env object contains a PWD property which holds a string with the directory in which the current process is located

let initialMemory = process.memoryUsage().heapUsed;