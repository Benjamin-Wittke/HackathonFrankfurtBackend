module.exports = function (context, req) {
    context.bindings.hackathonfrankfurtbbsql = req.body;
    context.bindings.signalRMessages = [{
        "target": "newMessage",
        "arguments": [req.body]
    }];
    context.done();
};