const Luraph = require('luraph');
const yargs = require('yargs');
const fs = require('fs');


const main = async () => {
    const argv = yargs
    .option('api-key', {
        alias: 'a',
        description: 'Your Luraph API key',
        type: 'string',
        demandOption: true
    })
    .option('input', {
        alias: 'i',
        description: 'Input file name',
        type: 'string',
        demandOption: true
    })
    .option('output', {
        alias: 'o',
        description: 'Output file name',
        type: 'string',
        demandOption: true
    })
    .help()
    .alias('help', 'h')
    .argv;
    console.log(argv.apiKey);
    const api = new Luraph.LuraphAPI(argv.apiKey);
    const nodes = await api.getNodes();
    console.log("Recommended Node", nodes.recommendedId);

    const node = nodes.nodes[nodes.recommendedId];
    console.log("- CPU Usage: ", node.cpuUsage);
    console.log("- Options: ");
    for(const [optionId, optionInfo] of Object.entries(node.options)){
            console.log("*", optionId, "-", optionInfo.name + ":");
            console.log("  Description:", optionInfo.description);
            console.log("  Type:", optionInfo.type);
            console.log("  Tier:", optionInfo.tier);
            console.log("  Choices:", `[${optionInfo.choices.join(", ")}]`);
    }

    const inputFileName = argv.input;
    const outputFileName = argv.output;
    console.log("Input file name:", inputFileName);
    console.log("Output file name:", outputFileName);

    options = {};
    options["INTENSE_VM_STRUCTURE"] = true;
    options["ENABLE_GC_FIXES"] = false;
    options["TARGET_VERSION"] = "Universal";
    options["VM_ENCRYPTION"] = false;
    options["DISABLE_LINE_INFORMATION"] = false;
    options["USE_DEBUG_LIBRARY"] = false;


    try {
        const inputFileContents = fs.readFileSync(inputFileName, 'utf8');
        console.log("Input file contents:", inputFileContents);

        const {jobId} = await api.createNewJob(nodes.recommendedId, inputFileContents, outputFileName, options);
        console.log("Job ID", jobId);

        const {success, error} = await api.getJobStatus(jobId);
        console.log("Job finished", success ? "sucessfully" : "unsucessfully");
        if(success){
            const {fileName, data} = await api.downloadResult(jobId);
            console.log("Result Filename", fileName);
        
            fs.writeFileSync(outputFileName, data);
            console.log(`Data written to ${outputFileName}`);
            
        }else{
            console.log("Error", error);
        }
    } catch (err) {
        console.error(`Error reading input file: ${err}`);
    }
}
main();

