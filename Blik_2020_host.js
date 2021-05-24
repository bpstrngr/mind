import os from "os";
import v8 from "v8";

export default function host()
{return {uptime:Math.floor(os.uptime()/60/60)+"h "+Math.round(os.uptime/60%60)+"m "+(os.uptime()%60)+"s"
 ,averageload:os.loadavg().join(" ")
 ,cores:os.cpus().map(cpu=>cpu.model).join(", ")
 ,used:v8.getHeapStatistics().malloced_memory
 ,peak:v8.getHeapStatistics().peak_malloced_memory
 ,load:Math.round((v8.getHeapStatistics().used_heap_size/v8.getHeapStatistics().total_heap_size)*100)+"%"
 ,fill:Math.round((v8.getHeapStatistics().total_heap_size/v8.getHeapStatistics().heap_size_limit)*100)+"%"
 ,left:os.freemem()
        }
}