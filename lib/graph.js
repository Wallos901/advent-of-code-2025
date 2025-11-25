/**
 * Graph algorithms and data structures
 */

/**
 * Breadth-First Search implementation
 * @param {Map<string, string[]>} graph - Adjacency list representation
 * @param {string} start - Starting node
 * @param {string} target - Target node (optional)
 * @returns {Object} { distances, parents, path? }
 */
export function bfs(graph, start, target = null) {
  const queue = [start];
  const visited = new Set([start]);
  const distances = new Map([[start, 0]]);
  const parents = new Map([[start, null]]);
  
  while (queue.length > 0) {
    const current = queue.shift();
    
    if (target && current === target) {
      break;
    }
    
    const neighbors = graph.get(current) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        distances.set(neighbor, distances.get(current) + 1);
        parents.set(neighbor, current);
      }
    }
  }
  
  const result = { distances, parents };
  
  if (target && parents.has(target)) {
    result.path = reconstructPath(parents, target);
  }
  
  return result;
}

/**
 * Depth-First Search implementation
 * @param {Map<string, string[]>} graph - Adjacency list representation
 * @param {string} start - Starting node
 * @param {Set<string>} visited - Visited nodes (optional, for recursion)
 * @returns {string[]} Order of visited nodes
 */
export function dfs(graph, start, visited = new Set()) {
  const result = [];
  
  function dfsHelper(node) {
    visited.add(node);
    result.push(node);
    
    const neighbors = graph.get(node) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        dfsHelper(neighbor);
      }
    }
  }
  
  dfsHelper(start);
  return result;
}

/**
 * Dijkstra's shortest path algorithm
 * @param {Map<string, Array<{node: string, weight: number}>>} graph - Weighted adjacency list
 * @param {string} start - Starting node
 * @returns {Object} { distances, parents }
 */
export function dijkstra(graph, start) {
  const distances = new Map();
  const parents = new Map();
  const visited = new Set();
  const pq = new PriorityQueue((a, b) => a.distance < b.distance);
  
  // Initialize distances
  for (const node of graph.keys()) {
    distances.set(node, node === start ? 0 : Infinity);
    parents.set(node, null);
  }
  
  pq.enqueue({ node: start, distance: 0 });
  
  while (!pq.isEmpty()) {
    const { node: current } = pq.dequeue();
    
    if (visited.has(current)) continue;
    visited.add(current);
    
    const neighbors = graph.get(current) || [];
    for (const { node: neighbor, weight } of neighbors) {
      const newDistance = distances.get(current) + weight;
      
      if (newDistance < distances.get(neighbor)) {
        distances.set(neighbor, newDistance);
        parents.set(neighbor, current);
        pq.enqueue({ node: neighbor, distance: newDistance });
      }
    }
  }
  
  return { distances, parents };
}

/**
 * Reconstruct path from parents map
 * @param {Map<string, string>} parents
 * @param {string} target
 * @returns {string[]}
 */
function reconstructPath(parents, target) {
  const path = [];
  let current = target;
  
  while (current !== null) {
    path.unshift(current);
    current = parents.get(current);
  }
  
  return path;
}

/**
 * Priority Queue implementation
 */
class PriorityQueue {
  constructor(compareFn = (a, b) => a < b) {
    this.items = [];
    this.compare = compareFn;
  }
  
  enqueue(item) {
    this.items.push(item);
    this._bubbleUp(this.items.length - 1);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    
    const root = this.items[0];
    const last = this.items.pop();
    
    if (!this.isEmpty()) {
      this.items[0] = last;
      this._bubbleDown(0);
    }
    
    return root;
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  _bubbleUp(index) {
    if (index === 0) return;
    
    const parentIndex = Math.floor((index - 1) / 2);
    if (this.compare(this.items[index], this.items[parentIndex])) {
      this._swap(index, parentIndex);
      this._bubbleUp(parentIndex);
    }
  }
  
  _bubbleDown(index) {
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    let smallest = index;
    
    if (leftChild < this.items.length && 
        this.compare(this.items[leftChild], this.items[smallest])) {
      smallest = leftChild;
    }
    
    if (rightChild < this.items.length && 
        this.compare(this.items[rightChild], this.items[smallest])) {
      smallest = rightChild;
    }
    
    if (smallest !== index) {
      this._swap(index, smallest);
      this._bubbleDown(smallest);
    }
  }
  
  _swap(i, j) {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }
}

export { PriorityQueue };