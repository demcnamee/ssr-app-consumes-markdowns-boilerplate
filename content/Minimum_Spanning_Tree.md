# Kruskal’s Minimum Spanning Tree Algorithm

---

This is a greedy algorithm.

# Minimum Spaning Tree

In a connected and undirected graph, a spanning tree is a subgraph that is a tree and connects all the vertices together. A single graph can have many different spanning trees.

A minimum spanning tree (MST) or minimum weight spanning tree for a weighted, connected and undirected graph is a spanning tree with weight less than or equal to the weight of every other spanning tree. The weight of a spanning tree is the sum of weights given to each edge of the spanning tree.

/How many edges does a minimum spanning tree has?/
A MST has (V-1) edges where V is the number of vertices in the given graph.

MST has direct application in the design of networks. It is used in algorithms approximating the traveling salesman problem, multi-terminal minimum cut problem and minimum-cost weighted perfect matching.

![Kruskal%E2%80%99s%20Minimum%20Spanning%20Tree%20Algorithm%201cd0f13d243645b6bdbcadc0512d953c/Untitled.png](Kruskal%E2%80%99s%20Minimum%20Spanning%20Tree%20Algorithm%201cd0f13d243645b6bdbcadc0512d953c/Untitled.png)

## Steps of minimum spanning tree

1. Sort all the edges in non-descending order of their weight
2. Pick the smallest edge. Check if it forms a cycle with the spanning tree formed so far. If cycle is not formed, include this edge. Else, discard it.
3. Repeat step 2 until there are (V-1) edges in the spanning tree.

For checking the step two, it could be done using DFS which starts from the first vertex, then check if the second vertex is visited or not. But DFS will make time complexity large as it has an order of O(V + E) where V is the number of vertices, E is the number of edges. So the best solution is *Disjoint Sets*.

---

# Disjoint Sets

Disjoint (disjunto, desarticulado) set are sets whose intersection is the empty set so it means that they don’t have any element in common.

---

# Time Complexity

In Kruskal’s algorithm, most time consuming operation is sorting because the total complexity of the Disjoint-Set operations will be O(ElogV), which is the overall Time complexity of the algorithm.

Sorting of edges takes O(E logE) time. After sorting, we iterate through all edges and apply find-union algorithm. The find and union operations can take at most O(log V) time. So overall complexity is O(E logE + E logV) time. The value of E can be at most O(V^2), meaning all the nodes are connected, so O(logV) are O(log E) same. There, overall time complexity is O(E logE) or O(E logV)

---

![Kruskal%E2%80%99s%20Minimum%20Spanning%20Tree%20Algorithm%201cd0f13d243645b6bdbcadc0512d953c/Untitled%201.png](Kruskal%E2%80%99s%20Minimum%20Spanning%20Tree%20Algorithm%201cd0f13d243645b6bdbcadc0512d953c/Untitled%201.png)

At each iteration we will select the edge with the lowest weight. So, we will start with edge with weight 1, then edge with weight 2.

Notice these two edges are totally disjoint. Now, the next edge will be weight 3, which connects the two disjoint pieces of the graph. Now, we are not allowed to pick the edge with weight 4, that will create a cycle and we can’t have any cycles. So we will select the next edge with weight 5. Now we have edges = ( V - 1 ), so we stop the algorithm.

---

# Python Code

The graph structure for this code is a list of edges:

```python
[[u,v,w],[u,v,w]]
```

First sort the graph list by weight:

```python
self.graph = sorted(self.graph, key=lambda item: item[2])
```

Create a disjoint-set for path compression technique.
Create the Rank list to union by rank.

```python
parent = []
rank = []
for node in range(self.numberVertices):
	parent.append(node)
	rank.append(0)
```

Iterate from 0 to the number of vertices - 1. Use find-union algorithm from start vertex to end vertex.
Use find in both vertices to check if they are in the same subset. If they aren’t, use union by rank to put them in the same subset, because in the graph they are connected

```python
#i is for iterate through graph list
#e is for checking the minimum spanning tree

while e < self.numberVertices - 1:
	u, v, w = self.graph[i]
	i += 1

	x = find(parent, u)
	y = find(parent, v)
	
	if x != y:
		e += 1
		result.append([u,v,w])
		union(parent, rank, x, y)
```

The core parts of the algorithm is sorting the list of edges by weight, and checking cycles.