We can save data to our browser's `localStorage` object, which persists through browser and system restarts, and has no built-in expiration date. This type of storage is good for small data objects such as user preferences, settings, or high scores.

> **Note 2:** `localStorage` is not shared between different browsers or systems. Additionally, incognito browser tabs will use a different `localStorage` which automatically clears when the tab or window is closed.

We can use `graphico`'s built-in functions to save data, load data, or clear data from `localStorage`. We can assign a "namespace" to differentiate our data from basic browser local storage and from different data sets that we define. For example, we can have multiple user profiles, where each user profile lives in its own namespace. For safety, we can only clear namespaces that we define when saving data.

> **Note 1:** `localStorage` can be completely cleared by clearing your browser's data.

In this example we do just that - we define a set of user profiles, each containing data of the amount of time each key was pressed. (The canvas must be focused in order to capture keyboard input.) We can switch between different user profiles to see that a unique dataset was saved under each profile.

#### Security Enhancements

If you use the *Inspect Element* tool (on any website or web app), you can see your local storage by typing `localStorage` in the console, and you'll notice that most of these are stored in readable text. For slightly better security, `graphico` automatically encodes and decodes this data with a base64 encoding so it cannot be directly read and edited as easily using *Inspect Element*.