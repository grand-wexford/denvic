import { useCallback, useEffect, useState, useMemo } from 'react';

import {
    ReactFlowProvider,
    ReactFlow,
    Background,
    Panel,

    BackgroundVariant,

    type NodeChange,
    type EdgeChange,
    type Connection,

    applyNodeChanges,
    applyEdgeChanges,

    addEdge,
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import FPSCounter from "@/components/FPSCounter.tsx";
import Node from "@/components/Node.tsx";

import {
    useGraph,
} from "@/hooks";

import {
    type NodeType,
    type EdgeType,
    type NodeData,
} from "@/schemas";

import { createRandomDictionary } from "@/utils";

function App() {

    const {
        nodes: reduxNodes,
        edges: reduxEdges,
        setNodes: setReduxNodes,
        setEdges: setReduxEdges,
    } = useGraph();

    const [nodes, setLocalNodes] = useState<NodeType[]>(reduxNodes);
    const [edges, setLocalEdges] = useState<EdgeType[]>(reduxEdges);

    useEffect(() => {
        setLocalNodes(reduxNodes);
    }, [reduxNodes]);

    useEffect(() => {
        setLocalEdges(reduxEdges);
    }, [reduxEdges]);

    const nodeTypes = useMemo(() => ({ custom: Node }), []);

    const onNodeDragStop = useCallback(() => {
        setReduxNodes(nodes);
    }, [nodes, setReduxNodes]);

    const onNodesChangeInternal = useCallback((changes: NodeChange<NodeType>[]) => {
        setLocalNodes((prevNodes) => applyNodeChanges(changes, prevNodes));
    }, []);

    const onEdgesChangeInternal = useCallback((changes: EdgeChange<EdgeType>[]) => {
        setLocalEdges((prevEdges) => {
            const changedEdges = applyEdgeChanges(changes, prevEdges);
            setReduxEdges(changedEdges);
            return changedEdges;
        });
    }, [setReduxEdges]);

    const onConnect = useCallback((connection: Connection) => {
        setLocalEdges((prevEdges) => {
            const newEdges = addEdge<EdgeType>(connection, prevEdges);
            setReduxEdges(newEdges);

            setLocalNodes((prevNodes) => {
                const sourceNode = prevNodes.find(node => node.id === connection.source);
                const targetNode = prevNodes.find(node => node.id === connection.target);

                if (!sourceNode || !targetNode) {
                    console.error("Source or target node not found for connection:", connection);
                    return prevNodes;
                }

                const sourceNodeData = sourceNode.data as NodeData;
                const targetNodeData = targetNode.data as NodeData;

                const newNode: NodeType = {
                    id: connection.target,
                    position: targetNode.position,
                    type: "custom",
                    data: {
                        displayName: targetNodeData.displayName,
                        values: {
                            ...sourceNodeData.values,
                            ...targetNodeData.values
                        }
                    }
                };

                return prevNodes.map(node => node.id === newNode.id ? newNode : node);
            });

            return newEdges;
        });
    }, [setReduxEdges]);

    const addNode = useCallback(() => {
        setLocalNodes((prevNodes) => {
            const newNode: NodeType = {
                id: (prevNodes.length + 1).toString(),
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                type: "custom",
                data: {
                    displayName: `Node ${prevNodes.length + 1}`,
                    values: createRandomDictionary(2)
                }
            };
            const updatedNodes = [...prevNodes, newNode];
            setReduxNodes(updatedNodes);
            return updatedNodes;
        });
    }, [setReduxNodes]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChangeInternal}
                    onEdgesChange={onEdgesChangeInternal}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    nodeTypes={nodeTypes}
                    deleteKeyCode={"Delete"}
                >
                    <Panel>
                        <FPSCounter />
                        <button onClick={addNode}>Add Node</button>
                    </Panel>
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                </ReactFlow>
            </ReactFlowProvider>
        </div>
    )
}

export default App;
