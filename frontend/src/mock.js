export const initialChats = [
  {
    id: 'chat-1',
    title: 'Chat',
    messages: [],
    createdAt: new Date().toISOString(),
  },
];

export const sampleResponses = [
  "Sure! Here's an approach you can try:\n\n1. Break the problem into smaller subproblems\n2. Identify the data structures you'll need\n3. Write a clean, iterative solution\n4. Add edge case handling\n\nWould you like me to walk through a code example?",
  "Great question. The time complexity here is O(n log n) because we sort the input first, then perform a linear pass. Space complexity is O(n) for the auxiliary array.",
  "That looks like an off-by-one error. Try changing `i <= arr.length` to `i < arr.length` on line 4. Also make sure your loop initializer starts at 0.",
  "For interview prep, focus on: arrays, hashmaps, two-pointers, sliding window, binary search, BFS/DFS, dynamic programming, and basic system design fundamentals.",
];