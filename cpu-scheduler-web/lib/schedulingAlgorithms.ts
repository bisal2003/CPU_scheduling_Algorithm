// CPU Scheduling Algorithms Implementation

export interface Process {
  pid: number;
  arrivalTime: number;
  burstTime: number;
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  priority?: number;
  remainingTime?: number;
}

export interface SchedulingResult {
  processes: Process[];
  averageWaitingTime: number;
  averageTurnaroundTime: number;
  ganttChart?: string[];
}

// First Come First Serve (FCFS)
export function FCFS(processes: Process[]): SchedulingResult {
  const proc = processes.map(p => ({ ...p }));
  proc.sort((a, b) => a.arrivalTime - b.arrivalTime);

  let currentTime = 0;
  for (let i = 0; i < proc.length; i++) {
    if (currentTime < proc[i].arrivalTime) {
      currentTime = proc[i].arrivalTime;
    }
    proc[i].completionTime = currentTime + proc[i].burstTime;
    proc[i].turnaroundTime = proc[i].completionTime - proc[i].arrivalTime;
    proc[i].waitingTime = proc[i].turnaroundTime - proc[i].burstTime;
    currentTime = proc[i].completionTime;
  }

  const avgWaiting = proc.reduce((sum, p) => sum + p.waitingTime, 0) / proc.length;
  const avgTurnaround = proc.reduce((sum, p) => sum + p.turnaroundTime, 0) / proc.length;

  return {
    processes: proc,
    averageWaitingTime: parseFloat(avgWaiting.toFixed(2)),
    averageTurnaroundTime: parseFloat(avgTurnaround.toFixed(2)),
  };
}

// Shortest Job First (Non-Preemptive)
export function SJF_NonPreemptive(processes: Process[]): SchedulingResult {
  const proc = processes.map(p => ({ ...p }));
  const completed: boolean[] = new Array(proc.length).fill(false);
  let completedCount = 0;
  let currentTime = 0;

  while (completedCount < proc.length) {
    let minBurst = Infinity;
    let idx = -1;

    for (let i = 0; i < proc.length; i++) {
      if (proc[i].arrivalTime <= currentTime && !completed[i] && proc[i].burstTime < minBurst) {
        minBurst = proc[i].burstTime;
        idx = i;
      }
    }

    if (idx !== -1) {
      currentTime += proc[idx].burstTime;
      proc[idx].completionTime = currentTime;
      proc[idx].turnaroundTime = proc[idx].completionTime - proc[idx].arrivalTime;
      proc[idx].waitingTime = proc[idx].turnaroundTime - proc[idx].burstTime;
      completed[idx] = true;
      completedCount++;
    } else {
      currentTime++;
    }
  }

  const avgWaiting = proc.reduce((sum, p) => sum + p.waitingTime, 0) / proc.length;
  const avgTurnaround = proc.reduce((sum, p) => sum + p.turnaroundTime, 0) / proc.length;

  return {
    processes: proc,
    averageWaitingTime: parseFloat(avgWaiting.toFixed(2)),
    averageTurnaroundTime: parseFloat(avgTurnaround.toFixed(2)),
  };
}

// Shortest Remaining Time (Preemptive SJF)
export function SRT(processes: Process[]): SchedulingResult {
  const proc = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const completed: boolean[] = new Array(proc.length).fill(false);
  let completedCount = 0;
  let currentTime = 0;

  while (completedCount < proc.length) {
    let minRemaining = Infinity;
    let idx = -1;

    for (let i = 0; i < proc.length; i++) {
      if (proc[i].arrivalTime <= currentTime && !completed[i] && proc[i].remainingTime! < minRemaining) {
        minRemaining = proc[i].remainingTime!;
        idx = i;
      }
    }

    if (idx !== -1) {
      proc[idx].remainingTime!--;
      currentTime++;

      if (proc[idx].remainingTime === 0) {
        completed[idx] = true;
        completedCount++;
        proc[idx].completionTime = currentTime;
        proc[idx].turnaroundTime = proc[idx].completionTime - proc[idx].arrivalTime;
        proc[idx].waitingTime = proc[idx].turnaroundTime - proc[idx].burstTime;
      }
    } else {
      currentTime++;
    }
  }

  const avgWaiting = proc.reduce((sum, p) => sum + p.waitingTime, 0) / proc.length;
  const avgTurnaround = proc.reduce((sum, p) => sum + p.turnaroundTime, 0) / proc.length;

  return {
    processes: proc,
    averageWaitingTime: parseFloat(avgWaiting.toFixed(2)),
    averageTurnaroundTime: parseFloat(avgTurnaround.toFixed(2)),
  };
}

// Round Robin
export function RoundRobin(processes: Process[], quantum: number): SchedulingResult {
  const proc = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const queue: number[] = [];
  let currentTime = 0;
  const inQueue: boolean[] = new Array(proc.length).fill(false);

  // Add processes that have arrived at time 0
  for (let i = 0; i < proc.length; i++) {
    if (proc[i].arrivalTime === 0) {
      queue.push(i);
      inQueue[i] = true;
    }
  }

  while (queue.length > 0) {
    const idx = queue.shift()!;

    const execTime = Math.min(quantum, proc[idx].remainingTime!);
    proc[idx].remainingTime! -= execTime;
    currentTime += execTime;

    // Add newly arrived processes to queue
    for (let i = 0; i < proc.length; i++) {
      if (!inQueue[i] && proc[i].arrivalTime <= currentTime && proc[i].remainingTime! > 0) {
        queue.push(i);
        inQueue[i] = true;
      }
    }

    if (proc[idx].remainingTime === 0) {
      proc[idx].completionTime = currentTime;
      proc[idx].turnaroundTime = proc[idx].completionTime - proc[idx].arrivalTime;
      proc[idx].waitingTime = proc[idx].turnaroundTime - proc[idx].burstTime;
    } else {
      queue.push(idx);
    }
  }

  const avgWaiting = proc.reduce((sum, p) => sum + p.waitingTime, 0) / proc.length;
  const avgTurnaround = proc.reduce((sum, p) => sum + p.turnaroundTime, 0) / proc.length;

  return {
    processes: proc,
    averageWaitingTime: parseFloat(avgWaiting.toFixed(2)),
    averageTurnaroundTime: parseFloat(avgTurnaround.toFixed(2)),
  };
}

// Priority-Based Scheduling
export function PriorityScheduling(processes: Process[]): SchedulingResult {
  const proc = processes.map(p => ({ ...p }));
  proc.sort((a, b) => {
    if (a.priority === b.priority) {
      return a.arrivalTime - b.arrivalTime;
    }
    return (a.priority || 0) - (b.priority || 0);
  });

  let currentTime = 0;
  for (let i = 0; i < proc.length; i++) {
    if (currentTime < proc[i].arrivalTime) {
      currentTime = proc[i].arrivalTime;
    }
    proc[i].completionTime = currentTime + proc[i].burstTime;
    proc[i].turnaroundTime = proc[i].completionTime - proc[i].arrivalTime;
    proc[i].waitingTime = proc[i].turnaroundTime - proc[i].burstTime;
    currentTime = proc[i].completionTime;
  }

  const avgWaiting = proc.reduce((sum, p) => sum + p.waitingTime, 0) / proc.length;
  const avgTurnaround = proc.reduce((sum, p) => sum + p.turnaroundTime, 0) / proc.length;

  return {
    processes: proc,
    averageWaitingTime: parseFloat(avgWaiting.toFixed(2)),
    averageTurnaroundTime: parseFloat(avgTurnaround.toFixed(2)),
  };
}
