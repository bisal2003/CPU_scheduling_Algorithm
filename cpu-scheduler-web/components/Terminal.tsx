'use client';

import { useState, useEffect, useRef } from 'react';
import { Process, SchedulingResult, FCFS, SJF_NonPreemptive, SRT, RoundRobin, PriorityScheduling } from '@/lib/schedulingAlgorithms';

interface TerminalProps {
  onClear?: () => void;
}

export default function Terminal({ onClear }: TerminalProps) {
  const [output, setOutput] = useState<string[]>([
    '╔══════════════════════════════════════════════════════════════╗',
    '║     CPU SCHEDULING ALGORITHMS SIMULATOR v1.0                ║',
    '║     Created by: Bisal | NIT Silchar                         ║',
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    'Welcome to the CPU Scheduling Simulator!',
    'Type "help" to see available commands.',
    '',
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<'idle' | 'numProcesses' | 'processInput' | 'algorithmChoice' | 'quantum' | 'priority'>('idle');
  const [processes, setProcesses] = useState<Process[]>([]);
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
  const [numProcesses, setNumProcesses] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addOutput = (text: string | string[]) => {
    if (Array.isArray(text)) {
      setOutput(prev => [...prev, ...text]);
    } else {
      setOutput(prev => [...prev, text]);
    }
  };

  const displayResults = (result: SchedulingResult, algorithm: string) => {
    const lines = [
      '',
      `═══════════════════════════════════════════════════════════════`,
      `${algorithm} SCHEDULING RESULTS`,
      `═══════════════════════════════════════════════════════════════`,
      '',
      'PID | Arrival | Burst | Completion | Turnaround | Waiting',
      '----+---------+-------+------------+------------+---------',
    ];

    result.processes.forEach(p => {
      const line = `${String(p.pid).padStart(3)} | ${String(p.arrivalTime).padStart(7)} | ${String(p.burstTime).padStart(5)} | ${String(p.completionTime).padStart(10)} | ${String(p.turnaroundTime).padStart(10)} | ${String(p.waitingTime).padStart(7)}`;
      lines.push(line);
    });

    lines.push('');
    lines.push(`Average Waiting Time: ${result.averageWaitingTime}`);
    lines.push(`Average Turnaround Time: ${result.averageTurnaroundTime}`);
    lines.push('');

    addOutput(lines);
    setStep('idle');
    setProcesses([]);
    setCurrentProcessIndex(0);
  };

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    if (step === 'idle') {
      addOutput(`$ ${cmd}`);

      if (command === 'help') {
        addOutput([
          '',
          'Available commands:',
          '  start     - Start the scheduling simulation',
          '  help      - Show this help message',
          '  clear     - Clear the terminal',
          '  about     - About this project',
          '',
        ]);
      } else if (command === 'start') {
        addOutput([
          '',
          'Enter the number of processes:',
        ]);
        setStep('numProcesses');
      } else if (command === 'clear') {
        setOutput([]);
      } else if (command === 'about') {
        addOutput([
          '',
          'CPU Scheduling Algorithms Simulator',
          'A web-based implementation of various OS scheduling algorithms',
          '',
          'Algorithms implemented:',
          '  1. First Come First Serve (FCFS)',
          '  2. Shortest Job First (SJF)',
          '  3. Shortest Remaining Time (SRT)',
          '  4. Round Robin (RR)',
          '  5. Priority-Based Scheduling',
          '',
          'Created by: Bisal',
          'Institution: NIT Silchar',
          'GitHub: https://github.com/bisal2003/CPU_scheduling_Algorithm',
          '',
        ]);
      } else {
        addOutput(`Command not found: ${cmd}. Type "help" for available commands.`);
      }
    } else if (step === 'numProcesses') {
      addOutput(`> ${cmd}`);
      const num = parseInt(cmd);
      if (isNaN(num) || num <= 0) {
        addOutput('Invalid number. Please enter a positive integer.');
      } else {
        setNumProcesses(num);
        setProcesses([]);
        setCurrentProcessIndex(0);
        addOutput([
          '',
          `Creating ${num} processes...`,
          '',
          `Process ${1} - Enter arrival time:`,
        ]);
        setStep('processInput');
      }
    } else if (step === 'processInput') {
      addOutput(`> ${cmd}`);
      const currentProcess = processes[currentProcessIndex] || { pid: currentProcessIndex + 1, arrivalTime: 0, burstTime: 0, completionTime: 0, turnaroundTime: 0, waitingTime: 0 };

      if (currentProcess.arrivalTime === 0 && currentProcess.burstTime === 0) {
        // Setting arrival time
        const arrival = parseInt(cmd);
        if (isNaN(arrival) || arrival < 0) {
          addOutput('Invalid arrival time. Please enter a non-negative integer.');
          return;
        }
        currentProcess.arrivalTime = arrival;
        addOutput(`Process ${currentProcessIndex + 1} - Enter burst time:`);
        setProcesses([...processes.slice(0, currentProcessIndex), currentProcess]);
      } else {
        // Setting burst time
        const burst = parseInt(cmd);
        if (isNaN(burst) || burst <= 0) {
          addOutput('Invalid burst time. Please enter a positive integer.');
          return;
        }
        currentProcess.burstTime = burst;
        const updatedProcesses = [...processes.slice(0, currentProcessIndex), currentProcess];
        setProcesses(updatedProcesses);

        if (currentProcessIndex + 1 < numProcesses) {
          setCurrentProcessIndex(currentProcessIndex + 1);
          addOutput([
            '',
            `Process ${currentProcessIndex + 2} - Enter arrival time:`,
          ]);
        } else {
          addOutput([
            '',
            'Choose the scheduling algorithm:',
            '  1. FCFS (First Come First Serve)',
            '  2. SJF (Shortest Job First)',
            '  3. SRT (Shortest Remaining Time)',
            '  4. Round Robin',
            '  5. Priority-Based',
            '',
            'Enter your choice (1-5):',
          ]);
          setStep('algorithmChoice');
        }
      }
    } else if (step === 'algorithmChoice') {
      addOutput(`> ${cmd}`);
      const choice = parseInt(cmd);
      const updatedProcesses = [...processes];

      switch (choice) {
        case 1:
          displayResults(FCFS(updatedProcesses), 'FCFS');
          break;
        case 2:
          displayResults(SJF_NonPreemptive(updatedProcesses), 'SJF (Non-Preemptive)');
          break;
        case 3:
          displayResults(SRT(updatedProcesses), 'SRT (Preemptive)');
          break;
        case 4:
          setSelectedAlgorithm('rr');
          addOutput('Enter time quantum:');
          setStep('quantum');
          break;
        case 5:
          setSelectedAlgorithm('priority');
          setCurrentProcessIndex(0);
          addOutput(`Enter priority for Process ${updatedProcesses[0].pid} (lower number = higher priority):`);
          setStep('priority');
          break;
        default:
          addOutput('Invalid choice. Please enter a number between 1 and 5.');
          break;
      }
    } else if (step === 'quantum') {
      addOutput(`> ${cmd}`);
      const quantum = parseInt(cmd);
      if (isNaN(quantum) || quantum <= 0) {
        addOutput('Invalid quantum. Please enter a positive integer.');
      } else {
        displayResults(RoundRobin(processes, quantum), `Round Robin (Quantum = ${quantum})`);
      }
    } else if (step === 'priority') {
      addOutput(`> ${cmd}`);
      const priority = parseInt(cmd);
      if (isNaN(priority)) {
        addOutput('Invalid priority. Please enter a number.');
        return;
      }

      const updatedProcesses = [...processes];
      updatedProcesses[currentProcessIndex].priority = priority;
      setProcesses(updatedProcesses);

      if (currentProcessIndex + 1 < updatedProcesses.length) {
        setCurrentProcessIndex(currentProcessIndex + 1);
        addOutput(`Enter priority for Process ${updatedProcesses[currentProcessIndex + 1].pid}:`);
      } else {
        displayResults(PriorityScheduling(updatedProcesses), 'Priority-Based');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-green-400 font-mono p-4 overflow-hidden flex flex-col">
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto mb-4 whitespace-pre-wrap"
        onClick={() => inputRef.current?.focus()}
      >
        {output.map((line, index) => (
          <div key={index} className="leading-relaxed">
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="text-green-400 mr-2">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 font-mono"
          autoFocus
        />
      </div>
    </div>
  );
}
