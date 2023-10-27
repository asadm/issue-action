import { getContextFromIssue,askQuestionOnIssue} from "./common/githubContext.mjs";

getContextFromIssue().then(context => {
    console.log(context);
    askQuestionOnIssue("How are you doing today?").then(() => {
        console.log("Asked question!");
    });
});
