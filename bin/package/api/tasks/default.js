
module.exports = [
    {
        // task name
        name: 'example scheduled task',

        // see https://github.com/mattpat/node-schedule
        // for more examples
        // 
        // cronjob format:
        // for more time definitions examples
        // see: https://github.com/ncb000gt/node-cron
        // 
        // executed every 30 seconds
        at: '*/2 * * * * *',

        // executed function
        task: function(job) {
            // check if previous run is ended or not
            if (job.run() === true) {
                job.log("Nothing to do... previous run is not ended");
                job.run(false);
            } else {
                job.log("Well ! I can do my job !");
                job.log("-> iterations: " + job.count());
                job.run(true)
            }
        },

        // if defined, job.log appending into logs/example-task.log
        // otherwise, the log output on stdout
        logfile: 'example-task.log'
    }
];