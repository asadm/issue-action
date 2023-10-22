const { Octokit } = require("@octokit/rest");

async function getIssueAndComments() {
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
    });

    const context = {
        owner: process.env.GITHUB_REPOSITORY.split('/')[0],
        repo: process.env.GITHUB_REPOSITORY.split('/')[1],
        issue_number: process.env.GITHUB_EVENT_PATH ? require(process.env.GITHUB_EVENT_PATH).issue.number : undefined,
        per_page: 100
    };

    if (!context.issue_number) {
        console.log("No issue number found!");
        return;
    }

    // Get the issue
    const issue = await octokit.rest.issues.get(context);

    // Log the issue
    console.log(`Issue by ${issue.data.user.login}: ${issue.data.body}`);

    // Get issue comments
    const comments = await octokit.rest.issues.listComments(context);

    // Log the comments
    comments.data.forEach(comment => {
        console.log(`Comment by ${comment.user.login}: ${comment.body}`);
    });
}

getIssueAndComments().catch(error => {
    console.error(error);
});
