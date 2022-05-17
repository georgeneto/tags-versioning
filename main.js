const core = require("@actions/core");
const github = require("@actions/github");
const http = require("@actions/http-client")

const token = core.getInput("repo-token");
  
const octokit = github.getOctokit(token);


const run = async () => {
    console.log(github.context)

    try{
        let regExp = RegExp(/[Vv](\d)+\.(\d)+\.(\d)+/)
        var tagsRequest = await octokit.rest.repos.listTags({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo
        })

        orderedTags = tagsRequest.data.filter(t => regExp.test(t.name)).map(t=>t.name).sort((x,y) => x.localeCompare(y)).reverse()

        nextVersionTag = getNextVersion(orderedTags[0])
        console.log(`last version is ${orderedTags[0]}`)
        console.log(`next version is ${nextVersionTag}`)

        core.setOutput("last", orderedTags[0] || "")
        core.setOutput("next", nextVersionTag)
    }catch(e){
        console.log("FAIL", e)
    }
        
}

const getNextVersion = (version, strategy) => {
    if(!version) return "v0.0.1"

    switch(strategy){
        case "major": 
            let splitMajor = version.split(".")
            splitMajor[0] = `v${parseInt(splitMajor[0].substring(1))+1}`
            return splitMajor.join(".")
        case "minor": 
            let splitMinor = version.split(".")
            splitMinor[1] = parseInt(splitMinor[1])+1
            return splitMinor.join(".")
        case "patch":
        default: 
            let splitPatch = version.split(".")
            splitPatch[2] = parseInt(splitPatch[2])+1
            return splitPatch.join(".")
    }

}

run()