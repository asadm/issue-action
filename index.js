import { getContextFromIssue } from "./common/githubContext.mjs";

getContextFromIssue().then(context => {
    console.log(context);
});
