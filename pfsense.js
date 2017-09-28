// Returns a form element by name or nothing.
function findForm(name) {
    return $("form[name=\"" + name + "\"]")[0];
}

// Run a form's POST action, returing a Promise so we can chain POSTs.
function postForm(name) {
    // Find the form.
    let f = findForm(name);

    // if we don't have a form, return an immediately-failed Deferred.
    if (f === undefined) {
        return Deferred().reject("Unable to locate form " + name);
    }

    // find the form by the name attribute.
    // Return the Deferred of the jQuery.post method.
    return $.post({
        // This is the action from the form, i.e. the path we're
        // POSTing to.
        url: f.action,

        // This is the form-encoded data we're putting in the request
        // body.
        data: $(f).serialize(),

        // Store the redirect URI as the context for the Deferred
        // callbacks.
        context: $(f).find("input['name'='redirurl']").get(0).value
    });
};

// Returns a Deferred based on the outcome of the form posts.
function postForms() {
    // Our own Deferred so that the UI can track progress.

    // The redirect URI set by the "login-form".
    let ru = "";

    // 1. Post the pfSense "login-form" first
    // 2. Since we'll already have registered a handler for the "post"
    //    in initPosts that will disable the automatic posting and
    //    redirect handling,
    // 3. We post the "login-form" form manually, and if it succeeds,
    // 4. We post the "input" form manually,
    // 5. Now, if all that worked, we use the redirect from the
    //    pfSense form and manually redirect the user.
    return postForm("login-form")
        .done(
            function() {
                // save the redirect URI for later.
                ru = this;

                // notify the waiters we're progressing
                d.progress("pfSense succeeded");

                // post the "input" form.
                postForm("input");
            })
        .done(
            function() {
                // Notify waiters we're changing pages.
                d.progress("redirecting to " + ru);

                // Resolve this Deferred so everyone has a chance to
                // catch up.
                d.resolve();

                // Move on to the redirect url.
                document.location = ru;
            })
        .reject(function(e) {
            // Notify waiters we failed.
            d.progress("failed: " + e);

            // Log the error to the console.
            console.error(e);

            // Reject this Deferred so everyone realizes we may be
            // fucked.
            d.reject();
        });

};

function registerPreventPost(name) {
    let f = findForm(name);
    if (f === undefined) {
        console.error("Could not find " + name + ".");
        return False;
    };

    f.post(function(ev) {
        ev.preventDefault();
    });

    return true;
};

var forms = ["login-form", "input"];

function registerPostHandler() {
    for (i = 0;
         i < forms.length;
         i++) {
        if (!registerPreventPost(forms[i])) {
            return false;
        }
    }

    return true;
};

// Make sure we prevent any listed forms from actually posting since
// we'll be dealing with that once the DOM is loaded.
$(registerPostHandler);
