export function generateTag(email) {
    const emailPrefix = email.split("@")[0];
    const domainFirstLetter = email.split("@")[1][0];
    const tag = `${emailPrefix}${domainFirstLetter}`;
    return tag;
}