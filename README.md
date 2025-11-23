# CPU Scheduling Algorithms Simulator

## 📋 Project Overview
A comprehensive C++ implementation of operating system CPU scheduling algorithms with interactive process simulation and performance analysis. This project demonstrates deep understanding of OS concepts, process management, and algorithm optimization through practical implementation of 7 distinct scheduling strategies.

## 🎯 Key Features
- **7 Production-Grade Scheduling Algorithms:**
  1. **First Come First Serve (FCFS)** - Non-preemptive FIFO scheduling
  2. **Shortest Job First (SJF)** - Non-preemptive optimization
  3. **Shortest Remaining Time (SRT)** - Preemptive SJF variant
  4. **Round Robin (RR)** - Time-slice based preemptive scheduling
  5. **Priority-Based Scheduling** - Dynamic priority queue management
  6. **Multi-Level Queue (MLQ)** - Hierarchical queue architecture
  7. **Multi-Level Feedback Queue (MLFQ)** - Adaptive priority adjustment

- **Performance Metrics Analysis:**
  - Completion Time calculation
  - Turnaround Time optimization
  - Waiting Time minimization
  - CPU utilization tracking

- **Interactive CLI Interface** with real-time algorithm comparison and detailed scheduling visualization

## 🛠️ Technical Stack
- **Language:** C++ (C++11 and above)
- **Data Structures:** Queues, Vectors, Priority Queues, Sorting Algorithms
- **Concepts:** Process Control Blocks (PCB), Context Switching, Preemption
- **Algorithms:** Greedy, Dynamic Programming, Queue Management

## 💻 Installation and Usage

### Prerequisites
- C++ compiler with C++11 support (GCC 4.8+, Clang 3.3+, MSVC 2015+)
- Command-line interface (Terminal/PowerShell/CMD)

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd CPU_scheduling_OS

# Compile the program
g++ -o cpu_scheduling cpu_scheduling.cpp -std=c++11

# Run the application
./cpu_scheduling    # Linux/Mac
cpu_scheduling.exe  # Windows
```
### Interactive Workflow
2. Follow the interactive prompts:
   - Enter the number of processes.
   - Provide details for each process (Process ID, Arrival Time, Burst Time).
   - Select a scheduling algorithm from the menu.
   - For Round Robin, specify the time quantum.
   - For Priority-Based or Multi-Level Queue Scheduling, specify priorities.
3. View the calculated scheduling results, including:
   - Completion Time
   - Turnaround Time
   - Waiting Time

### Input Format
- **Process ID:** A unique identifier for each process.
- **Arrival Time:** Time when the process enters the ready queue.
- **Burst Time:** Time required by the process for execution.

### Example Interaction
```plaintext
Welcome to our CPU order processing application
Enter the number of processes: 3

Process ID: 1
Process Arrival Time: 0
Process Burst Time: 5

Process ID: 2
Process Arrival Time: 1
Process Burst Time: 3

Process ID: 3
Process Arrival Time: 2
Process Burst Time: 8

Choose the algorithm:
1. FCFS
2. SJF
3. SRT
4. Round Robin
5. Priority-Based
6. MLQ
7. MLFQ
8. Exit

Selection: 4
Enter the value of Quantum: 2

Round Robin Scheduling Results (Quantum = 2):
PID    Arrival    Burst    Completion    Turnaround    Waiting
1      0          5        13            13            8
2      1          3        7             6             3
3      2          8        21            19            11
```

## 📊 Algorithm Implementations

### 1. First Come First Serve (FCFS)
- **Type:** Non-preemptive
- **Strategy:** Processes executed in order of arrival
- **Time Complexity:** O(n log n)
- **Use Case:** Batch processing systems

### 2. Shortest Job First (SJF)
- **Type:** Non-preemptive
- **Strategy:** Selects process with minimum burst time
- **Time Complexity:** O(n²)
- **Advantage:** Minimizes average waiting time

### 3. Shortest Remaining Time (SRT)
- **Type:** Preemptive
- **Strategy:** Dynamic selection based on remaining burst time
- **Time Complexity:** O(n²)
- **Feature:** Context switching on new process arrival

### 4. Round Robin (RR)
- **Type:** Preemptive
- **Strategy:** Fixed time quantum allocation
- **Time Complexity:** O(n)
- **Benefit:** Fair CPU distribution, prevents starvation

### 5. Priority-Based Scheduling
- **Type:** Non-preemptive
- **Strategy:** Priority queue with arrival time tiebreaker
- **Time Complexity:** O(n log n)
- **Application:** Real-time systems

### 6. Multi-Level Queue (MLQ)
- **Type:** Hybrid
- **Structure:** Separate queues with distinct scheduling policies
  - Queue 1: Round Robin (high priority)
  - Queue 2: FCFS (low priority)
- **Use Case:** Process categorization by type

### 7. Multi-Level Feedback Queue (MLFQ)
- **Type:** Adaptive Preemptive
- **Strategy:** Dynamic queue migration based on execution history
- **Quantum Values:** 
  - Level 1: 2 units (highest priority)
  - Level 2: 4 units (medium priority)
  - Level 3: FCFS (lowest priority)
- **Advantage:** Balances interactive and CPU-bound processes

## 🎓 Learning Outcomes
This project demonstrates proficiency in:
- Operating System concepts and process scheduling
- Advanced C++ programming and STL usage
- Algorithm design and complexity analysis
- Data structure implementation (queues, vectors, priority queues)
- Software architecture and modular design
- Performance optimization and time complexity analysis

## 🚀 Future Enhancements
- [ ] Gantt chart visualization for process execution timeline
- [ ] Export scheduling results to CSV/JSON format
- [ ] Graphical comparison of algorithm performance metrics
- [ ] Multi-threaded simulation support
- [ ] Real-time process arrival simulation
- [ ] Starvation detection and analysis

## 📈 Applications
- **Educational Tool:** Teaching OS concepts in computer science courses
- **Performance Analysis:** Comparing scheduling algorithms for different workloads
- **System Design:** Understanding CPU scheduling behavior in real-world scenarios
- **Research:** Foundation for advanced scheduling algorithm development

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit pull requests.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is available for educational and non-commercial use.

## 👨‍💻 Author
**Bisal**  
🎓 **National Institute of Technology, Silchar**  
📧 Contact: [Add your email]  
💼 LinkedIn: [Add your LinkedIn]  
🔗 GitHub: [Add your GitHub profile]

---

## 📚 References
- Operating System Concepts by Silberschatz, Galvin, and Gagne
- Modern Operating Systems by Andrew S. Tanenbaum
- CPU Scheduling in Linux Kernel Documentation

**⭐ If you find this project helpful, please consider giving it a star!**
