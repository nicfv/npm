# Custom Exception Message

In some cases, we may want to override the default exception message. This can easily be done by adding an additional string argument at the end of any test. This can help determine which test failed from a script of several tests. Even if a message is overwritten, it will still say which test number failed.

In this example scenario, we want to check the price of an item and continue processing if it is below a certain threshold. Since we are catching these exceptions, the script will continue to run anyway, but will immediately exit the `try` block and advance straight into the `catch` block. Notice how the output does not contain the string "Processing item."