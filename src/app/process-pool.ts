import { fork } from "child_process";
import { PathEntry } from "./components/song-modules/PathEntry";
import { TagState } from "./components/song-modules/TagState";
const options = {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc']
}


export class ProcessPool {
    processes: { proc: any, task: TagState }[];
    queue: TagState[] = [];
    watcherToken: any = null;
    constructor(public count: number) {
        this.processes = [];
        for (let i = 0; i < count; i++) {
            var proc = fork('src/app/pseudo-threads/tags-reader-worker.js', [], options);
            proc.on('close', function (code, signal) {
                console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
            });
            this.processes.push({ proc: proc, task: null });
            let listenLine = this.readLineEvent.bind(this, i);
            proc.on("message", str => listenLine(str));

        }
        console.log("end of creating children processes")

    }

    private readLineEvent(position: number, data: string) {
        // console.error("received data: " + data)
        if(this.processes[position].task !== null){
            this.processes[position].task.initialTags = data;
            this.processes[position].task = null;
        }
    }

    loadTags(target: TagState) {
        // console.log("load")
        this.queue.push(target);
        if (this.watcherToken === null) {
            this.watcherToken = setInterval(this.managePool.bind(this), 10);
        }

    }

    private managePool() {

        if (this.queue.length == 0) {
            if(this.processes.every(proc => proc.task === null)){
                clearInterval(this.watcherToken)
                this.watcherToken = null;
            }
            return;
        }
        var freeProcess = this.processes.find(val => val.task === null);
        if (freeProcess !== undefined) {
            freeProcess.task = this.queue.pop();
            console.log("sending " + freeProcess.task.pathEntry.path)
            freeProcess.proc.send(freeProcess.task.pathEntry.path);
            // console.log(freeProcess.proc.stdin)
        }
        // console.log("manage")
    }

}


